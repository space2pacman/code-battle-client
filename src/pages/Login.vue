<template>
	<div class="w-25 mx-auto">
		<h1 class="card-title mb-4 text-center">Вход</h1>
		<form class="card" @submit.prevent>
			<div class="card-body position-relative">
				<Preloader v-if="isLoading" :overlay="true" />
				<Notice :text="notice" className="alert alert-danger" />
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-sign-in-alt"></i>
							</div>
						</div>
						<input type="text" class="form-control" maxlength="20" placeholder="Логин" v-model="login.value" :class="validateForm('login')">
					</div>
				</div>
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-key"></i>
							</div>
						</div>
						<input type="password" class="form-control" maxlength="20" placeholder="Пароль" v-model="password.value" :class="validateForm('password')">
					</div>
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-primary btn-block" @click="auth">Войти</button>
				</div>
				<div class="text-center">
					<span>Ещё нет аккаунта?</span> 
					<router-link to="/registration">Зарегистрируйтесь</router-link>
				</div> 
			</div>
		</form>
	</div>
</template>

<script>
import Preloader from "@/components/Preloader";
import Notice from "@/components/Notice";

export default {
	data() {
		return {
			login: {
				value: "",
				invalid: false
			},
			password: {
				value: "",
				invalid: false
			},
			notice: null,
			isLoading: false
		}
	},
	methods: {
		auth() {
			if(this.login.value.length === 0) {
				this.notice = "Логин не может быть пустым";

				return false;
			}

			if(this.password.value.length === 0) {
				this.notice = "Пароль не может быть пустым";

				return false;
			}

			this.isLoading = true;
			this.send("login", {
				login: this.login.value,
				password: this.password.value
			}).then(response => {
				if(response.status === "success") {
					this.$store.commit("token", response.data.token);
					this.$store.commit("user/auth", response.data.user);
					this.$store.commit("user", response.data.user);
					this.$router.push("/");
				}

				if(response.status === "error") {
					this.notice = response.error;
				}

				this.isLoading = false;
			})
		},
		clearNotice() {
			this.notice = null;
		}
	},
	watch: {
		"login.value"(newValue, oldValue) {
			this.clearNotice();

			if(oldValue.length > 0 && newValue.length === 0) {
				this.login.invalid = true;
			}

			if(newValue.length > 0) {
				this.login.invalid = false;
			}
		},
		"password.value"(newValue, oldValue) {
			this.clearNotice();

			if(oldValue.length > 0 && newValue.length === 0) {
				this.password.invalid = true;
			}

			if(newValue.length > 0) {
				this.password.invalid = false;
			}
		}
	},
	components: {
		Preloader,
		Notice
	}
}
</script>