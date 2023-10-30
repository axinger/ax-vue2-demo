<template>
  <div>
    <h3>测试页面</h3>
    <button @click="pinia">pinia</button>

    <h3>测试页面</h3>
   <router-link to="/testDiv">布局</router-link>

  </div>
</template>

<script>

export default {
  components: {},
  props: {},
  data() {
    return {

    }
  },
  methods: {

    pinia() {
      this.$router.push('/testPinia')
    }

  }
}
</script>

<style scoped lang="less"></style>
