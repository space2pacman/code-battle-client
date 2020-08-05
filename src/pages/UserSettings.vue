<template>
	<div>
		<h1 class="mb-4">Настройки профиля</h1>
		<div class="row">
			<div class="col">
				<div>
					<div class="mb-1">E-mail</div>
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="far fa-envelope"></i>
							</div>
						</div>
						<input type="text" class="form-control" placeholder="E-mail" v-model="email">
					</div>
				</div>
				<div class="mb-3">
					<div class="mb-1">Аватар</div>
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text p-0 overflow-hidden">
								<img src="@/assets/default-avatar.png" width="36" alt="avatar">
							</div>
						</div>
						<div class="custom-file">
							<input type="file" class="custom-file-input" id="userpic">
							<label class="custom-file-label" for="userpic">Выберите файл</label>
						</div>
					</div>
					<div class="progress mt-2">
						<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				</div>
				<div class="mb-2">
					<div class="mb-1">Смена пароля</div>
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-key"></i>
							</div>
						</div>
						<input type="password" class="form-control" placeholder="Старый пароль">
					</div>
				</div>
				<div class="mb-3">
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-key"></i>
							</div>
						</div>
						<input type="password" class="form-control" placeholder="Новый пароль">
					</div>
				</div>
				<div>
					<div class="mb-1">Уведомления на e-mail</div>
					<div class="custom-control custom-radio">
						<input class="custom-control-input" name="notification" type="radio" id="notification_0" :value="true" v-model="notification">
						<label class="custom-control-label" for="notification_0">Присылать письма от code-battle</label>
					</div>
					<div class="custom-control custom-radio">
						<input class="custom-control-input" name="notification" type="radio" id="notification_1" :value="false" v-model="notification">
						<label class="custom-control-label" for="notification_1">Не присылать письма</label>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="mb-3">
					<div class="mb-1">Социальные сети</div>
					<div v-for="socialNetwork in socialNetworks">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text">
									<i :class="socialNetwork.icon"></i>
								</div>
							</div>
							<input type="text" class="form-control" :placeholder="socialNetwork.name" v-model="socialNetwork.link">
						</div>
					</div>
				</div>
				<div class="mb-3">
					<div class="mb-1">Страна</div>
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-globe"></i>
							</div>
						</div>
						<select class="form-control" v-model="country">
							<option>США</option>
							<option>Россия</option>
						</select>
					</div>
				</div>
				<div class="mb-1">Ваш уровень</div>
				<div class="mb-3">
					<div class="custom-control custom-radio">
						<input class="custom-control-input" name="level" type="radio" id="junior" value="junior" v-model="level">
						<label class="custom-control-label" for="junior">Junior</label>
					</div>
					<div class="custom-control custom-radio">
						<input class="custom-control-input" name="level" type="radio" id="middle" value="middle" v-model="level">
						<label class="custom-control-label" for="middle">Middle</label>
					</div>
					<div class="custom-control custom-radio">
						<input class="custom-control-input" name="level" type="radio" id="senior" value="senior" v-model="level">
						<label class="custom-control-label" for="senior">Senior</label>
					</div>
				</div>
			</div>
		</div>
		<button class="btn btn-success float-right" @click="update">Обновить</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: null,
			notification: null,
			socialNetworks: [],
			country: null,
			level: null
		}
	},
	methods: {
		update() {
			let payload = {
				data: {
					username: this.getAuthUserName,
					email: {
						address: this.email,
						notification: this.notification
					},
					socialNetworks: this.socialNetworks,
					country: this.country,
					level: this.level
				}
			}

			this.send(`user/${this.getAuthUserName}`, payload).then(response => {
				if(response.status === "success") {
					this.receive(`user/${this.getAuthUserName}`).then(response => {
						if(response.status === "success") {
							this.$store.commit("user/auth", response.data);
						}
					});
				}
			});
		}
	},
	mounted() {
		let user = this.$store.state["user/auth"];

		if(user) {
			this.email = user.email.address;
			this.notification = user.email.notification;
			this.socialNetworks = user.socialNetworks;
			this.country = user.country;
			this.level = user.level;
		} else {
			this.$router.push("/login");
		}
	}
}
</script>