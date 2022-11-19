<template>
  <div class="app-container">
    <!-- 菜单表格操作栏  -->
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
        v-model="listQuery.menu_name"
        placeholder="菜单名称"
        style="width: 200px"
        class="filter-item"
        @keyup.enter="handleFilter"
      />
      <el-select
        v-model="listQuery.menu_type"
        placeholder="菜单类型"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="(item, index) in MenuTypeAlias"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="primary"
        class="filter-item-button"
        :icon="Search"
        @click="handleFilter"
        >搜索</el-button
      >
      <el-button
        type="primary"
        class="filter-item-button"
        :icon="Edit"
        @click="
          () => {
            dialogFormVisible = true;
            (dialogStatus = 'create'), initTemForm();
          }
        "
        >增加</el-button
      >
    </el-row> 
    </div>

    <!-- 菜单数据显示表格 -->
    <el-table
      v-loading="listLoading"
      :data="MenuList"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="序号"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
      </el-table-column>

      <el-table-column
        label="创建时间"
        prop="created"
        width="180px"
        align="center"
      >
      </el-table-column>

      <el-table-column
        label="更新时间"
        min-width="150px"
        prop="updated"
        width="180px"
      >
      </el-table-column>

      <el-table-column
        label="菜单名称"
        min-width="150px"
        prop="menu_name"
        width="150px"
      >
      </el-table-column>

      <el-table-column
        label="菜单对应的组件路径"
        min-width="150px"
        prop="menu_view_path"
        width="150px"
      >
      </el-table-column>

      <el-table-column
        label="菜单图标"
        min-width="150px"
        prop="menu_icon"
        width="100px"
      >
      </el-table-column>

      <el-table-column label="菜单类型" min-width="150px" width="150px">
        <template #default="scope">
          <span>{{ getMenuTypeName(scope.row.menu_type) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="菜单路径"
        min-width="150px"
        prop="menu_url"
        width="150px"
      >
      </el-table-column>

      <el-table-column
        label="菜单路由名称"
        min-width="150px"
        prop="menu_route_name"
        width="150px"
      >
      </el-table-column>

      <el-table-column
        label="父级菜单名称"
        min-width="150px"
        prop="p_id.menu_name"
        width="150px"
      >
      </el-table-column>

      <!-- TODO 时间筛选 -->

      <el-table-column label="操作" width="150px">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="onDelConfirm(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 表格分页 -->
    <div class="menu-pagination-block">
      <div class="pagination-container">
        <el-config-provider :locale="locale">
          <el-pagination
            :background="true"
            v-model:current-page="listQuery.page"
            v-model:page-size="listQuery.page_size"
            :page-sizes="[10, 20, 30, 50]"
            :small="false"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </el-config-provider>
      </div>
    </div>

    <!-- 删除菜单时的对话框 -->
    <el-dialog
      v-model="delDetailDialog"
      title="以下菜单将被删除,是否确认?"
      width="30%"
    >
      <el-row>
        <el-tree
          :data="MenuToDel"
          :show-checkbox="false"
          node-key="id"
          :default-expand-all="true"
          :props="treeProps"
        />
      </el-row>
      <!-- <span>"以上菜单将被删除,是否确认?"</span> -->

      <el-row>
        <el-button
          @click="
            () => {
              (delDetailDialog = false), (MenuToDel = []);
            }
          "
          >取消</el-button
        >
        <el-button type="primary" @click="handleDelete()"> 确定 </el-button>
      </el-row>
    </el-dialog>

    <!-- 新增/编辑 对话框  -->
    <el-dialog :title="textMap[dialogStatus]" v-model="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="MenuRules"
        :model="TemMenuForm"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="菜单类型" placeholder="Please select">
          <el-select
            v-model="TemMenuForm.menu_type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in MenuTypeAlias"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menu_name">
          <el-input v-model="TemMenuForm.menu_name" />
        </el-form-item>
        <el-form-item label="菜单路径" prop="menu_url">
          <el-input v-model="TemMenuForm.menu_url" />
        </el-form-item>
        <el-form-item label="菜单组件" prop="menu_view_path">
          <el-input v-model="TemMenuForm.menu_view_path" />
        </el-form-item>
        <el-form-item label="菜单图标" prop="menu_icon">
          <el-input v-model="TemMenuForm.menu_icon" />
        </el-form-item>
        <el-form-item label="菜单路由名称" prop="menu_route_name">
          <el-input v-model="TemMenuForm.menu_route_name" />
        </el-form-item>
        <el-form-item label="上级菜单" prop="p_id">
          <el-select
            v-model="TemMenuForm.p_id"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="(item, index) in MenuList"
              :key="index"
              :label="item.menu_name"
              :value="item.id"
            />
            <el-option :key="-1" label="无" :value="null" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? handleCreate() : handleUpdate()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { AuthApis } from "src/services/apis/auth";
import type { Menu } from "src/services/apis/auth";
import { ElMessage } from "element-plus";
import { Edit, Search } from "@element-plus/icons-vue";
import locale from "element-plus/lib/locale/lang/zh-cn"; //中文

//是否正在加载菜单列表
const listLoading = ref<boolean>(false);
// 菜单列表
const MenuList = ref<Menu[]>();
// 具有树状结构的菜单树
// const MenuTree = ref<Menu[]>();
// 查询参数
const listQuery = reactive({
  page: 1,
  page_size: 3,
  // importance: undefined,
  menu_name: undefined, //菜单名称
  menu_type: undefined, //菜单类型
  sort: "+id", //菜单ID，
  created_before:undefined,
  created_after:undefined

});
//菜单总数
const total = ref(0);
// 创建编辑菜单面板
const dialogFormVisible = ref(false);
const textMap = {
  update: "编辑菜单",
  create: "创建菜单",
};
const MenuTypeAlias = [
  {
    label: "菜单",
    value: 0,
  },
  {
    label: "按钮",
    value: 1,
  },
];
const MenuTypeAliasRef = {
  0: "菜单",
  1: "按钮",
};
// 创建编辑菜单状态
const dialogStatus = ref<"update" | "create">("update");
const TemMenuForm = ref<Menu>({
  menu_name: "",
  menu_url: "",
  menu_icon: "",
  menu_type: -1,
  menu_view_path: "",
  menu_route_name: "",
  p_id: {} as Menu,
  id: -1,
  children: [],
});

const MenuRules = {
  menu_type: [
    { required: true, message: "菜单类型不能为空", trigger: "change" },
  ],
  // timestamp: [{ required: true, message: 'timestamp is required', trigger: 'change' }],
  menu_name: [{ required: true, message: "菜单标题不能为空", trigger: "blur" }],
  menu_url: [{ required: true, message: "菜单url不能为空", trigger: "blur" }],
  menu_view_path: [
    { required: true, message: "菜单对应的组件不能为空", trigger: "blur" },
  ],
};

/************ 菜单删除对话框 ***********/
const treeProps = {
  label: "menu_name",
  children: "children",
};

// export interface MenuTree
const delDetailDialog = ref(false);
const MenuToDel = ref<Menu[]>([]);
// 获取删除菜单对应的所有子菜单
const onDelConfirm = (index: number, menu: Menu) => {
  AuthApis.getMenuDetail(menu.id, { timeout: 2 * 60 * 1000 })
    .then((res) => {
      MenuToDel.value = [];
      console.log(">>>删除菜单", res.data);
      MenuToDel.value.push(res.data);
    })
    .catch((err) => {
      console.log("获取删除的子菜单失败!", err);
      ElMessage.error(`获取删除的子菜单失败!${err}`);
    })
    .finally(() => {
      delDetailDialog.value = true;
      console.log(">>>当前删除的菜单树", MenuToDel.value);
    });
};

const getMenuTypeName = (menu_type: number) => {
  switch (menu_type) {
    case 0:
      return "菜单";
      break;
    case 1:
      return "按钮";
      break;
    default:
      break;
  }
};

function sortChange(data: any) {
  // { column, prop, order }
  const { column, prop, order } = data;
  console.log("排序信息发生改变", column, prop, order);
  if (prop === "id") {
    sortByID(order);
  }
}

function sortByID(order: string) {
  if (order === "ascending") {
    listQuery.sort = "+id";
  } else {
    listQuery.sort = "-id";
  }
  //修改排序后，从第一页开始查询
  handleFilter();
}

function handleFilter() {
  listQuery.page = 1;
  getMenuList();
}

function getMenuList() {
  AuthApis.getMenuList(listQuery)
    .then((res) => {
      console.log("get menu list success", res);
      MenuList.value = res.data.results;
      total.value = res.data.count;
    })
    .catch((err) => {
      console.log("get menu list error", err);
      ElMessage.error(`get menu error:${err}`);
    });
}

function getSortClass(key: string) {
  const sort = listQuery.sort;
  return sort === `+${key}` ? "ascending" : "descending";
}

const initTemForm = () => {
  TemMenuForm.value.menu_name = "";
  TemMenuForm.value.menu_icon = "";
  TemMenuForm.value.menu_route_name = "";
  TemMenuForm.value.menu_type = 0;
  TemMenuForm.value.menu_url = "";
  TemMenuForm.value.menu_view_path = "";
  TemMenuForm.value.id = -1;
};

const handleEdit = (index: number, row: Menu) => {
  dialogFormVisible.value = true;
  dialogStatus.value = "update";
  TemMenuForm.value.menu_name = row.menu_name;
  TemMenuForm.value.menu_icon = row.menu_icon;
  TemMenuForm.value.menu_route_name = row.menu_route_name;
  TemMenuForm.value.menu_type = row.menu_type;
  TemMenuForm.value.menu_url = row.menu_url;
  TemMenuForm.value.menu_view_path = row.menu_view_path;
  TemMenuForm.value.id = row.id;
  TemMenuForm.value.p_id = row.p_id;
  console.log(index, row, "编辑菜单");
};
const handleDelete = () => {
  AuthApis.deleteMenu(MenuToDel.value[0].id, { timeout: 2 * 60 * 1000 })
    .then((res) => {
      ElMessage.info("删除菜单成功");
      getMenuList();
      delDetailDialog.value = false;
      MenuToDel.value = [];
    })
    .catch((err) => {
      ElMessage.error(`删除菜单失败:`, err);
      console.log("删除菜单失败");
    });
  console.log(MenuToDel.value[0].id, "删除菜单");
};

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  listQuery.page = val;
  getMenuList();
};

const handleSizeChange = (page_size: number) => {
  console.log(`page size change:${page_size}`);
  listQuery.page_size = page_size;
  getMenuList();
};

function handleCreate() {
  console.log("添加菜单", TemMenuForm.value);
  AuthApis.createMenu(TemMenuForm.value)
    .then((res) => {
      ElMessage.info("菜单创建成功");
      getMenuList();
      dialogFormVisible.value = false;
    })
    .catch((err) => {
      ElMessage.error(`菜单创建失败${err.data.message}`);
      console.log(`菜单创建失败${err}`);
    });
}

function handleUpdate() {
  // dialogFormVisible.value=false
  // dialogStatus.value = "update"
  console.log("更新菜单", TemMenuForm.value);
  AuthApis.updateMenu(TemMenuForm.value.id, TemMenuForm.value)
    .then((res) => {
      ElMessage.info("菜单更新成功");
      getMenuList();
      dialogFormVisible.value = false;
    })
    .catch((err) => {
      ElMessage.error(`菜单更新失败${err.data.message}`);
      console.log(`菜单更新失败${err}`);
    });
}

// 没精力去移动端的样式适配
if(window.screen.availWidth<960){
    //移动端
        ElMessage({
            message: '检测到当年使用的设备为移动端.由于没有时间和精力去做样式适配,可能会影响体验,请在PC端使用!',
            type: 'error'
        });
    }

getMenuList();
</script>
<style lang="scss" scoped>
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