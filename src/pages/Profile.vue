<template>
	<div>
		<h1 class="mb-4">Профиль</h1>
		<div v-if="profile instanceof Object">
			<div class="d-flex align-items-center mb-3">
				<img src="@/assets/default-avatar.png" width="80" alt="avatar">
				<h3 class="ml-4 font-weight-normal">{{ profile.login }}</h3>
			</div>
			<span class="badge badge-primary p-2 font-weight-normal">
				Уровень <span class="badge badge-light">{{ profile.level }}</span>
			</span>
			<hr>
			<div v-if="typeof tasks === 'string'">
				<Notice :text="tasks" />
			</div>
			<div v-if="tasks instanceof Object">
				<TaskCard v-for="task in tasks" :task="task" />
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
			tasks: null
		}
	},
	mounted() {
		let login = this.$route.params.login;

		this.receive(`profile/${login}`);
		this.receive(`profile/${login}/tasks`);
		this.$store.subscribe(mutation => {
			if(mutation.type === "profile") {
				this.profile = mutation.payload;
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