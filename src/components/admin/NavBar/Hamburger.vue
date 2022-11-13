<template>
  <div
    :class="[{'is-active': props.isActive}]"
  >
    <!-- <svg-icon
      name="hamburger"
      width="20"
      height="20"
    /> -->
    <el-icon>
      <component :is="props.isActive?Fold:Expand"></component>
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {
  Fold,
  Expand
} from "@element-plus/icons-vue";
// import { Component, Prop, Vue } from 'vue-property-decorator'
import {SideBarState} from 'src/components/admin/models'

interface Props {
  isActive:boolean
}
const emit = defineEmits(["toggle-click"])
const props = defineProps<Props>()


// function toggleClick(){
//   console.log(">>>>")
//   SideBarState.collapse=false
//   emit('toggle-click')
// }


</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

// .is-active {
//   transform: rotate(180deg);
// }
</style>
