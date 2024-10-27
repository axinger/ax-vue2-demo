<template>
  <div class="div0">

  </div>
</template>

<style scoped lang="scss">

.div0 {

  height: 100px;
  width: 100px;
  border-radius: 50%;

  background-color: orange;
  animation: move 4s linear infinite;
}

//在CSS中，@keyframes 规则用于创建动画
@keyframes move {

  // to: 这是一个关键字，表示动画的结束状态（也就是100%的时间点）。与之相对的是 from 关键字，它定义了动画的起始状态（0%的时间点）。
  to {
    //100vw 表示视口宽度的100%，即浏览器窗口的宽度。
    transform: translateX(calc(100vw - 100%));
  }
}
</style>
