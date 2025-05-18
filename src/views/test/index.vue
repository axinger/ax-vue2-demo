<template>
  <div>
    <h1>测试页面</h1>

    <h3>测试1</h3>
    <button @click="pinia">pinia</button>

    <button @click="pinia2">新窗口</button>

    <h3>测试2</h3>

    <button @click="testDiv">布局</button>

    <h3>测试3</h3>

    <div>
      <input v-model="apiData">
      <p>同步更新为1: {{ apiData }}</p>
    </div>

    <button @click="testApi">api</button>

  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  components: {},
  props: {},
  data() {
    return {
      apiData:'初始化',
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
    },
    testApi() {

      request({
        url: '/data',
        method: 'get'
      }).then(res=>{
        console.log("res="+JSON.stringify(res))
        this.apiData = res.data
      })

    }

  }
}
</script>

<style scoped lang="less"></style>
