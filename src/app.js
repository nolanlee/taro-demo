import { createApp } from "vue";
import registerVirtualList from "@tarojs/components-advanced/dist/components/virtual-list";
import { VirtualWaterfall as registerVirtualWaterfall } from "@tarojs/components-advanced";
import "./app.css";

const app = createApp();

app.use(registerVirtualList);
app.use(registerVirtualWaterfall);

export default app;
