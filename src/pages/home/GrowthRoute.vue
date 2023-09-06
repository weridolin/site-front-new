<template>
  <div class="route">
    <div class="container">
      <div class="timeline">
        <div v-for="(day_weekdays, key) in list" :key="key">
          <div
            class="timeline-month"
          >
            {{ splitYearMonth(key.toString()) }}
            <span>总共{{ getTotalCount(day_weekdays) }}次修改</span>
          </div>
          <div
            class="timeline-section"
            v-for="(logs, key) in day_weekdays"
            :key="key"
          >
            <div class="timeline-date">
              {{ splitDayWeekDays(key.toString()) }}
            </div>
            <div class="row">
              <div class="col-sm-4" v-for="(log, index) in logs" :key="index">
                <div class="timeline-box">
                  <div class="box-title">
                    <i
                      ><el-icon><Flag color="#62c462" /></el-icon
                    ></i>
                    {{ log.commit_message }}
                    <i class="update-log-link"
                      ><el-icon><Link /></el-icon
                    ></i>
                  </div>
                  <div class="box-content">
                    <div class="box-item">
                      <strong>提交时间</strong>: {{ log.updated }}
                    </div>
                    <div class="box-item">
                      <strong>提交内容</strong>: {{ log.commit_content }}
                    </div>
                  </div>
                  <div class="box-footer"> by {{ log.user_name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { HomeApi } from "src/services/apis/home";
import type { updateLogItem, updateLogPayload } from "src/services/apis/home";

interface DayWeekDayStruct {
  [day_weekday: string]: updateLogItem[];
}

const list = ref<updateLogPayload>();

const initUpdateLog = () => {
  HomeApi.updateLog
    .getUpdateLogList()
    .then((res) => {
      // list.value = res.d;
      console.log("获取更新日志", res.data);
      list.value = res.data;
    })
    .catch((err) => {
      console.log("获取更新日志失败", err);
    });
};

function getTotalCount(items: DayWeekDayStruct): number {
  console.log("get total count", items);
  let count = 0;
  for (const key in items) {
    count += items[key].length;
  }
  return count;
}

function splitYearMonth(year_month_str: string): string {
  console.log("splitYearMonth", year_month_str);
  let list = year_month_str.split("-");
  return `${list[0]},${list[1]}月`;
}

function splitDayWeekDays(day_weekday_str: string): string {
  console.log();
  let list = day_weekday_str.split("-");
  return `${list[0]},${list[1]}`;
}

initUpdateLog();
</script>

<style lang="css" scoped>
.update-log-link {
  margin-top: 5px;
}
</style>

<style scoped>
.route {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  background-color: #272b30;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-image: url("src/assets/route-bg.jpg");
  color: #c8c8c8;
  /* margin-right: 2%; */
  /* margin-left: 20%;
  margin-right: 20%; */
}
.timeline {
  margin-top: 20px;
  position: relative;
  /* margin-left: 10%; */
}

.timeline:before {
  position: absolute;
  content: "";
  width: 4px;
  height: calc(100% + 50px);
  background: rgb(138, 145, 150);
  background: -moz-linear-gradient(
    left,
    rgba(138, 145, 150, 1) 0%,
    rgba(122, 130, 136, 1) 60%,
    rgba(98, 105, 109, 1) 100%
  );
  background: -webkit-linear-gradient(
    left,
    rgba(138, 145, 150, 1) 0%,
    rgba(122, 130, 136, 1) 60%,
    rgba(98, 105, 109, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(138, 145, 150, 1) 0%,
    rgba(122, 130, 136, 1) 60%,
    rgba(98, 105, 109, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a9196', endColorstr='#62696d',GradientType=1 );
  left: 14px;
  top: 5px;
  border-radius: 4px;
}

.timeline-month {
  /* z-index: 2; */
  position: relative;
  padding: 4px 15px 4px 35px;
  background-color: #444950;
  display: inline-block;
  width: auto;
  border-radius: 40px;
  border: 1px solid #17191b;
  border-right-color: black;
  margin-bottom: 30px;
}

.timeline-month span {
  position: absolute;
  top: -1px;
  left: calc(100% - 10px);
  /* z-index: 1; */
  white-space: nowrap;
  display: inline-block;
  background-color: #444950;
  padding: 4px 10px 4px 20px;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  border: 1px solid black;
  box-sizing: border-box;
}

.timeline-month:before {
  position: absolute;
  content: "";
  width: 20px;
  height: 20px;
  background: rgb(138, 145, 150);
  background: -moz-linear-gradient(
    top,
    rgba(138, 145, 150, 1) 0%,
    rgba(122, 130, 136, 1) 60%,
    rgba(112, 120, 125, 1) 100%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(138, 145, 150, 1) 0%,
    rgba(122, 130, 136, 1) 60%,
    rgba(112, 120, 125, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(138, 145, 150, 1) 0%,
    rgba(122, 130, 136, 1) 60%,
    rgba(112, 120, 125, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a9196', endColorstr='#70787d',GradientType=0 );
  border-radius: 100%;
  border: 1px solid #17191b;
  left: 5px;
}

.timeline-section {
  padding-left: 35px;
  display: block;
  position: relative;
  margin-bottom: 30px;
}

.timeline-date {
  margin-bottom: 15px;
  padding: 2px 15px;
  background: linear-gradient(#74cae3, #5bc0de 60%, #4ab9db);
  position: relative;
  display: inline-block;
  border-radius: 20px;
  border: 1px solid #17191b;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
}
.timeline-section:before {
  content: "";
  position: absolute;
  width: 30px;
  height: 1px;
  background-color: #444950;
  top: 12px;
  left: 20px;
}

.timeline-section:after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background: linear-gradient(
    to bottom,
    rgba(138, 145, 150, 1) 0%,
    rgba(122, 130, 136, 1) 60%,
    rgba(112, 120, 125, 1) 100%
  );
  top: 7px;
  left: 11px;
  border: 1px solid #17191b;
  border-radius: 100%;
}

.timeline-section .col-sm-4 {
  margin-bottom: 15px;
}

.timeline-box {
  position: relative;

  background-color: #444950;
  border-radius: 15px;
  border-top-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border: 1px solid #17191b;
  transition: all 0.3s ease;
  overflow: hidden;
}

.box-icon {
  position: absolute;
  right: 5px;
  top: 0px;
}

.box-title {
  padding: 5px 15px;
  border-bottom: 1px solid #17191b;
}

.box-title i {
  margin-right: 5px;
}

.box-content {
  padding: 5px 15px;
  background-color: #17191b;
}

.box-content strong {
  color: #666;
  font-style: italic;
  margin-right: 5px;
}

.box-item {
  margin-bottom: 5px;
}

.box-footer {
  padding: 5px 15px;
  border-top: 1px solid #17191b;
  background-color: #444950;
  text-align: right;
  font-style: italic;
}
</style>