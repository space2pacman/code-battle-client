import Vue from "vue";
import Router from "vue-router";
import Main from "@/pages/Main";
import Tasks from "@/pages/Tasks";
import Task from "@/pages/Task";
import Registration from "@/pages/Registration";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Solution from "@/pages/Solution";
import Logout from "@/pages/Logout";

Vue.use(Router);

export default new Router({
	routes: [
		{
			name: "home",
			path: "/",
			component: Main
		},
		{
			name: "tasks",
			path: "/tasks",
			component: Tasks
		},
		{
			name: "task",
			path: "/task/:id",
			component: Task
		},
		{
			name: "registration",
			path: "/registration",
			component: Registration
		},
		{
			name: "login",
			path: "/login",
			component: Login
		},
		{
			name: "profile",
			path: "/profile/:login",
			component: Profile
		},
		{
			name: "solution",
			path: "/solution/:id",
			component: Solution
		},
		{
			name: "logout",
			path: "/logout",
			component: Logout
		}
	]
})