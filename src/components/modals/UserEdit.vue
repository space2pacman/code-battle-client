<template>
	<b-modal id="user-edit">
		<template v-slot:modal-title>
			Редактирование пользователя
		</template>
		<div v-if="user">
			<div>{{ user.login }}</div>
			<div>{{ user.email.address }}</div>
			<div>{{ user.email.confirmed }}</div>
			<div>{{ user.email.notification }}</div>
			<div>{{ user.verified }}</div>
			<div>{{ user.userpic }}</div>
			<div>{{ user.socialNetworks }}</div>
			<div>{{ user.country }}</div>
			<div>{{ user.accessLevel }}</div>
			<div>{{ user.tasks }}</div>
			<div>{{ user.level }}</div>
			<div>{{ user.points }}</div>
			<div>{{ user.likes }}</div>
		</div>
		<template v-slot:modal-footer="{ ok }">
			<button class="btn btn-primary" @click="ok">Обновить</button>
		</template>
	</b-modal>
</template>

<script>
export default {
	data() {
		return {
			user: null
		}
	},
	mounted() {
		this.$root.$on("onUserData", user => {
			this.user = user;
		})
	}
}
</script>