<template>
  <view>
    <view>虚拟流：</view>
    <virtual-list
      class="virtual-list"
      :height="500"
      :item-data="list"
      :item-count="dataLen"
      :item-size="itemHeight"
      :item="Row"
      width="100%"
      @scroll="onScroll"
    />
    <view>瀑布流：</view>
    <virtual-waterfall
      class="waterfall-list"
      :height="500"
      :item-data="list"
      :item-count="dataLen"
      :item-size="itemHeight"
      :item="Row"
      width="100%"
      @scroll="onScroll"
    />
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { markRaw } from "vue";
import Row from "./row.vue";

function buildData(offset = 0) {
  return Array(100)
    .fill(0)
    .map((_, i) => i + offset);
}

export default {
  name: "IndexPage",
  data() {
    return {
      Row: markRaw(Row),
      list: buildData(0),
      loading: false,
      itemHeight: 100,
    };
  },
  computed: {
    dataLen() {
      return this.list.length;
    },
  },
  methods: {
    listReachBottom() {
      Taro.showLoading();
      this.loading = true;
      setTimeout(() => {
        const { data } = this.state;
        this.setState(
          {
            data: data.concat(buildData(data.length)),
          },
          () => {
            this.loading = false;
            Taro.hideLoading();
          }
        );
      }, 1000);
    },
    onScroll(params) {
      console.log(params);
      if (
        // 避免重复加载数据
        !this.loading &&
        // 只有往前滚动我们才触发
        scrollDirection === "forward" &&
        // 5 = (列表高度 / 单项列表高度)
        // 100 = 滚动提前加载量，可根据样式情况调整
        scrollOffset > (this.dataLen - 5) * this.itemHeight + 100
      ) {
        this.listReachBottom();
      }
    },
  },
};
</script>
<style>
.virtual-list {
  background-color: bisque;
}
.waterfall-list {
  background-color: aquamarine;
}
</style>
