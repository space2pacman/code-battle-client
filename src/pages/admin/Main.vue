<template>
	<div>
		<h1 class="mb-4">Пользователи</h1>
		<table class="table table-bordered">
			<tr>
				<td v-for="caption in captions">{{ caption }}</td>
			</tr>
			<tr v-for="user in users">
				<td>
					<img :src="user.userpic" alt="Avatar">
				</td>
				<td>{{ user.login }}</td>
				<td>{{ user.email.address }}</td>
				<td class="text-center">
					<div class="custom-control custom-checkbox">
						<input type="checkbox" class="custom-control-input" :id="user.email.address" :checked="user.email.notification">
						<label class="custom-control-label" :for="user.email.address"></label>
					</div>
				</td>
				<td class="text-center">
					<div class="custom-control custom-checkbox">
						<input type="checkbox" class="custom-control-input" :checked="user.email.confirmed">
						<label class="custom-control-label"></label>
					</div>
				</td>
				<td>{{ user.level }}</td>
				<td>{{ user.country }}</td>
				<td>
					<input class="form-control" type="number" :value="user.accessLevel">
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			captions: ["Аватар", "Логин", "E-mail: адрес", "E-mail: уведомления", "E-mail: подтвержден", "Уровень", "Страна", "Access level"],
			users: null
		}
	},
	mounted() {
		this.receive("users");
		this.$store.subscribe(mutation => {
			if(mutation.type === "users") {
				this.users = mutation.payload;
			}
		})
	}
}
</script>