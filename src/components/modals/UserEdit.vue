<template>
	<b-modal id="user-edit">
		<template v-slot:modal-title>
			Редактирование пользователя
		</template>
		<div v-if="user">
			<div class="d-flex align-items-center mb-3 mt-3">
				<img :src="user.userpic" width="80" alt="avatar">
				<h3 class="ml-4 font-weight-normal">
					<span class="mr-2">{{ user.login }}</span>
					<i v-if="user.verified" class="fas fa-check"></i>
				</h3>
			</div>
			<div class="mb-3">
				<div class="mb-1">E-mail:</div>
				<div class="custom-control custom-checkbox d-inline">
					<input type="checkbox" class="custom-control-input" id="email" v-model="user.email.confirmed">
					<label class="custom-control-label" for="email">Подтвержден</label>
				</div>
			</div>
			<div class="mb-3">
				<div class="mb-1">Пользователь:</div>
				<div class="custom-control custom-checkbox d-inline">
					<input type="checkbox" class="custom-control-input" id="verified" v-model="user.verified">
					<label class="custom-control-label" for="verified">Верифицирован</label>
				</div>
			</div>
			<div class="mb-3">
				<div class="mb-1">Points</div>
				<div class="input-group">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<i class="fas fa-star"></i>
						</div>
					</div>
					<input type="number" class="form-control" placeholder="Старый пароль" v-model="user.points">
				</div>
			</div>
			<div>
				<div class="mb-1">Access level</div>
				<div class="input-group">
					<div class="input-group-prepend">
						<div class="input-group-text">
							<i class="fas fa-key"></i>
						</div>
					</div>
					<input type="number" class="form-control" placeholder="Старый пароль" v-model="user.accessLevel">
				</div>
			</div>
		</div>
		<template v-slot:modal-footer>
			<button class="btn btn-primary" @click="update">Обновить</button>
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
	methods: {
		update() {
			this.$bvModal.hide("user-edit");
		}
	},
	mounted() {
		this.$root.$on("onUserData", user => {
			this.user = user;
		})
	}
}
</script>