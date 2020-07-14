<template>
	<div class="w-25 mx-auto">
		<h1 class="card-title mb-4 text-center">Вход</h1>
		<div class="card">
			<div class="card-body">
				<Preloader v-if="isLoading" />
				<Notice :text="notice" className="alert alert-danger" />
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Логин" v-model="login">
				</div>
				<div class="form-group">
					<input type="password" class="form-control" placeholder="Пароль" v-model="password">
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-primary btn-block" @click="auth">Войти</button>
				</div>
				<div class="text-center">
					<span>Ещё нет аккаунта?</span> 
					<router-link to="/registration">Зарегистрируйтесь</router-link>
				</div> 
			</div>
		</div>
	</div>
</template>

<script>
import Preloader from "@/components/Preloader";
import Notice from "@/components/Notice";

export default {
	data() {
		return {
			login: "",
			password: "",
			notice: null,
			isLoading: false
		}
	},
	methods: {
		auth() {
			if(this.login.length === 0) {
				this.notice = "Логин не может быть пустым";

				return false;
			}

			if(this.password.length === 0) {
				this.notice = "Пароль не может быть пустым";

				return false;
			}

			this.isLoading = true;
			this.send("login", {
				login: this.login,
				password: this.password
			}).then(response => {
				if(response.status === "success") {
					let login = response.data.user.login;
					
					this.$store.commit("token", response.data.token);
					this.$store.commit("user", response.data.user);
					this.$router.push("/");
					this.receive(`profile/${login}`);
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
		login() {
			this.clearNotice();
		},
		password() {
			this.clearNotice();
		}
	},
	components: {
		Preloader,
		Notice
	}
}
</script>