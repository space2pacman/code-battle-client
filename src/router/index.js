import Vue from "vue";
import Router from "vue-router";
import Main from "@/pages/Main";
import Tasks from "@/pages/Tasks";
import Registration from "@/pages/Registration";
import Login from "@/pages/Login";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			component: Main
		},
		{
			path: "/tasks",
			component: Tasks
		},
		{
			path: "/registration",
			component: Registration
		},
		{
			path: "/login",
			component: Login
		}
	]
})