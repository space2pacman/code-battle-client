import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App";
import router from "./router";
import TaskCard from "./components/TaskCard";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.component("TaskCard", TaskCard)
Vue.config.productionTip = false;

new Vue({
	el: "#app",
	router,
	render(h) {
		return h(App);
	},
})
