<template>
  <div id="app">
    <h2>可配置的圆形分割 (圆环 + 可点击中心 + 文字)</h2>
    <div>
      <label for="segmentCount">扇形数量 (n): </label>
      <input
        id="segmentCount"
        type="number"
        v-model.number="segmentCount"
        min="1"
        max="20"
      />
    </div>
    <div>
      <label for="circleSize">圆形大小 (px): </label>
      <input
        id="circleSize"
        type="number"
        v-model.number="circleSize"
        min="100"
        max="500"
      />
    </div>
    <div>
      <label for="innerRadiusRatio">内圆半径比例 (0-0.8): </label>
      <input
        id="innerRadiusRatio"
        type="number"
        v-model.number="innerRadiusRatio"
        min="0"
        max="0.8"
        step="0.05"
      />
    </div>
    <div>
      <label for="showSegmentLabels">显示扇形文字: </label>
      <input type="checkbox" id="showSegmentLabels" v-model="showSegmentLabels"/>
    </div>
    <div>
      <label for="showCenterLabel">显示中心文字: </label>
      <input type="checkbox" id="showCenterLabel" v-model="showCenterLabel"/>
    </div>
    <br/>
    <div v-if="selectedPart !== null">
      <p v-if="selectedPart.type === 'segment'">
        你点击了第 <strong>{{ selectedPart.index + 1 }}</strong> 个扇形。
        它的颜色是: <span :style="{ color: segments[selectedPart.index]?.color }">{{
          segments[selectedPart.index]?.color
        }}</span>
      </p>
      <p v-else-if="selectedPart.type === 'center'">
        你点击了<strong>中心圆</strong>。
        它的颜色是: <span :style="{ color: centerCircleColor }">{{ centerCircleColor }}</span>
      </p>
    </div>
    <div v-else>
      <p>点击一个扇形或中心圆试试看！</p>
    </div>
    <br/>

    <!-- SVG 圆形 -->
    <svg
      :width="circleSize"
      :height="circleSize"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 绘制扇形 -->
      <g v-for="(segment, index) in segments" :key="'segment-'+index">
        <path
          :d="segment.pathData"
          :fill="segment.color"
          stroke="#ffffff"
          stroke-width="1"
          @click="handleClick('segment', index)"
          style="cursor: pointer;"
        />
        <!-- 扇形文字  pointer-events="none" 文字不捕获点击事件，让扇形处理  -->
        <text
          v-if="showSegmentLabels && segment.textPosition"
          :x="segment.textPosition.x"
          :y="segment.textPosition.y"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="white"
          font-size="8"
          font-weight="bold"
          pointer-events="none"
        >
          {{ segment.label }}
        </text>
      </g>

      <!-- 绘制中心圆 -->
      <circle
        v-if="innerRadius > 0"
        cx="100"
        cy="100"
        :r="innerRadius"
        :fill="centerCircleColor"
        stroke="red"
        stroke-width="1"
        @click="handleClick('center', null)"
        style="cursor: pointer;"
      />
      <!-- 中心圆文字   pointer-events="none" 文字不捕获点击事件，让中心圆处理 -->
      <text
        v-if="showCenterLabel && innerRadius > 0"
        x="100"
        y="100"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="black"
        font-size="10"
        font-weight="bold"
        pointer-events="none"
      >
        中心
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: "SegmentedCircleWithText",
  data() {
    return {
      segmentCount: 8,
      circleSize: 300, // 增大默认尺寸
      innerRadiusRatio: 0.3,
      selectedPart: null,
      centerCircleColor: '#FFD700',
      showSegmentLabels: true, // 控制是否显示扇形文字
      showCenterLabel: true,   // 控制是否显示中心文字
    };
  },
  computed: {
    innerRadius() {
      return 100 * this.innerRadiusRatio;
    },
    segments() {
      const segments = [];
      if (this.segmentCount <= 0) return segments;

      const centerX = 100;
      const centerY = 100;
      const outerRadius = 100;
      const innerRadius = this.innerRadius;
      const anglePerSegment = (2 * Math.PI) / this.segmentCount;

      // 生成一系列颜色
      const colors = this.generateColors(this.segmentCount);

      for (let i = 0; i < this.segmentCount; i++) {
        const startAngle = i * anglePerSegment;
        const endAngle = (i + 1) * anglePerSegment;
        // 计算文字位置的角度（扇形的中线）
        const midAngle = (startAngle + endAngle) / 2;

        // 计算外圆起点和终点的坐标
        const outerStartX = centerX + outerRadius * Math.cos(startAngle);
        const outerStartY = centerY + outerRadius * Math.sin(startAngle);
        const outerEndX = centerX + outerRadius * Math.cos(endAngle);
        const outerEndY = centerY + outerRadius * Math.sin(endAngle);

        // 计算内圆起点和终点的坐标
        const innerStartX = centerX + innerRadius * Math.cos(endAngle);
        const innerStartY = centerY + innerRadius * Math.sin(endAngle);
        const innerEndX = centerX + innerRadius * Math.cos(startAngle);
        const innerEndY = centerY + innerRadius * Math.sin(startAngle);

        // 计算文字放置的位置（在扇形的中线上，靠近外圆但不顶到边缘）
        // 放在距离中心 60% 到 80% 半径的位置
        const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const textX = centerX + labelRadius * Math.cos(midAngle);
        const textY = centerY + labelRadius * Math.sin(midAngle);

        // SVG 路径数据 (创建一个环形扇区)
        const largeArcFlag = anglePerSegment > Math.PI ? 1 : 0;
        let pathData = `M ${outerStartX},${outerStartY} `;
        pathData += `A ${outerRadius},${outerRadius} 0 ${largeArcFlag},1 ${outerEndX},${outerEndY} `;
        pathData += `L ${innerStartX},${innerStartY} `;
        pathData += `A ${innerRadius},${innerRadius} 0 ${largeArcFlag},0 ${innerEndX},${innerEndY} `;
        pathData += 'Z';

        segments.push({
          pathData: pathData,
          color: colors[i % colors.length],
          label: `扇${i + 1}`, // 扇形的标签文字
          textPosition: {x: textX, y: textY} // 文字坐标
        });
      }

      return segments;
    },
  },
  methods: {
    // 生成一系列区分度较高的颜色
    generateColors(count) {
      const colors = [];
      // 为了更好的视觉效果，可以跳过一些过于鲜艳或暗淡的颜色
      const hues = [];
      for (let i = 0; i < count; i++) {
        hues.push((i * 360) / count);
      }
      // 可以对 hues 数组进行洗牌以获得更随机的分布
      // shuffleArray(hues);

      for (let i = 0; i < hues.length; i++) {
        // 调整饱和度和亮度以确保文字在上面清晰可见
        colors.push(`hsl(${hues[i]}, 70%, 55%)`);
      }
      return colors;
    },
    // 处理点击事件的统一方法
    handleClick(type, index) {
      console.log(`点击了 ${type === 'segment' ? `第 ${index + 1} 个扇形` : '中心圆'}`);
      this.selectedPart = {type, index};
    },
    // Fisher-Yates (Knuth) Shuffle 算法
    // shuffleArray(array) {
    //   let currentIndex = array.length, randomIndex;
    //   while (currentIndex !== 0) {
    //     randomIndex = Math.floor(Math.random() * currentIndex);
    //     currentIndex--;
    //     [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    //   }
    //   return array;
    // }
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
  border: 1px solid #ccc;
  /* 可选：添加阴影等样式 */
  /* box-shadow: 0 4px 8px rgba(0,0,0,0.1); */
}
</style>



