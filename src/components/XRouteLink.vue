<!--
支持外链的RouterLink, 只需要包装一次默认的router-link.
-->
<template>
  <!-- 以斜杠/开头的路径会被判定为内链, 否则是外链 你可以自己修改此逻辑 -->
  <a v-if="props.to && props.to.includes('https')" :href="props.to" :class="props.to">
    <slot>
    </slot>
  </a>
  <router-link v-else v-bind="vProps" :class="props.to.path">
    <slot> </slot>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue"


interface Route {
  path:string;
}

interface Props {
  to:any;
  // target:string;
}


const props = withDefaults(defineProps<Props>(),{
    to:{path: '/'}, 
    // target: "",
  }
)

const vProps=computed(()=>{
  return {...props}
}
)


</script>
