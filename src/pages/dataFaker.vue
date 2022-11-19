<template>
  <div id="clouds">
    <el-container
      v-loading="state.loading"
      :element-loading-text="state.loadingText"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-aside>
        <Plane />
        <div class="downForm">
          <el-form :model="downForm" class="downForm">
            <el-form-item>
              <el-alert
                title="📢📢📢:输入下载码即可下载 ⬇️"
                type="info"
                effect="dark"
                :closable="false"
              />
            </el-form-item>
            <el-form-item label="文件下载码" :label-width="formLabelWidth">
              <el-input v-model="downForm.down_code" autocomplete="off" style="width:50%" @input="getFileInfoByDownCode" />
            </el-form-item>
            <el-form-item label="已上传文件" :label-width="formLabelWidth">
              <el-tag size="small" class="downFile" closable />
            </el-form-item>
            <el-form-item label="过期时间" :label-width="formLabelWidth">
              <div class="expire-time" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" style="width:50%;" class="downButton" @click="downFile">
                下载
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>
      <el-container class="mainForm">
        <el-header>
          <div>
            <el-alert
              :closable="false"
              title="注意:📢📢📢📢📢📢📢📢📢📢📢📢"
              type="success"
              center
              description="只需在下面按自己的需求选择字段和类型,选择对应的生成的数据的条数,后台生成后会返回一个下载码,即可下载对应的数据,默认为CSV格式"
            />
          </div>
        </el-header>
        <el-main>
          <el-form ref="dynamicValidateFormR" :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.items"
              :key="index"
              :label="'字段' + index"
              :prop="'items.' + index + '.alias'"
            >
              <!--  form item  -->
              <el-row :gutter="10">
                <el-col :xs="16" :sm="16" :md="16" :lg="18" :xl="18">
                  <div class="field-type">
                    <el-row :gutter="10">
                      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="4">
                        <el-select v-model="domain.alias" placeholder="请选择是与否" @change="selectItem(domain)">
                          <el-option
                            v-for="item in options"
                            :key="item.alias"
                            :label="item.alias"
                            :value="item.alias"
                          />
                        </el-select>
                      </el-col>
                      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="4">
                        <el-form-item label="字段名称" style=" text-align: left">
                          <el-input v-model="domain.name" />
                        </el-form-item>
                      </el-col>
                      <el-col
                        v-for="condition in domain.condition"
                        :key="condition.alias"
                        :prop="condition.alias"
                        :label="condition.alias"
                        :xs="8"
                        :sm="8"
                        :md="8"
                        :lg="8"
                        :xl="4"
                      >
                        <el-form-item
                          class="condition-input"
                          :label="condition.alias"
                          style="text-align: left"
                        >
                          <!-- input 输入框 -->
                          <el-input v-if="condition.front_type=='input'" v-model="condition.value" />
                          <!-- 0/1 下拉框选择 -->
                          <el-select v-if="condition.front_type=='bool'" v-model="condition.value" placeholder="请选择是与否">
                            <el-option
                              v-for="(item,index) in ['true','false']"
                              :key="index"
                              :label="item"
                              :value="index"
                            />
                          </el-select>
                          <!-- 枚举下拉选择框 -->
                          <el-select v-if="condition.front_type=='select'" v-model="condition.value" placeholder="请选择字段类型">
                            <el-option
                              v-for="item in condition.select_options"
                              :key="item"
                              :label="item"
                              :value="item"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                  <div class="grid-content bg-purple-light">
                    <el-button @click.prevent="removeDomain(domain)">
                      删除
                    </el-button>
                    <el-button @click="resetForm(domain)">
                      重置
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-main>
        <el-footer>
          <!-- <el-input v-model="dataCount" ></el-input> -->
          <el-divider />
          <el-row>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              生成的数据条数：
              <el-input v-model="dataCount" style="width:20%;margin-right:10px" />
              <el-button type="primary" @click="initInfo">
                <el-icon style="vertical-align: middle">
                  <Search />
                </el-icon>
                <span style="vertical-align: middle"> 生成数据 </span>
              </el-button>
              <el-button @click="addDomain">
                <el-icon style="vertical-align: middle">
                  <CirclePlus />
                </el-icon><span>新增</span>
              </el-button>
            </el-col>
            <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
              <!-- <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <span style="text-align:left;">生成数据进度➡️➡️</span>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20"> -->
              <el-progress :text-inside="true" :stroke-width="24" :percentage="progress_percent" status="success" class="progress" />
            <!-- </el-col> -->
            </el-col>
          </el-row>
          <el-divider />
        <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">全部重置</el-button> -->
        </el-footer>
      </el-container>
    </el-container>

    <!-- <div id="clouds">
	<div class="cloud1 x1"></div>
	<div class="cloud1 x2"></div>
	<div class="cloud1 x3"></div>
	<div class="cloud1 x4"></div>
	<div class="cloud1 x5"></div>
</div> -->
    <!-- <a style="position: fixed; bottom: 10px; right: 10px;color:#CCC" href="https://plus.google.com/111052275277622928148?rel=me">Google+</a> -->
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import Plane from 'src/components/plane.vue'
import {
  formLabelWidth,
  downForm,
  dataCount,
  dynamicValidateForm,
  options,
  temp,
  getFileInfoByDownCode,
  key,
  progress_percent,
  state,
  build_conn,
  resetForm,
  removeDomain,
  selectItem,
  addDomain,
  initInfo,
  startGenerateFakeData,
  downFile,
} from 'src/pages/dataFaker'
if (window.screen.availWidth < 768) {
  // 移动端
  ElMessage({
    message: '检测到当年使用的设备为移动端.由于没有时间和精力去做样式适配,可能会影响体验,请在PC端使用!',
    type: 'error',
  })
}
// this.initInfo()
// console.log(">>>>",process.env,process.env.WS_CONNECT_URL)
console.log(dynamicValidateForm)

</script>

<style>

.el-main {
    margin-top: 1%;
}

.progress{
    margin-top: 18px;

}
body {
  height: 100%;
  width: 100%;
}

footer {
    background: rgb(255 255 255 / 15%);
    margin-top: 3rem;
    padding: 1rem 0;
    position: inherit;
    bottom: 0;
    width: 100%;
}

.el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.bg {
    background-image: url('src@/assets/cloud.png');
    background-repeat:no-repeat;
    background-position:0% 0%;
    background-size:cover;
    /* position: absolute; */
    height: 100%;
      width: 100%;
}

/* .condition-input .el-form-item__label{
    width: 80px !important;
    text-align: right !important;
}
.condition-input .el-form-item__content{
    margin-left: 80px !important;
} */

  .el-header{
    background-color:#f0f9eb;
    /* color: #333; */
    /* text-align: center; */
    /* line-height: 60px; */
  }
  .el-footer {
    /* background-color: #B3C0D1;
    color: #333; */
    /* text-align: center; */
    line-height: 60px;
  }

  .downForm {
    margin-top:50%;
    /* background-color: #B3C0D1; */
  }

  .el-aside   {
    /* background-color:#13101000 */
    /* background-image: url('~@/assets/cloud.jpg'); */

  }

  .downButton{
    text-align: center;
    margin-left: 20%;
  }

  .el-main {
    /* background-color: #E9EEF3; */
    /* color: #333; */
    /* text-align: center; */
    line-height: 160px;
    height: 100%;

  }

/*                                动态云朵                   */
#clouds{
	padding: 10px 0;
	background: #c9dbe9;
	background: -webkit-linear-gradient(top, #c9dbe9 0%, #fff 100%);
	background: -linear-gradient(top, #c9dbe9 0%, #fff 100%);
	background: -moz-linear-gradient(top, #c9dbe9 0%, #fff 100%);
    height: 100%;
}

/*Time to finalise the cloud shape*/
.cloud1 {
	width: 200px; height: 60px;
	background: #fff;

	border-radius: 200px;
	-moz-border-radius: 200px;
	-webkit-border-radius: 200px;

	position: relative;
}

.cloud1:before, .cloud1:after {
	content: '';
	position: absolute;
	background: #fff;
	width: 100px; height: 80px;
	position: absolute; top: -15px; left: 10px;

	border-radius: 100px;
	-moz-border-radius: 100px;
	-webkit-border-radius: 100px;

	-webkit-transform: rotate(30deg);
	transform: rotate(30deg);
	-moz-transform: rotate(30deg);
}

.cloud1:after {
	width: 120px; height: 120px;
	top: -55px; left: auto; right: 15px;
}

/*Time to animate*/
.x1 {
	-webkit-animation: moveclouds 15s linear infinite;
	-moz-animation: moveclouds 15s linear infinite;
	-o-animation: moveclouds 15s linear infinite;
}

/*variable speed, opacity, and position of clouds for realistic effect*/
.x2 {
	left: 200px;

	-webkit-transform: scale(0.6);
	-moz-transform: scale(0.6);
	transform: scale(0.6);
	opacity: 0.6; /*opacity proportional to the size*/

	/*Speed will also be proportional to the size and opacity*/
	/*More the speed. Less the time in 's' = seconds*/
	-webkit-animation: moveclouds 25s linear infinite;
	-moz-animation: moveclouds 25s linear infinite;
	-o-animation: moveclouds 25s linear infinite;
}

.x3 {
	left: -250px; top: -200px;

	-webkit-transform: scale(0.8);
	-moz-transform: scale(0.8);
	transform: scale(0.8);
	opacity: 0.8; /*opacity proportional to the size*/

	-webkit-animation: moveclouds 20s linear infinite;
	-moz-animation: moveclouds 20s linear infinite;
	-o-animation: moveclouds 20s linear infinite;
}

.x4 {
	left: 470px; top: -250px;

	-webkit-transform: scale(0.75);
	-moz-transform: scale(0.75);
	transform: scale(0.75);
	opacity: 0.75; /*opacity proportional to the size*/

	-webkit-animation: moveclouds 18s linear infinite;
	-moz-animation: moveclouds 18s linear infinite;
	-o-animation: moveclouds 18s linear infinite;
}

.x5 {
	left: -150px; top: -150px;

	-webkit-transform: scale(0.8);
	-moz-transform: scale(0.8);
	transform: scale(0.8);
	opacity: 0.8; /*opacity proportional to the size*/

	-webkit-animation: moveclouds 20s linear infinite;
	-moz-animation: moveclouds 20s linear infinite;
	-o-animation: moveclouds 20s linear infinite;
}

@-webkit-keyframes moveclouds {
	0% {margin-left: 1000px;}
	100% {margin-left: -1000px;}
}
@-moz-keyframes moveclouds {
	0% {margin-left: 1000px;}
	100% {margin-left: -1000px;}
}
@-o-keyframes moveclouds {
	0% {margin-left: 1000px;}
	100% {margin-left: -1000px;}
}

</style>
