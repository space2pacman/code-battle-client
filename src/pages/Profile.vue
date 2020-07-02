<template>
	<div>
		<h1 class="mb-4">Профиль</h1>
		<div v-if="profile">
			<div class="d-flex align-items-center mb-3">
				<img src="@/assets/default-avatar.png" width="80" alt="avatar">
				<h3 class="ml-4 font-weight-normal">{{ profile.login }}</h3>
			</div>
			<div type="button" class="btn btn-primary">
				Уровень <span class="badge badge-light">{{ profile.level }}</span>
			</div>
			<hr>
			<TaskCard v-for="task in tasks" :task="task" />
		</div>
		<div v-else>
			Пользователь не найден
		</div>
	</div>
</template>

<script>
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
	}
}
</script>