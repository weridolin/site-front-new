
<template>
  <span
    class="apiTag" 
    p="x-2"
    :type = "getRandomType()"
  >
    <slot/>
  </span>
</template>


<script lang="ts" setup>
import { ref,computed } from 'vue'
  const props=defineProps<{
    active: boolean
    type:string,
  }>()

  const isSelected = computed(()=> props.active?1:0.2)
  // const isSelected = ref(0.2)

  function getRandomType(){
      if (props.type=="src"){
        let types = ["life","work","card","condition"]
        let index = Math.floor(Math.random()*(types.length))
        // console.log(">>>>>>",types[index])
        return types[index]
      }else {
        return props.type
      }

    }

</script>

<style  scoped>
.apiTag{
  cursor: pointer;
  font-size: 0.875rem;
  line-height: 1.25rem;
  /* background-color: rgba(134,239,172,0.2); */
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.25rem;
  /* border-color: rgb(40, 100, 61); */
  border-width: 1px;
  border-style: solid;
  margin: 4px;
  /* padding: 4px 8px; */
      /* --un-text-opacity: 1; */
  /* color: rgba(22,101,52,.6); */
}

[type="life"] {
  background-color: rgba(134,239,172, v-bind(isSelected));
  border-color: rgb(40, 100, 61);
  color: rgba(22,101,52,.6);
}

[type="work"] {
  background-color: rgba(226, 143, 17,v-bind(isSelected));
  border-color: rgb(10, 146, 135);
  color: rgba(128, 61, 17, 0.6);
}

[type="card"] {
  background-color: rgba(41, 202, 189,v-bind(isSelected));
  border-color: rgb(5, 4, 110);
  color: rgba(87, 79, 197, 0.6);
}

[type="condition"] {
  background-color: rgb(234,241,225,v-bind(isSelected));
  border-color: rgb(5, 4, 110);
  color: rgba(87, 79, 197, 0.6);
}
</style>