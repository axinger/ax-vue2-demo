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

    <el-divider style="border-color: #ff6b6b;"></el-divider>
    <el-divider style="border-color: #3498db;" />
    <!-- 带文字的分割线 -->
    <el-divider style="border-color: #4ecdc4;">
      <span style="color: #45b7d1; font-weight: bold;">自定义颜色</span>
    </el-divider>
    <h3>:gutter="24": gutter 指的是“槽”或“间距”
      :span="6": span 属性定义了列在栅格系统中占据的份数。
    </h3>
    <el-row :gutter="50">
      <el-col :span="12"><div style="height: 50px;background: red">内容1</div></el-col>
      <el-col :span="12"><div style="height: 50px;background: green">内容2</div></el-col>
      <el-col :span="12"><div style="height: 50px;background: darkcyan">内容3</div></el-col>
      <el-col :span="12"><div style="height: 50px;background: yellow">内容4</div></el-col>
      <el-col :span="12"><div style="height: 50px;background: red">内容5</div></el-col>
    </el-row>
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
