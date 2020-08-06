<template>
	<div>
		<h1 class="mb-4">Профиль</h1>
		<div v-if="user instanceof Object">
			<div class="d-flex align-items-center mb-3 mt-3">
				<img :src="user.userpic" width="80" alt="avatar">
				<h3 class="ml-4 font-weight-normal">{{ user.login }}</h3>
			</div>
			<span class="badge badge-primary p-2 font-weight-normal">
				Points <span class="badge badge-light">{{ user.points }}</span>
			</span>
			<Tabs :tabs="tabs" @switchTab="switchTab" class="mt-3 mb-3" />
			<UserTasks v-show="tabs.active === 'tasks/solved'" :tasks="tasks.solved" />
			<UserTasks v-show="tabs.active === 'tasks/added'" :tasks="tasks.added" />
			<div v-show="tabs.active === 'solution/liked'">
				<div v-if="Array.isArray(solutions)">
					<Solution v-for="solution in solutions" :solution="solution">
						<template v-slot:separator>
							<hr>
						</template>
					</Solution>
				</div>
				<div v-if="typeof solutions === 'string'">
					<Notice :text="solutions" />
				</div>
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
import UserTasks from "@/components/UserTasks";
import Solution from "@/components/Solution";

export default {
	data() {
		return {
			user: null,
			solutions: [],
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
					},
					{
						caption: "Понравившееся решения",
						type: "solution/liked",
						isAuthorized: true
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
		
		if(this.isAuthorized && this.getUserName === this.getAuthUserName) {
			this.receive(`solution/liked/${login}`);
		}

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

			if(mutation.type === "solution/liked") {
				this.solutions = mutation.payload;
			}
		})
	},
	components: {
		Tabs,
		Notice,
		UserTasks,
		Solution
	}
}
</script>