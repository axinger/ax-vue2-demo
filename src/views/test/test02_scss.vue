<template>
  <div class="div0">
    <h1>scss语法</h1>
    <div class="div1">第一段文字</div>
    <div class="div2">
      第二段文字
    </div>
    <div class="div3">
      第3段文字
    </div>
  </div>
</template>

<style scoped lang="scss">
.div0 {
  font-size: 30px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: orange;

  //height: 200px;

  .div3 {
    background-color: #20a0ff;
    //margin-top: 40px;
    //padding: 1em;
    font-size: 20px;
  }
}

.div1 {
  @extend .div0;
  border-color: green;
}

.div2 {
  @extend .div0;
  //padding-top: 10px;
  background: olivedrab;
  margin-top: 10px;
  border-color: red;
}
</style>
<script setup lang="ts">
</script>
