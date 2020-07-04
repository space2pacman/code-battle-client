import Vue from "vue";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";
import App from "./App";
import router from "./router";
import TaskCard from "./components/TaskCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.component("TaskCard", TaskCard)
Vue.config.productionTip = false;

Vue.mixin({
	methods: {
		request(params) {
			let options = {
				method: params.method || null,
				url: params.url || null,
				body: params.body || null
			}

			return fetch(`http://localhost:8080/api/${options.url}/`, {
				method: options.method,
				headers: {
					"Content-Type": "application/json;charset=utf-8"
				},
				body: options.body
			}).then(response => response.json());
		},
		send(url, data) {
			return this.request({
				method: "POST",
				url,
				body: JSON.stringify(data)
			});
		},
		receive(url) {
			return this.request({
				method: "GET",
				url,
			}).then(response => {
				if(response.status === "success") {
					let url = response.url;

					this.$store.commit(url, response.data);
				}
			})
		}
	}
})

let store = new Vuex.Store({
	state: {
		"tasks": null,
		"task": null,
		"profile": null,
		"profile/tasks": null,
		"solution": null,
		"solution/task": null
	},
	mutations: {
		"tasks"(state, data) {
			state["tasks"] = data;
		},
		"task"(state, data) {
			state["task"] = data;
		},
		"profile"(state, data) {
			state["profile"] = data;
		},
		"profile/tasks"(state, data) {
			state["profile/tasks"] = data;
		},
		"solution"(state, data) {
			state["solution"] = data;
		},
		"solution/task"(state, data) {
			state["solution/task"] = data;
		}
	}
})

new Vue({
	el: "#app",
	router,
	store,
	render(h) {
		return h(App);
	},
})
