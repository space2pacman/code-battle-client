<template>
	<div>
		<h1 class="mb-4">Профиль</h1>
		<div v-if="user instanceof Object">
			<div class="d-flex align-items-center mb-3 mt-3">
				<img src="@/assets/default-avatar.png" width="80" alt="avatar">
				<h3 class="ml-4 font-weight-normal">{{ user.login }}</h3>
			</div>
			<span class="badge badge-primary p-2 font-weight-normal">
				Points <span class="badge badge-light">{{ user.points }}</span>
			</span>
			<Tabs :tabs="tabs" @switchTab="switchTab" class="mt-3 mb-3" />
			<UserTasks v-show="tabs.active === 'tasks/solved'" :tasks="tasks.solved" />
			<UserTasks v-show="tabs.active === 'tasks/added'" :tasks="tasks.added" />
		</div>
		<div v-if="typeof user === 'string'">
			<Notice :text="user" />
		</div>
	</div>
</template>

<script>
import Tabs from "@/components/Tabs";
import Notice from "@/components/Notice";
import UserTasks from "@/components/UserTasks";

export default {
	data() {
		return {
			user: null,
			tasks: {
				list: [],
				added: []
			},
			tabs: {
				list: [
					{
						caption: "Решенные задачи",
						type: "tasks/solved"
					},
					{
						caption: "Добавленные задачи",
						type: "tasks/added"
					}		
				],
				active: "tasks/solved"
			}
		}
	},
	methods: {
		switchTab(tab) {
			this.tabs.active = tab;
		}
	},
	mounted() {
		let login = this.$route.params.login;

		this.receive(`user/${login}`);
		this.receive(`user/${login}/tasks/solved`);
		this.receive(`user/${login}/tasks/added`);
		this.$store.subscribe(mutation => {
			if(mutation.type === "user") {
				this.user = mutation.payload;
			}

			if(mutation.type === "user/tasks/solved") {
				this.tasks.solved = mutation.payload;
			}

			if(mutation.type === "user/tasks/added") {
				this.tasks.added = mutation.payload;
			}
		})
	},
	components: {
		Tabs,
		Notice,
		UserTasks
	}
}
</script>