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
            }).then(response => {
                console.log(response);
            })
		},
		receive(url) {
            return this.request({
                method: "GET",
                url,
            }).then(response => {
                if(response.status === "success") {
                    console.log(response);
                }
            })
		}
	}
})

new Vue({
	el: "#app",
	router,
	render(h) {
		return h(App);
	},
})
