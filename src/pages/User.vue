<template>
	<div>
		<h1 class="mb-4">Профиль</h1>
		<div v-if="user instanceof Object">
			<div class="d-flex align-items-center mb-3 mt-3">
				<img :src="user.userpic" width="80" alt="avatar">
				<h3 class="ml-4 font-weight-normal">
					<span class="mr-2">{{ user.login }}</span>
					<i v-if="user.verified" class="fas fa-check"></i>
				</h3>
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
						<template v-slot:likes="{ state }">
							{{ state ? solution.likes : solution.likes - 1 }}
						</template>
					</Solution>
				</div>
				<div v-if="typeof solutions === 'string'">
					<Notice :text="solutions" />
				</div>
			</div>
			<div v-show="tabs.active === 'statistics'">
				<StatisticsCard :cards="statistics.cards" />
				<!-- <div class="mt-3">
					<div class="card w-100 mr-3 mb-3">
						<div class="card-body">
							<div class="float-right">
								<i class="fas fa-thumbs-up"></i>
							</div>
							<h5 class="text-muted font-weight-normal mt-0 mb-3">Лучшее понравившееся решение</h5>
							<Solution :solution="solutionsForTest" />
						</div>
					</div>
					<div class="card w-100">
						<div class="card-body">
							<div class="float-right">
								<i class="fas fa-comments"></i>
							</div>
							<h5 class="text-muted font-weight-normal mt-0 mb-3">Самое обсуждаемое решение</h5>
							<Solution :solution="solutionsForTest" />
						</div>
					</div>
				</div> -->
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
import StatisticsCard from "@/components/StatisticsCard";

export default {
	data() {
		return {
			user: null,
			solutions: [],
			statistics: {
				cards: [
					{
						value: 10,
						description: "Добавленных задач"
					},
					{
						value: 9,
						description: "Решений по добавленным задачам"
					},
					{
						value: 8,
						description: "Решено задач"
					}
				]
			},
			// solutionsForTest: { // fix
			// 	code: "function pacman() {}",
			// 	comments: 0,
			// 	id: 0,
			// 	likes: 1,
			// 	task: 0,
			// 	username: "pacman"
			// },
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
					},
					// {
					// 	caption: "Статистика",
					// 	type: "statistics",
					// 	isAuthorized: true
					// }	
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

		this.receive(`user/${login}/basic`);
		this.receive(`user/${login}/tasks/solved`);
		this.receive(`user/${login}/tasks/added`);
		
		if(this.isAuthorized && this.getUserName === this.getAuthUserName) {
			this.receive("solution/liked");
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
				if(this.solutions.length === 0) {
					this.solutions = mutation.payload;
				}
			}

			// if(mutation.type === "user/statistics") {
			// 	this.statistics = mutation.payload;
			// }
		})
	},
	components: {
		Tabs,
		Notice,
		UserTasks,
		Solution,
		StatisticsCard
	}
}
</script>