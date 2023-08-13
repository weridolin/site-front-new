<template>
  <div class="app-container">
    <!-- 用户表格操作栏  -->
    <div class="filter-container">
      <el-row>
        <el-date-picker
          v-model="listQuery.created_after"
          type="date"
          placeholder="创建开始时间"
          style="width: 10%"
          class="filter-item"
        />
        <span class="DatePickerCut">-</span>
        <el-date-picker
          v-model="listQuery.created_before"
          placeholder="创建结束时间"
          type="date"
          style="width: 10%"
          class="filter-item"
        />
        <el-input
          v-model="listQuery.username"
          placeholder="用户名称"
          style="width: 200px"
          class="filter-item"
          @keyup.enter="handleFilter"
        />

        <el-input
          v-model="listQuery.email"
          placeholder="用户邮箱"
          style="width: 200px"
          class="filter-item"
          @keyup.enter="handleFilter"
        />

        <el-button
          type="primary"
          class="filter-item-button"
          :icon="Search"
          @click="handleFilter"
        >
          搜索
        </el-button>
        <el-button
          type="primary"
          class="filter-item-button"
          :icon="Edit"
          @click="handleCreate()"
        >
          新建用户
        </el-button>
      </el-row>
    </div>

    <!-- 用户列表数据显示表格 -->
    <el-table
      v-loading="listLoading"
      :data="UserList"
      border
      fit
      highlight-current-row

      @sort-change="sortChange"
    >
      <el-table-column
        label="序号"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      />

      <el-table-column
        label="用户名"
        prop="username"
        width="180px"
        align="center"
      />

      <el-table-column
        label="邮箱"
        min-width="150px"
        prop="email"
        width="180px"
      />

      <el-table-column
        label="是否超级管理员"
        min-width="50px"
        prop="date_joined"
        width="150px"
      >
        <template #default="scope">
          <span>{{ scope.row.is_superuser?"是":"否" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="上次登录时间"
        min-width="150px"
        prop="last_login"
        width="150px"
      />

      <el-table-column
        label="创建时间"
        min-width="150px"
        prop="date_joined"
        width="150px"
      />

      <el-table-column label="操作" width="300px">
        <template #default="scope">
          <el-button
            size="small"
            @click="()=>{}"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`是否确认删除用户[${ scope.row.username}]?`"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button
                size="small"
                type="danger"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
          <el-button
            size="small"
            type="warning"
            @click="()=>{dialogFormVisible=true,resetPwdForm.user_id=scope.row.id}"
          >
            修改密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 表格分页 -->
    <div class="menu-pagination-block">
      <div class="pagination-container">
        <!-- <el-config-provider :locale="locale"> -->
          <el-pagination
            v-model:current-page="listQuery.page"
            v-model:page-size="listQuery.page_size"
            :background="true"
            :page-sizes="[10, 20, 30, 50]"
            :small="false"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        <!-- </el-config-provider> -->
      </div>
    </div>

    <!-- 重置密码框 -->
    <el-dialog v-model="dialogFormVisible" title="修改密码" center width="30%">
      <el-form :model="resetPwdForm">
        <!-- <el-form-item label="原始密码" >
        <el-input v-model="resetPwdForm.src_password" autocomplete="off" />
      </el-form-item> -->
        <el-form-item label="新密码">
          <el-input v-model="resetPwdForm.new_password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="再次输入新密码">
          <el-input v-model="resetPwdForm.new_password_again" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="resetPassword()">
            确认
          </el-button>
        </el-form-item>
      </el-form>
      <!-- <template #footer class="rest-footer" style="{  position: relative;}">
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            确认
          </el-button>
        </span>
      </template> -->
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { AuthApis } from 'src/services/apis/auth'
import type { User } from 'src/services/apis/auth'
import { ElMessage } from 'element-plus'
import { Edit, Search } from '@element-plus/icons-vue'
// import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文
import { routerPush } from 'src/router'
// 是否正在加载菜单列表
const listLoading = ref<boolean>(false)
// 菜单列表
const UserList = ref<User[]>()
// 具有树状结构的菜单树
// const MenuTree = ref<Menu[]>();
// 查询参数
const listQuery = reactive({
  page: 1,
  page_size: 10,
  // importance: undefined,
  username: undefined, // 用户名称
  email: undefined, // 用户邮箱
  sort: '+id', // 菜单ID，
  created_before: undefined,
  created_after: undefined,
})
// 用户列表总数
const total = ref(0)
// 显示重置面板
const dialogFormVisible = ref(false)

const resetPwdForm = ref({
  src_password: '',
  new_password: '',
  new_password_again: '',
  user_id: -1,
})

/** ********** 菜单删除对话框 ***********/

function sortChange (data: any) {
  // { column, prop, order }
  const { column, prop, order } = data
  console.log('排序信息发生改变', column, prop, order)
  if (prop === 'id') {
    sortByID(order)
  }
}

function sortByID (order: string) {
  if (order === 'ascending') {
    listQuery.sort = '+id'
  } else {
    listQuery.sort = '-id'
  }
  // 修改排序后，从第一页开始查询
  handleFilter()
}

function handleFilter () {
  listQuery.page = 1
  getUserList()
}

function getUserList () {
  AuthApis.getUserList(listQuery)
    .then((res) => {
      console.log('get user list success', res)
      UserList.value = res.data.results
      total.value = res.data.count
    })
    .catch((err) => {
      console.log('get user list error', err)
      ElMessage.error(`get user error:${err.data?.message}`)
    })
}

function getSortClass (key: string) {
  const sort = listQuery.sort
  return sort === `+${key}` ? 'ascending' : 'descending'
}

const resetPassword = () => {
  if (resetPwdForm.value.new_password !== resetPwdForm.value.new_password_again) {
    ElMessage.error('两次输入的密码不一致!')
  } else {
    console.log('>>>修改密码', resetPwdForm.value)
    AuthApis.resetPwd(resetPwdForm.value.user_id, resetPwdForm.value)
      .then((res) => {
        console.log('modify pwd success', res)
        ElMessage.info('修改密码成功!')
      })
      .catch((err) => {
        console.log('modify pwd error', err)
        ElMessage.error(`修改密码失败:${err.data?.message}`)
      })
  }
}

const handleDelete = (id: number) => {
  AuthApis.deleteUser(id, { timeout: 2 * 60 * 1000 })
    .then((res) => {
      ElMessage.info('删除用户成功')
      getUserList()
    })
    .catch((err) => {
      ElMessage.error(`删除用户失败:${err.data?.message}`)
      console.log('删除菜单失败', err)
    })
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  listQuery.page = val
  getUserList()
}

const handleSizeChange = (page_size: number) => {
  console.log(`page size change:${page_size}`)
  listQuery.page_size = page_size
  getUserList()
}

const handleCreate = () => {
  routerPush('login')
}

function handleUpdate () {
  // dialogFormVisible.value=false
  // dialogStatus.value = "update"

}

// 没精力去移动端的样式适配
if (window.screen.availWidth < 960) {
  // 移动端
  ElMessage({
    message:
      '检测到当年使用的设备为移动端.由于没有时间和精力去做样式适配,可能会影响体验,请在PC端使用!',
    type: 'error',
  })
}

getUserList()
</script>

<style lang="scss" scoped>

.dialog-footer button:first-child {
  margin-right: 10px;
}

.pagination-container {
  background: #fff;
  padding: 32px 16px;
}

.pagination-container.hidden {
  display: none;
}

.filter-container {
  background: #fff;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 32px;
  // padding-left: 5px;
}

.filter-item {
  padding-left: 10px;
}

.filter-item-button {
  margin-left: 20px;
}

.footer {
  margin-left: 60%;
}

.DatePickerCut {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
