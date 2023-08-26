<template>
  <div class="container mess-list">
    <h1 class="mess-title">
      <i class="el-icon-ice-cream-round"></i>
    </h1>
    <div class="mess-group">
      <div class="mess-content">
        <div class="container bootdey">
          <div class="col-md-12 bootstrap snippets">
            <div class="panel">
              <div class="panel-body">
                <h4 class="text-success">已经开启评论精选 (ಥ _ ಥ)</h4>
              </div>
            </div>
            <div class="panel">
              <div class="panel-body"
                  v-for="item in propComments.list"
                  :key="item.id">
                <MessCardBlog
                  :comment="item"
                ></MessCardBlog>
                <el-divider border-style="dashed" />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessCardBlog from "src/components/home/MessCardBlog.vue";
import type { SiteComment } from "src/services/apis/home";

interface Props {
  list: SiteComment[];
}

interface SiteCommentsTree extends SiteComment {
  children:SiteCommentsTree[]
}

const propComments = defineProps<Props>();
</script>


<style lang="stylus" scoped>
.mess-list {
  &:hover {
    .mess-title {
      color: #5adcce;
    }
  }

  .mess-title {
    margin: 0;
    font-size: 25px;
    color: #ccc;
  }

  .mess-group {
    position: relative;
    padding: 10px 0;
    background: #eaf1f51f;
    background-image: url('src/assets/commentBg.jpg');
    // opacity :0.1;
  }

  .mess-group::before {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -4px;
    content: '';
    height: 100%;
    width: 8px;
    // background: #fff;
    // background-image :url("http://pic2.bbzhi.com/huihuabizhi/jianbichengshifengguang/jianbichengshifengguang_65818_9.jpg");
    // opacity :0.1;
    border-radius: 8px;
  }
}

h1:after {
  content: '       ';
  display: block;
  margin: 0.4em auto 0;
  width: 200px;
  height: 2px;
  border-bottom: 11px dashed var(--main-6);
}

@media (max-width: 992px) {
  .mess-group, .mess-item, .mess-info, .mess-loging {
    &:before {
      display: none;
    }
  }

  .mess-group {
    &:after {
      display: none;
    }
  }
}
</style>

<style scoped>
body {
  margin-top: 20px;
  background: #ebeef0;
}

.img-sm {
  width: 46px;
  height: 46px;
}

.panel {
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.075);
  border-radius: 0;
  border: 0;
  margin-bottom: 15px;
}

.panel .panel-footer,
.panel > :last-child {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.panel .panel-heading,
.panel > :first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.panel-body {
  padding: 15px 10px;
}

.media-block .media-left {
  display: block;
  float: left;
}

.media-block .media-right {
  float: right;
}

.media-block .media-body {
  display: block;
  overflow: hidden;
  width: auto;
}

.middle .media-left,
.middle .media-right,
.middle .media-body {
  vertical-align: middle;
}

.thumbnail {
  border-radius: 0;
  border-color: #e9e9e9;
}

.tag.tag-sm,
.btn-group-sm > .tag {
  padding: 5px 10px;
}

.tag:not(.label) {
  background-color: #fff;
  padding: 6px 12px;
  border-radius: 2px;
  border: 1px solid #cdd6e1;
  font-size: 12px;
  line-height: 1.42857;
  vertical-align: middle;
  -webkit-transition: all 0.15s;
  transition: all 0.15s;
}
.text-muted,
a.text-muted:hover,
a.text-muted:focus {
  color: #acacac;
}
.text-sm {
  font-size: 0.9em;
}
.text-5x,
.text-4x,
.text-5x,
.text-2x,
.text-lg,
.text-sm,
.text-xs {
  line-height: 1.25;
}

.btn-trans {
  background-color: transparent;
  border-color: transparent;
  color: #929292;
}

.btn-icon {
  padding-left: 9px;
  padding-right: 9px;
}

.btn-sm,
.btn-group-sm > .btn,
.btn-icon.btn-sm {
  padding: 5px 10px !important;
}

.mar-top {
  margin-top: 15px;
}
</style>