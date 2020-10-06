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

			return fetch(`http://${this.getHostname}:${this.getPort}/api/${this.getVersion}/${options.url}/`, {
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
					if(url) {
						this.$store.commit(url, response.data);
					}
				} 

				if(response.status === "error") {
					this.$store.commit(url, response.error);
				}

				return response;
			});
		},
		uploadFile(type, file, onloadstart, onprogress, onloadend, onuploaded) {
			let formData = new FormData();
			let xhr = new XMLHttpRequest();

			formData.append(type, file);

			xhr.responseType = "json";
			xhr.upload.onloadstart = onloadstart;
			xhr.upload.onprogress = onprogress;
			xhr.upload.onloadend = onloadend;
			
			xhr.onreadystatechange = () => {
				if(xhr.readyState === 4) {
					if(xhr.response.status === "success") {
						onuploaded(null, xhr.response.data);
					}

					if(xhr.response.status === "error") {
						onuploaded(xhr.response.error);
					}
				}
			}

			xhr.open("POST", `http://${this.getHostname}:${this.getPort}/api/${this.getVersion}/upload/`);
			xhr.setRequestHeader("Authorization", `bearer ${this.getToken}`);
			xhr.send(formData);
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
		},
		validateForm(field) {
			if(this[field].invalid !== null) {
				if(this[field].invalid) {
					return "is-invalid";
				} else {
					if(this[field].value && this[field].value.length > 0) {
						return "is-valid";
					}
				}
			}
		},
		getDate() {
			let date = new Date();
			let hours = date.getHours().toString();
			let minutes = date.getMinutes().toString();
			let seconds = date.getSeconds().toString();

			hours = hours.length === 1 ? "0" + hours : hours;
			minutes = minutes.length === 1 ? "0" + minutes : minutes;
			seconds = seconds.length === 1 ? "0" + seconds : seconds;

			return `${hours}:${minutes}:${seconds}`;
		},
		getClientVersion() {
			return "1.0.0";
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
		},
		getHostname() {
			let hostname = "localhost";
			
			if(window.location.hostname !== "localhost") {
				hostname = window.location.hostname;
			}

			return hostname;
		},
		getPort() {
			let port = "8080";
			
			if(window.location.hostname !== "localhost") {
				port = "80";
			}

			return port;
		},
		getVersion() {
			return "v1";
		}
	}
})

let store = new Vuex.Store({
	state: {
		"tasks": null,
		"task": null,
		"user": null,
		"users": null,
		"user/tasks/solved": null,
		"user/tasks/added": null,
		"user/auth": null,
		"solution": null,
		"solution/task": null,
		"solution/liked": null,
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
		"users"(state, data) {
			state["users"] = data;
		},
		"user/tasks/solved"(state, data) {
			state["user/tasks/solved"] = data;
		},
		"user/tasks/added"(state, data) {
			state["user/tasks/added"] = data;
		},
		"user/auth"(state, data) {
			state["user/auth"] = data;
		},
		"solution"(state, data) {
			state["solution"] = data;
		},
		"solution/task"(state, data) {
			state["solution/task"] = data;
		},
		"solution/liked"(state, data) {
			state["solution/liked"] = data;
		},
		"token"(state, data) {
			state["token"] = data;
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