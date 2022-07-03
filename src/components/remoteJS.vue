<template>
    <remote-js src="'https://unpkg.com/element-ui@2.3.7/lib/index.js'"></remote-js>
</template>
<script>
export default {
    name: "remoteJS",
    components: {
    'remote-js': {
      render(createElement) {
        return createElement('script', {attrs: {type: 'text/javascript', src: this.src}});
      },
      props: {
        src: { type: String, required: true}
      }
    }
  }
}
</script>