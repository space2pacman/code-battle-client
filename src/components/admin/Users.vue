<template>
	<div>
		<h1 class="mb-4">Пользователи</h1>
		<div class="overflow-auto">
			<table class="table table-bordered">
				<tr>
					<td v-for="caption in captions" class="align-middle">{{ caption }}</td>
				</tr>
				<tr v-for="user in users">
					<td class="align-middle text-center">
						<button type="button" class="btn btn-success" @click="edit(user)">
							<i class="fas fa-pencil-alt"></i>
						</button>
					</td>
					<td class="align-middle text-center">
						<img :src="user.userpic" alt="Avatar" width="50">
					</td>
					<td class="align-middle">{{ user.login }}</td>
					<td class="align-middle text-center ">
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" :checked="user.verified">
							<label class="custom-control-label"></label>
						</div>
					</td>
					<td class="align-middle">{{ user.email.address }}</td>
					<td class="align-middle text-center">
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" :checked="user.email.notification">
							<label class="custom-control-label"></label>
						</div>
					</td>
					<td class="align-middle text-center">
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input" :checked="user.email.confirmed">
							<label class="custom-control-label"></label>
						</div>
					</td>
					<td class="align-middle">{{ user.level }}</td>
					<td class="align-middle">{{ user.country }}</td>
					<td class="align-middle">{{ user.points }}</td>
					<td class="align-middle">{{ user.accessLevel }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			captions: ["Действие", "Аватар", "Логин", "Верифицирован", "E-mail: адрес", "E-mail: уведомления", "E-mail: подтвержден", "Уровень", "Страна", "Points", "Access level"],
			users: null
		}
	},
	methods: {
		edit(user) {
			this.$bvModal.show("user-edit");
			this.$root.$emit("onUserData", user);
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