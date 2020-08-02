import Vue from "vue";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";
import App from "./App";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.mixin({
	methods: {
		request(params) {
			let options = {
				method: params.method || null,
				url: params.url || null,
				body: params.body || null
			}
			let headers = {};

			headers["Content-Type"] = "application/json;charset=utf-8";

			if(this.getToken) {
				headers["Authorization"] = `bearer ${this.getToken}`;
			}

			return fetch(`http://localhost:8080/api/${options.url}/`, {
				method: options.method,
				headers,
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
				let url = response.url;
				
				if(response.status === "success") {
					this.$store.commit(url, response.data);
				} 

				if(response.status === "error") {
					this.$store.commit(url, response.error);
				}
			});
		},
		checkAccessLevel(accessLevel) {
			let user = this.getAuthUser;

			if(this.isAuthorized && user) {
				if(user.accessLevel >= accessLevel) {
					return true
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		checkAuthUser() {
			return this.getUserName === this.getAuthUserName;
		}
	},
	computed: {
		getToken() {
			return this.$store.state.token;
		},
		isAuthorized() {
			return this.getToken !== null;
		},
		getUserName() {
			return this.$store.state["user"]?.login;
		},
		getAuthUser() {
			return this.$store.state["user/auth"];
		},
		getAuthUserName() {
			return this.$store.state["user/auth"]?.login;
		}
	}
})

let store = new Vuex.Store({
	state: {
		"tasks": null,
		"task": null,
		"user": null,
		"user/tasks/solved": null,
		"user/tasks/added": null,
		"user/auth": null,
		"solution": null,
		"solution/task": null,
		"token": null
	},
	mutations: {
		"tasks"(state, data) {
			state["tasks"] = data;
		},
		"task"(state, data) {
			state["task"] = data;
		},
		"user"(state, data) {
			state["user"] = data;
		},
		"user/tasks/solved"(state, data) {
			state["user/tasks/solved"] = data;
		},
		"user/tasks/added"(state, data) {
			state["user/tasks/added"] = data;
		},
		"solution"(state, data) {
			state["solution"] = data;
		},
		"solution/task"(state, data) {
			state["solution/task"] = data;
		},
		"token"(state, data) {
			state["token"] = data;
		},
		"user/auth"(state, data) {
			state["user/auth"] = data;
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