<template>
  <div>

    <el-row :gutter="0">

      <el-col :span="6">
        <div style="background-color: gray">
          <h2>SVG 示例</h2>
          <svg width="300" height="200">
            <!-- 矩形 -->
            <rect x="50" y="50" width="100" height="80" fill="blue"/>

            <!-- 圆形 -->
            <circle cx="200" cy="100" r="40" fill="red"/>

            <!-- 文本 -->
            <text x="150" y="180" font-family="Arial" font-size="20" fill="green">
              Hello SVG!
            </text>
          </svg>
        </div>
      </el-col>

      <el-col :span="6">
        <div>
          <h2>动态修改 SVG,使用$refs方式</h2>
          <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect ref="myRect" x="50" y="50" width="100" height="80" fill="blue"/>
            <circle ref="myCircle" cx="200" cy="100" r="40" fill="red"/>
          </svg>
          <br>
          <button @click="changeColor">改变颜色</button>
          <button @click="moveShape">移动图形</button>
        </div>
      </el-col>

      <el-col :span="6">
        <div style="background-color: gray">
          <h2>数据绑定方式</h2>
          <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect :x="rectX" :y="rectY" width="100" height="80" :fill="rectColor"/>
            <circle :cx="circleCx" :cy="circleCy" r="40" :fill="circleColor"/>
          </svg>
          <br>
          <button @click="changeColor2">改变颜色</button>
          <button @click="moveShape2">移动图形</button>
        </div>
      </el-col>

      <el-col :span="6">
        <div>
          <h2>SVG 动画示例 - 使用 animate </h2>
          <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="20" r="20" fill="blue">
              <!-- 水平移动动画 -->
              <animate
                attributeName="cx"
                from="50"
                to="250"
                dur="2s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </circle>
          </svg>
        </div>
      </el-col>

      <el-col :span="6">
        <div>
          <h2>SVG 动画示例 - 使用 CSS</h2>
          <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <circle class="move-right" cx="50" cy="100" r="20" fill="red"/>
          </svg>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: 'SvgExample',
  data() {
    return {
      rectX: 50,
      rectY: 50,
      rectColor: 'blue',
      circleCx: 200,
      circleCy: 100,
      circleColor: 'red'
    }
  },

  methods: {
    changeColor() {
      // 修改矩形和圆形的颜色
      this.$refs.myRect.setAttribute('fill', 'green')
      this.$refs.myCircle.setAttribute('fill', 'purple');
    },
    moveShape() {
      // 移动矩形
      const currentX = this.$refs.myRect.getAttribute('x');
      this.$refs.myRect.setAttribute('x', parseInt(currentX) + 10);

      // 移动圆形
      const currentCx = this.$refs.myCircle.getAttribute('cx');
      this.$refs.myCircle.setAttribute('cx', parseInt(currentCx) + 10);
    },
    changeColor2() {
      this.rectColor = this.rectColor === 'blue' ? 'green' : 'blue';
      this.circleColor = this.circleColor === 'red' ? 'purple' : 'red';
    },
    moveShape2() {
      this.rectX += 10;
      this.circleCx += 10;
    }
  }
}
</script>

<style scoped>
/* 添加一些样式 */
svg {
  border: 1px solid #ccc;
}
</style>

<style scoped>
.move-right {
  animation: moveRight 2s linear infinite;
}

@keyframes moveRight {
  0% {
    cx: 50;
  }
  100% {
    cx: 250;
  }
}
</style>
