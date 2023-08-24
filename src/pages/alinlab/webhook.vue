<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <span class="webhook-url">当前的webhook链接:{{ webhook_url }}</span>
        <el-button
          class="copy-url"
          type="primary"
          :icon="CopyDocument"
          size="small"
          @click="copy()"
          circle
        />
      </el-header>
      <el-container>
        <el-aside width="25%">
          <div>
            <div class="record-query">
              <el-input
                v-model="queryCondition"
                class="w-50 m-2 record-query-input"
                placeholder="输入查询条件"
                :suffix-icon="Search"
              />
            </div>
            <el-divider class="aside-divider"> </el-divider>
            <ul class="infinite-list">
              <el-card
                shadow="hover"
                v-for="(history, index) in historyList"
                :key="index"
                class="infinite-list-item"
                @click="showHistoryDetail(index)"
              >
                <el-tag class="ml-2" type="success">{{
                  history.method
                }}</el-tag>
                #{{ history.host }} - {{ history.updated }}
              </el-card>
            </ul>
            <div class="record-pagination">
              <el-pagination
                background
                :page-size="page_size"
                :pager-count="
                  () => {
                    return count / 6 + 1;
                  }
                "
                layout="prev, pager, next"
                :total="count"
                class="pagination"
                @current-change="getWebHookCalledHistory"
              />
            </div>
          </div>
        </el-aside>
        <el-main style="max-width: 70%">
          <div>
            <el-row :gutter="40">
              <!-- request info detail -->
              <el-col :span="12"
                ><div class="request-detail">
                  <el-row>
                    <el-col :span="12">
                      <el-text tag="b" class="request-detail-title"
                        >Request Details</el-text
                      >
                    </el-col>
                    <el-col :span="12" style="text-align: right">
                      <el-dropdown :hide-on-click="false">
                        <span class="el-dropdown-link">
                          export as
                          <el-icon class="el-icon--right"
                            ><arrow-down
                          /></el-icon>
                        </span>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item>Curl</el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </el-col>
                  </el-row>
                  <el-table
                    :data="requestDetail"
                    :row-class-name="tableRowClassName"
                    table-layout="fixed"
                    border
                    style="padding-top: 10px"
                  >
                    <el-table-column prop="field" label="Field" />
                    <el-table-column prop="value" label="Value" />
                  </el-table>
                </div>
              </el-col>
              <!-- request header -->
              <el-col :span="12"
                ><div class="request-headers">
                  <el-row>
                    <!-- <el-col :span="12"> -->
                    <el-text tag="b" class="request-detail-title"
                      >Headers</el-text
                    >
                    <!-- </el-col> -->
                  </el-row>
                  <el-table
                    :data="header"
                    :row-class-name="tableRowClassName"
                    table-layout="fixed"
                    border
                  >
                    <el-table-column prop="field" label="Field" />
                    <el-table-column prop="value" label="Value" />
                  </el-table>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script setup lang="ts">
import { Search, ArrowDown } from "@element-plus/icons-vue";
import { v4 as uuidv4 } from "uuid";
import { onMounted, onUnmounted, ref } from "vue";
import { ElNotification } from "element-plus";
import { ThirdApis } from "src/services/apis/third";
import type { WebHookHistory } from "src/services/apis/third";
import { CopyDocument } from "@element-plus/icons-vue";
import { CONFIG } from "src/config";
import {setLocalStorageWithExpiration,getLocalStorageWithExpiration} from "src/store/local"

const uuid = ref("")
const webhook_url = ref("")
const queryCondition = ref("");
const count = ref(0);
const tableData = ref<WebHookHistory>();
const historyList = ref<WebHookHistory[]>([]);
const page_size = ref(6);
var WsClient: WebSocket | null = null;

interface TableDataItem {
  field: string;
  value: string;
}

const header = ref<TableDataItem[]>([]);

const requestDetail = ref<TableDataItem[]>([]);
const queryParams = ref<TableDataItem[]>([]);
const formData = ref<TableDataItem[]>([]);

/** function  */

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: WebHookHistory;
  rowIndex: number;
}) => {
  if (rowIndex % 2 === 0) {
    return "warning-row";
  } else if (rowIndex % 2 === 1) {
    return "success-row";
  }
  return "";
};

function copy() {
  // 创建一个虚拟的input来实现
  let newInput = document.createElement("input");
  // 讲存储的数据赋值给input的value值
  newInput.value = webhook_url.value;
  // appendChild() 方法向节点添加最后一个子节点。
  document.body.appendChild(newInput);
  // 选中input元素中的文本
  // select() 方法用于选择该元素中的文本。
  newInput.select();
  document.execCommand("Copy"); // 执行复制操
  newInput.remove();
  ElNotification({
    message: "复制成功",
    type: "success",
  });
}

function getWebHookCalledHistory(page: number) {
  ThirdApis.getWebHookCalledHistory(
    {
      params: {
        page: page,
        size: 6,
      },
    },
    uuid.value
  ).then((res) => {
    console.log("get call history", res);
    if (res.items != null){
      historyList.value = res.items;
    }
    count.value = res.total;
  });
}

function showHistoryDetail(index: number) {
  tableData.value = historyList.value[index];
  header.value = [];
  queryParams.value = [];
  formData.value = [];
  requestDetail.value = [];
  for (const key in historyList.value[index].header) {
    header.value.push({
      field: key,
      value: historyList.value[index].header[key],
    });
  }
  for (const key in historyList.value[index].query_params) {
    queryParams.value.push({
      field: key,
      value: historyList.value[index].query_params[key],
    });
  }
  for (const key in historyList.value[index].form_data) {
    formData.value.push({
      field: key,
      value: historyList.value[index].form_data[key],
    });
  }
  requestDetail.value.push(
    ...[
      {
        field: "method",
        value: historyList.value[index].method,
      },
      {
        field: "date",
        value: historyList.value[index].updated,
      },
      {
        field: "uuid",
        value: historyList.value[index].uuid,
      },
      {
        field: "url",
        value: webhook_url.value,
      },
      {
        field: "raw",
        value: historyList.value[index].raw,
      },
    ]
  );
}

onMounted(() => {
  // 获取 uuid
  let _uuid = getLocalStorageWithExpiration("webhook-uuid-key")
  if (_uuid!=null){
    console.log("get local uuid",_uuid)
    uuid.value = _uuid
  }else{
    uuid.value = uuidv4()
    console.log("set local uuid",uuid.value)
    setLocalStorageWithExpiration("webhook-uuid-key",uuid.value,60*60*24*7)
  }

  webhook_url.value = `${CONFIG.API_HOST}/webhook/api/v1/${uuid.value}`;
  /**   ws ***/
  let second_protocols  = uuid.value
  WsClient = new WebSocket(`${CONFIG.WS_HOST}/webhook/ws`,second_protocols);
  WsClient.onmessage = function (event) {
    console.log("Message from server ", event.data);
    const data = JSON.parse(event.data);
    let history: WebHookHistory = {
      uuid: data.uuid,
      method: data.method,
      host: data.host,
      query_params: data.query_params,
      form_data: data.form_data,
      header: data.header,
      raw: data.raw,
      updated: data.updated_at,
      user_id: data.user_id,
    };
    //直接将新的ws消息插入到列表第一条
    if (historyList.value.length < page_size.value) {
      if (historyList.value ==null){
        historyList.value = []
      }
      console.log("add history record", historyList.value,history)
      historyList.value.unshift(history);
    } else {
      historyList.value.pop();
      historyList.value.unshift(history);
    }
  };
  WsClient.onclose = function (event) {
    console.log("websocket close", event);
  };
  WsClient.onerror = function (event) {
    console.log("websocket error", event);
  };

  getWebHookCalledHistory(1);

});

onUnmounted(() => {
  if (WsClient != null) {
    WsClient.close();
  }
});
</script>
  
<style>
.header {
  background-color: #353333;
  color: white;
  float: left;
  /* height: 50px; */
  padding: 15px;
  margin-bottom: 2%;
  text-align: center;
  font-size: 18px;
  line-height: 20px;
  /* display: flex; */
}

.copy-url {
  margin: 0% 0% 0% 0.5%;
}

.infinite-list {
  height: 80%;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.record-pagination {
  max-width: 500px;
  align-items: center;
  justify-content: center;
}

.record-query {
  max-width: 500px;
}
.record-query-input {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* max-width: 80%; */
  margin-left: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 20px 0; */
}

.aside-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  max-width: 500px;
}

.el-table .warning-row {
  --el-table-tr-bg-color: #fafafa;
}

.request-detail-title {
  padding-bottom: 10px;
}

.el-main {
  --el-main-padding: 0px;
  overflow: hidden;
}
</style>