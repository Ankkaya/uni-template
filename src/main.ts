import { createSSRApp } from "vue";
import uViewPro from "@/uni_modules/uview-pro"
import App from "./App.vue";
import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App);
  app.use(uViewPro);
  return {
    app,
  };
}
