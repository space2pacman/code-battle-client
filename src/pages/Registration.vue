<template>
	<div class="w-25 mx-auto">
		<h1 class="card-title mb-4 text-center">Регистрация</h1>
		<div class="card">
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
						<input type="text" class="form-control" placeholder="Логин" v-model="login">
					</div>
				</div>
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-key"></i>
							</div>
						</div>
						<input type="password" class="form-control" placeholder="Пароль" v-model="password">
					</div>
				</div>
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="far fa-envelope"></i>
							</div>
						</div>
						<input type="text" class="form-control" placeholder="E-mail" v-model="email.value" :class="validate('email')">
					</div>
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-primary btn-block" @click="registration">Зарегистрироваться</button>
				</div>
				<div class="text-center">
					<span>Уже зарегистрированы?</span> 
					<router-link to="/login">Войдите</router-link>
				</div> 
			</div>
		</div>
	</div>
</template>

<script>
import validator from "validator";
import Preloader from "@/components/Preloader";
import Notice from "@/components/Notice";

export default {
	data() {
		return {
			login: "",
			password: "",
			email: {
				value: "",
				invalid: false
			},
			notice: null,
			isLoading: false
		}
	},
	methods: {
		registration() {
			if(this.login.length === 0) {
				this.notice = "Логин не может быть пустым";

				return false;
			}

			if(this.password.length === 0) {
				this.notice = "Пароль не может быть пустым";

				return false;
			}

			if(this.email.value.length === 0) {
				this.notice = "E-mail не может быть пустым";

				return false;
			}

			if(this.email.invalid) {
				this.notice = "Некорректный e-mail";

				return false;
			}

			this.isLoading = true;
			this.send("registration", {
				login: this.login,
				password: this.password,
				email: this.email
			}).then(response => {
				if(response.status === "success") {
					//this.$store.commit("token", response.data);
					this.$router.push("/login");
				}

				if(response.status === "error") {
					this.notice = response.error;
				}

				this.isLoading = false;
			})
		},
		validate(field) {
			if(this[field].invalid) {
				return "is-invalid";
			} else {
				if(this[field].value.length > 0) {
					return "is-valid";
				}	
			}
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
		},
		"email.value"(value) {
			this.clearNotice();

			if(validator.isEmail(value)) {
				this.email.invalid = false;
			} else {
				this.email.invalid = true;
			}
		}
	},
	components: {
		Preloader,
		Notice
	}

}
</script>