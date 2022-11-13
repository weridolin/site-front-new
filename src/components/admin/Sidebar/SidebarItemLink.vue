<template>
  <router-link
    :to="props.to"
  >
    <slot />
  </router-link>
</template>

<script lang="ts" setup>
interface Props {
  to: string;
}

// 传参必须为 interface 类型
const props = defineProps<Props>();
</script>
