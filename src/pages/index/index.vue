<template>
  <view class="index">
    <text>{{ msg }}</text>
    <div>{{ msg }}</div>
  </view>
</template>

<script>
import "./index.css";

export default {
  data() {
    return {
      msg: "Hello world!",
    };
  },
};
</script>
