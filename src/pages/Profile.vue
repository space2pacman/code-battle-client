<template>
	<div>
		<h1 class="mb-4">Профиль</h1>
		<div v-if="profile instanceof Object">
			<div v-if="getUserName && profile.login === getUserName">
				<router-link :to="'/profile/' + getUserName + '/settings/'">[Настройки]</router-link>
			</div>
			<div class="d-flex align-items-center mb-3 mt-3">
				<img src="@/assets/default-avatar.png" width="80" alt="avatar">
				<h3 class="ml-4 font-weight-normal">{{ profile.login }}</h3>
			</div>
			<span class="badge badge-primary p-2 font-weight-normal">
				Уровень <span class="badge badge-light">{{ profile.level }}</span>
			</span>
			<ul class="nav nav-tabs mt-3 mb-3">
				<li v-for="tab in tabs.list" class="nav-item">
					<a class="nav-link" :class="{ 'active': tab.type === tabs.active }" href="#" @click.prevent="switchTab(tab.type)">{{ tab.caption }}</a>
				</li>
			</ul>
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
		<div v-if="typeof profile === 'string'">
			<Notice :text="profile" />
		</div>
	</div>
</template>

<script>
import Notice from "@/components/Notice";

export default {
	data() {
		return {
			profile: null,
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
		}
	},
	mounted() {
		let login = this.$route.params.login;

		this.receive(`profile/${login}`);
		this.receive(`profile/${login}/tasks`);
		this.$store.subscribe(mutation => {
			if(mutation.type === "profile") {
				this.profile = mutation.payload;
				// fix
				this.tabs.list = this.tabs.list.filter(tab => {
					if(tab.accessLevel > 0 && tab.accessLevel <= this.profile.accessLevel && this.profile.login === this.getUserName) {
						return true;
					} else if(tab.accessLevel === 0) {
						return true;
					} else {
						return false
					}
				})
				//
			}
			if(mutation.type === "profile/tasks") {
				this.tasks = mutation.payload;
			}
		})
	},
	components: {
		Notice
	}
}
</script>