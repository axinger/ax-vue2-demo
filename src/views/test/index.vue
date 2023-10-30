<template>
  <div>
    <h3>测试页面</h3>
    <button @click="pinia">pinia</button>

    <button @click="pinia2">新窗口</button>

    <h3>测试页面</h3>

    <button @click="testDiv">布局</button>

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
    },

    pinia2() {
      const routeData = this.$router.resolve({ path: '/testPinia', query: { id: 1 }})
      window.open(routeData.href, '_blank')
    },

    testDiv() {
      // window.location.href ='/testDiv'

      // window.open('/testDiv');

      // this.$router.push(`/testDiv`)

      const routeData = this.$router.resolve({ path: '/testDiv', query: { id: 1 }})
      window.open(routeData.href, '_blank')

      //
      // let routeUrl = this.$router.resolve({
      //   path: "/testDiv",
      //   query: {id:96}
      // });
      // window.open(routeUrl .href, '_blank');
    }

  }
}
</script>

<style scoped lang="less"></style>
