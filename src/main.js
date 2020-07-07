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
					"Content-Type": "application/json;charset=utf-8",
					"Authorization": "bearer 1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRlc3QiLCJwYXNzd29yZCI6InRlc3QiLCJpYXQiOjE1OTM5ODQ4NjF9.DY261JCcI9kPCbGzBLFzNYB1H3OjjW3RvqQ03vx1Q3o" // fix
				},
				body: options.body
			}).then(response => response.json());
		},
		send(url, data) {
			return this.request({
				method: "POST",
				url,
				body: JSON.stringify(data)
			}).then(response => {
				if(response.status === "error") {
					this.isAuthorized = false;
				}

				if(response.status === "success") {
					this.isAuthorized = true;
				}
				
				return response;
			})
		},
		receive(url) {
			return this.request({
				method: "GET",
				url,
			}).then(response => {
				if(response.status === "success") {
					let url = response.url;

					this.$store.commit(url, response.data);
					this.isAuthorized = true;
				} 

				if(response.status === "error") {
					this.isAuthorized = false;
				}
			})
		}
	},
	computed: {
		isAuthorized: {
			get() {
				return this.$store.state.authorized;
			},
			set(value) {
				this.$store.commit("authorized", value);
			}
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
		"solution/task": null,
		"authorized": false
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
		},
		"authorized"(state, data) {
			state["authorized"] = data;
		}
	}
})

new Vue({
	el: "#app",
	router,
	store,
	render(h) {
		return h(App);
	}
})
