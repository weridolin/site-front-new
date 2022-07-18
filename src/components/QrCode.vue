<template>
  <qrcode-vue :value="value" :size="size" level="H" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import QrcodeVue from 'qrcode.vue'
export default defineComponent({
  props:{
    value:{
      type:String,
      require:true
    },
    size:{
      type:Number,
      default:100
    }
  },
  components:{
    QrcodeVue
  },
  setup(props) {
    const state = reactive({
      value:props.value,
      size:props.size
    })
    return {
      ...toRefs(state),
    }
  },
})
</script>
