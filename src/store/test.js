// 引入创建的pinia的defineStore
import { defineStore } from 'pinia'

// pinia仓库的唯一值 (为了区别别的store)
const testName = 'testName'

// defineStore(唯一的值(为了区别别的store),{state(){return{}},actions:{},getters:{}})
const Test = defineStore(testName, {
  state() {
    return {
      num: 100,
      price: 5
    }
  },
  actions: {},
  getters: {}
})

export default Test
