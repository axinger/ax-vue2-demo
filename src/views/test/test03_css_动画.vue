<template>

  <div>

    <h1>css动画</h1>
    <div
      ref="ball"
      class="div0"
      :class="{ paused: isPaused, stopped: isStopped }"
    />
    <div style="height: 30px"/>
    <el-button @click="start">开始</el-button>
    <el-button @click="pause">暂停</el-button>
    <el-button @click="stop">停止</el-button>

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

// 暂停状态
.div0.paused {
  animation-play-state: paused;
}

// 停止状态（隐藏或重置动画）
.div0.stopped {
  animation: none;
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

<script>

export default {
  components: {},
  props: {},
  data() {
    return {
      isPaused: false,
      isStopped: true // ✅ 默认停止（动画不运行）
    }
  },
  methods: {

    // ES6 允许在对象中省略 function 关键字，语法更简洁
    start() {
      this.isStopped = false
      this.isPaused = false
      console.log('动画开始')
    },
    pause() {
      this.isPaused = true
      console.log('动画暂停')
    },
    stop() {
      this.isPaused = false
      this.isStopped = true
      console.log('动画停止')
    },

    greet: function () {
      console.log(this.message) // 可以访问 data 中的数据
    }
  }
}
</script>

<style scoped lang="less"></style>

