<template>
  <el-row>
    <h4 opacity="90" text="base" font="bold" p="1" class="title">
      🗂️Apis信息汇总平台(数据来自各大API平台)(上次更新时间{{ lastUpdateTime }})
    </h4>
  </el-row>
  <WaveButton></WaveButton>
  <el-row class="item-list">
    <div v-for="item in ApiInfos" :key="item.id">
      <ApiTag
        :active="apiSelect.includes(item.api_name)"
        @click="selectApi(item)"
        type="src"
      >
        <span class="inline-flex">{{ getRandomPrefixIcon() }}</span>
        <span class="inline-flex" m="l-1" style="margin-left: 0.25rem">
          {{ item.api_name }}({{ item.api_price }}{{ item.api_price_unit }})
        </span>
      </ApiTag>
    </div>
  </el-row>
  <div class="filter-condition">
    <el-divider>
      <el-icon><star-filled /></el-icon>
      筛选条件
    </el-divider>
    <el-row>
      <ApiTag
        v-for="value in price"
        :key="value"
        :active="conditionSelect.price.includes(value)"
        type="condition"
        @click="selectCondition(value)"
      >
        <span class="inline-flex">🔎</span>
        <span class="inline-flex" m="l-1" style="margin-left: 0.25rem"
          >{{ value }}
        </span>
      </ApiTag>
      <ApiTag
        v-for="value in platform"
        :key="value"
        :active="conditionSelect.platform.includes(value)"
        type="condition"
        @click="selectCondition(value)"
      >
        <span class="inline-flex">🔎</span>
        <span class="inline-flex" m="l-1" style="margin-left: 0.25rem"
          >{{ value }}
        </span>
      </ApiTag>
      <ApiTag
        v-for="value in types"
        :key="value"
        :active="conditionSelect.types.includes(value)"
        type="condition"
        @click="selectCondition(value)"
      >
        <span class="inline-flex">🔎</span>
        <span class="inline-flex" m="l-1" style="margin-left: 0.25rem"
          >{{ value }}
        </span>
      </ApiTag>
    </el-row>
  </div>

  <div class="result">
    <el-divider>
      <el-icon><star-filled /></el-icon>
      查找结果
    </el-divider>
    <el-row>
      <ApiTag
        v-for="item in result"
        :key="item.id"
        :active="false"
        type="result"
        @click="redirectToUrl(item.api_url)"
      >
        <span class="inline-flex">🪄</span>
        <span class="inline-flex" m="l-1" style="margin-left: 0.25rem">
          {{ item.api_name }}({{ item.api_price }}{{ item.api_price_unit }})
        </span>
        <span class="inline-flex result-suffix">🔗</span>
      </ApiTag>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import ApiTag from "src/components/ApiTags.vue";
import WaveButton from "src/components/WavePlayButton.vue";
import { ref, computed } from "vue";
import { StarFilled } from "@element-plus/icons-vue";
import { ThirdApis } from "src/services/apis/third";

import type { ApiInfo, conditionSelectForm } from "src/services/apis/third";

const conditionSelect = ref<conditionSelectForm>({
  types: [],
  price: [],
  platform: [],
});

const apiSelect = ref([""]);

const ApiInfos = ref<ApiInfo[]>();

const price = ref(["免费", "收费"]);

const platform = ref<string[]>([]);

const types = ref<string[]>([]);

const lastUpdateTime = ref("");
const result = ref<ApiInfo[]>([]);

function selectApi(item: ApiInfo) {
  window.open(item.api_url);
}

function selectCondition(condition: string) {
  if (price.value.includes(condition)) {
    if (!conditionSelect.value.price.includes(condition)) {
      conditionSelect.value.price.push(condition);
    } else {
      const index = conditionSelect.value.price.indexOf(condition);
      conditionSelect.value.price.splice(index, 1);
    }
  } else if (platform.value.includes(condition)) {
    if (!conditionSelect.value.platform.includes(condition)) {
      conditionSelect.value.platform.push(condition);
    } else {
      const index = conditionSelect.value.platform.indexOf(condition);
      conditionSelect.value.platform.splice(index, 1);
    }
  } else if (types.value.includes(condition)) {
    if (!conditionSelect.value.types.includes(condition)) {
      conditionSelect.value.types.push(condition);
    } else {
      const index = conditionSelect.value.types.indexOf(condition);
      conditionSelect.value.types.splice(index, 1);
    }
  }
  console.log(
    "select condition",
    condition,
    conditionSelect.value.price,
    conditionSelect.value.platform,
    conditionSelect.value.types
  );
  search();
}

function getApiInfos() {
  ThirdApis.getApiInfoList({
    timeout: 2 * 60 * 1000,
  })
    .then(function (res) {
      console.log("get api info", res);
      ApiInfos.value = res.data.api_infos;
      platform.value = res.data.platform;
      types.value = res.data.api_types;
      lastUpdateTime.value = res.data.api_infos[0].updated;
    })
    .catch(function (err) {
      console.log("get api info error", err);
    });
}

function redirectToUrl(url: string) {
  console.log("join to url", url);
  window.open(url);
}

function getRandomPrefixIcon() {
  let prefixIconSet = [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤎",
    "❤️‍🔥",
    "❤️‍🩹",
    "💖",
    "💗",
    "💓",
    "💞",
    "💕",
    "❣️",
    "💘",
    "💝",
    "💟",
    "💌",
  ];
  let index = Math.floor(Math.random() * prefixIconSet.length);
  return prefixIconSet[index];
}

function search() {
  if (
    conditionSelect.value.types.length == 0 &&
    conditionSelect.value.platform.length == 0 &&
    conditionSelect.value.price.length == 0
  ) {
    result.value = [];
    return;
  }
  ThirdApis.apiSearch(conditionSelect.value, {
    timeout: 2 * 60 * 1000,
  })
    .then(function (res) {
      result.value = res.data.api_infos;
      console.log("search result", res);
    })
    .catch(function (err) {
      console.log("search err", err);
    });
}

getApiInfos();
</script>

<style scoped>
.title {
  font-weight: 700;
  padding: 2rem;
  font-family: bold;
  text-align: center;
}

.item-title {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  padding: 0.5rem;
  font-family: bold;
  text-align: center;
}
.apiInfos {
  justify-content: center;
}

.el-row {
  justify-content: center;
  margin-left: 10%;
  margin-right: 10%;
}
.filter-condition {
  margin-top: 5%;
}

.result {
  margin-top: 5%;
  margin-bottom: 5%;
  background-color: #ebe2e22b;
}
.result-suffix {
  margin-left: 5px;
}
</style>