<template>
	<div class="w-25 mx-auto">
		<h1 class="card-title mb-4 text-center">Вход</h1>
		<div class="card">
			<div class="card-body">
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
import Notice from "@/components/Notice";
export default {
	data() {
		return {
			login: "",
			password: "",
			notice: null
		}
	},
	methods: {
		auth() {
			this.send("login", {
				login: this.login,
				password: this.password
			}).then(response => {
				if(response.status === "success") {
					this.$store.commit("token", response.data);
					this.$router.push("/");
				}

				if(response.status === "error") {
					this.notice = response.error;
				}
			})
		}
	},
	components: {
		Notice
	}
}
</script>