<template>
	<div>
		<h1 class="mb-4">Пользователи</h1>
		<table class="table table-bordered">
			<tr>
				<td v-for="caption in captions" class="align-middle">{{ caption }}</td>
			</tr>
			<tr v-for="user in users">
				<td class="text-center align-middle">
					<button type="button" class="btn btn-success">
						<i class="fas fa-edit"></i>
					</button>
				</td>
				<td class="text-center align-middle">
					<img :src="user.userpic" alt="Avatar">
				</td>
				<td class="align-middle">{{ user.login }}</td>
				<td class="align-middle">{{ user.email.address }}</td>
				<td class="text-center align-middle">
					<div class="custom-control custom-checkbox">
						<input type="checkbox" class="custom-control-input" :checked="user.email.notification">
						<label class="custom-control-label"></label>
					</div>
				</td>
				<td class="text-center align-middle">
					<div class="custom-control custom-checkbox">
						<input type="checkbox" class="custom-control-input" :checked="user.email.confirmed">
						<label class="custom-control-label"></label>
					</div>
				</td>
				<td class="align-middle">{{ user.level }}</td>
				<td class="align-middle">{{ user.country }}</td>
				<td class="align-middle">
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
			captions: ["Действие", "Аватар", "Логин", "E-mail: адрес", "E-mail: уведомления", "E-mail: подтвержден", "Уровень", "Страна", "Access level"],
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