<template>
  <div class="container">
    <div class="div1">一段文字</div>
    <div class="div2">
      <!-- 这里是你的内容 -->
    </div>
  </div>
</template>


<script>

export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">

.container {
  //position: relative; /* 设置父容器为相对定位 */
  width: 100vw;
  height: 100vh;
  background-color: #20a0ff;
}

.div1 {
  //position: absolute; /* 设置div1为绝对定位 */
  //top: 0; /* 顶部对齐 */
  //left: 0; /* 左对齐 */
}

.div2 {
  width: 400px;
  height: 400px;
  background-color: #ccc;
  position: absolute; /* 设置div2为绝对定位 */
  top: 50%; /* 垂直居中 */
  left: 50%; /* 水平居中 */
  transform: translate(-50%, -50%); /* 通过transform来实现水平垂直居中 */
  text-align: center; /* 可选，使内容在中间对齐 */

}

</style>
