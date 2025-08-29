<template>
  <div id="app">
    <h2>可配置的圆形扇形分割</h2>
    <div>
      <label for="segmentCount">扇形数量 (n): </label>
      <input
        id="segmentCount"
        type="number"
        v-model.number="segmentCount"
        min="1"
        max="36"
      />
    </div>
    <div>
      <label for="circleSize">圆形大小 (px): </label>
      <input
        id="circleSize"
        type="number"
        v-model.number="circleSize"
        min="50"
        max="500"
      />
    </div>
    <br/>
    <div v-if="selectedSegment !== null">
      <p>你点击了第 <strong>{{ selectedSegment + 1 }}</strong> 个扇形。</p>
      <p>它的颜色是: <span :style="{ color: segments[selectedSegment]?.color }">{{
          segments[selectedSegment]?.color
        }}</span></p>
    </div>
    <div v-else>
      <p>点击一个扇形试试看！</p>
    </div>
    <br/>

    <!-- SVG 圆形 -->
    <svg
      :width="circleSize"
      :height="circleSize"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g v-for="(segment, index) in segments" :key="index">
        <path
          :d="segment.pathData"
          :fill="segment.color"
          stroke="#ffffff"
          stroke-width="1"
          @click="handleSegmentClick(index)"
          style="cursor: pointer;"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "SegmentedCircle",
  data() {
    return {
      segmentCount: 8, // 默认分割数量
      circleSize: 200, // SVG容器大小
      selectedSegment: null, // 被点击的扇形索引
    };
  },
  computed: {
    segments() {
      const segments = [];
      if (this.segmentCount <= 0) return segments;

      const centerX = 100;
      const centerY = 100;
      const radius = 100;
      const anglePerSegment = (2 * Math.PI) / this.segmentCount;

      // 生成一系列颜色
      const colors = this.generateColors(this.segmentCount);

      for (let i = 0; i < this.segmentCount; i++) {
        const startAngle = i * anglePerSegment;
        const endAngle = (i + 1) * anglePerSegment;

        // 计算起点和终点的坐标 (在圆周上)
        const startX = centerX + radius * Math.cos(startAngle);
        const startY = centerY + radius * Math.sin(startAngle);
        const endX = centerX + radius * Math.cos(endAngle);
        const endY = centerY + radius * Math.sin(endAngle);

        // SVG 路径数据 (M moveTo, L lineTo, A arcTo, L lineTo)
        // 如果是半圆或整圆，需要特殊处理 large-arc-flag
        const largeArcFlag = anglePerSegment > Math.PI ? 1 : 0;
        let pathData = `M ${centerX},${centerY} L ${startX},${startY} `;
        pathData += `A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;

        segments.push({
          pathData: pathData,
          color: colors[i % colors.length],
        });
      }

      return segments;
    },
  },
  methods: {
    // 生成一系列区分度较高的颜色
    generateColors(count) {
      const colors = [];
      for (let i = 0; i < count; i++) {
        const hue = (i * 360) / count; // 在色相环上均匀分布
        // 使用饱和度和亮度确保颜色鲜明且不过于刺眼
        colors.push(`hsl(${hue}, 80%, 60%)`);
      }
      return colors;
    },
    // 处理扇形点击事件
    handleSegmentClick(index) {
      console.log(`扇形 ${index + 1} 被点击`);
      this.selectedSegment = index;
      // 你可以在这里添加更多点击后的逻辑
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

svg {
  border: 1px solid #ccc; /* 可选：为SVG添加边框以便查看 */
}
</style>



