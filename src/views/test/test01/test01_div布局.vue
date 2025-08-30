<template>
  <div class="container1">
    <div class="div1">一段文字</div>
    <div class="div2">
      第二个div
    </div>
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
    methods: {}
  }
</script>

<style scoped lang="scss">
  .container1 {
    /* 设置父容器为相对定位 */
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #20a0ff;
  }

  .div1 {
    /* 设置div1为绝对定位 */
    position: absolute;
    /* 顶部对齐 */
    top: 0;
    /* 左对齐 */
    right: 0;
  }

  .div2 {
    width: 400px;
    height: 400px;
    background-color: red;
    position: absolute;
    /* 设置div2为绝对定位 */
    top: 50%;
    /* 垂直居中 */
    left: 50%;
    /* 水平居中 */
    transform: translate(-50%, -50%);
    /* 通过transform来实现水平垂直居中 */
    text-align: center;
    /* 可选，使内容在中间对齐 */

  }
</style>
