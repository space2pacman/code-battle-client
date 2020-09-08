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
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="far fa-envelope"></i>
							</div>
						</div>
						<input type="text" class="form-control" maxlength="50" placeholder="E-mail" v-model="email.value" :class="validateForm('email')">
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
			login: {
				value: "",
				invalid: false
			},
			password: {
				value: "",
				invalid: false
			},
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
			if(this.login.value.length === 0) {
				this.notice = "Логин не может быть пустым";

				return false;
			}

			if(this.password.value.length === 0) {
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
				login: this.login.value,
				password: this.password.value,
				email: this.email.value
			}).then(response => {
				if(response.status === "success") {
					this.$router.push("/login");
				}

				if(response.status === "error") {
					this.notice = response.error;
				}

				this.isLoading = false;
			})
		}
	},
	watch: {
		"login.value"(newValue, oldValue) {
			this.notice = null;

			if(oldValue.length > 0 && newValue.length === 0) {
				this.login.invalid = true;
			}

			if(newValue.length > 0) {
				this.login.invalid = false;
			}
		},
		"password.value"(newValue, oldValue) {
			this.notice = null;

			if(oldValue.length > 0 && newValue.length === 0) {
				this.password.invalid = true;
			}

			if(newValue.length > 0) {
				this.password.invalid = false;
			}
		},
		"email.value"(value) {
			this.notice = null;

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