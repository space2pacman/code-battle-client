import Vue from "vue";
import Router from "vue-router";
import Main from "@/pages/Main";
import Tasks from "@/pages/Tasks";
import TaskAdd from "@/pages/TaskAdd";
import Task from "@/pages/Task";
import TaskEdit from "@/pages/TaskEdit";
import Registration from "@/pages/Registration";
import User from "@/pages/User";
import UserSettings from "@/pages/UserSettings";
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
			name: "task/add",
			path: "/task/add",
			component: TaskAdd
		},
		{
			name: "task",
			path: "/task/:id",
			component: Task
		},
		{
			name: "task/edit",
			path: "/task/:id/edit",
			component: TaskEdit
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
			name: "user",
			path: "/user/:login",
			component: User
		},
		{
			name: "user/settings",
			path: "/user/:login/settings",
			component: UserSettings
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