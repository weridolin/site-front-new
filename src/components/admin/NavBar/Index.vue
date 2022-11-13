<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="SideBarState.collapse"
      class="hamburger-container"
      @click="toggleSideBar"
    />
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>

<script lang="ts" setup>
import Vue from "vue";
import {SideBarState} from 'src/components/admin/models'
import Hamburger from  'src/components/admin/NavBar/Hamburger.vue'
import Breadcrumb from 'src/components/admin/NavBar/Breadcrumb.vue'

function toggleSideBar(){

  SideBarState.value.collapse?SideBarState.value.collapse=false:SideBarState.value.collapse=true
  console.log(SideBarState.value.collapse)
}

</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
    font-size: 14px;
    line-height: 40px;
    margin-left: 8px;
  }
}

</style>