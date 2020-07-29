<template>
	<div>
		<h1 class="mb-4">Профиль</h1>
		<div v-if="user instanceof Object">
			<div v-if="getUserName && user.login === getUserName">
				<router-link :to="'/user/' + getUserName + '/settings/'" v-if="isAuthorized && getUserName === getAuthUserName">[Настройки]</router-link>
			</div>
			<div class="d-flex align-items-center mb-3 mt-3">
				<img src="@/assets/default-avatar.png" width="80" alt="avatar">
				<h3 class="ml-4 font-weight-normal">{{ user.login }}</h3>
			</div>
			<span class="badge badge-primary p-2 font-weight-normal">
				Уровень <span class="badge badge-light">{{ user.level }}</span>
			</span>
			<Tabs :tabs="tabs" @switchTab="switchTab" class="mt-3 mb-3" />
			<div v-show="tabs.active === 'tasks/solved'">
				<div v-if="typeof tasks === 'string'">
					<Notice :text="tasks" />
				</div>
				<div v-if="tasks instanceof Object">
					<TaskCard v-for="task in tasks" :task="task" />
				</div>
			</div>
			<div v-show="tabs.active === 'tasks/add'">
				Message
			</div>
		</div>
		<div v-if="typeof user === 'string'">
			<Notice :text="user" />
		</div>
	</div>
</template>

<script>
import Tabs from "@/components/Tabs";
import Notice from "@/components/Notice";

export default {
	data() {
		return {
			user: null,
			tasks: null,
			tabs: {
				list: [
					{
						caption: "Решенные задачи",
						type: "tasks/solved",
						accessLevel: 0
					},
					{
						caption: "Добавленные задачи",
						type: "tasks/add",
						accessLevel: 100
					}		
				],
				active: "tasks/solved"
			}
		}
	},
	methods: {
		switchTab(tab) {
			this.tabs.active = tab;
		},
		showTabs() {
			this.tabs.list = this.tabs.list.filter(tab => {
				if(this.checkAccessLevel(tab.accessLevel) && this.checkAuthUser()) {
					return true;
				} else if(tab.accessLevel === 0) {
					return true;
				} else {
					return false
				}
			})
		}
	},
	mounted() {
		let login = this.$route.params.login;

		this.receive(`user/${login}`);
		this.receive(`user/${login}/tasks`);
		this.$store.subscribe(mutation => {
			if(mutation.type === "user") {
				this.user = mutation.payload;
				this.showTabs();
			}
			if(mutation.type === "user/tasks") {
				this.tasks = mutation.payload;
			}
		})
	},
	components: {
		Tabs,
		Notice
	}
}
</script>