<template>
	<div>
		<h1 class="mb-4">Настройки профиля</h1>
		<div class="row">
			<div class="col">
				<div>
					<div class="mb-1">E-mail</div>
					<Notice :text="notice.email" className="alert alert-danger mb-2" />
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="far fa-envelope"></i>
							</div>
						</div>
						<input type="text" class="form-control" placeholder="E-mail" v-model="email.value" :class="validateForm('email')">
					</div>
				</div>
				<div class="mb-3">
					<div class="mb-1">Аватар</div>
					<Notice :text="notice.file" className="alert alert-danger mb-2" />
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text p-0 overflow-hidden">
								<img :src="userpic" width="36" alt="avatar">
							</div>
						</div>
						<div class="custom-file">
							<input type="file" class="custom-file-input" name="userpic" @change="upload">
							<label class="custom-file-label" for="userpic">Выберите файл</label>
						</div>
					</div>
					<div class="progress mt-2">
						<div class="progress-bar" :style="`width: ${progress}%`"></div>
					</div>
				</div>
				<div class="mb-2">
					<div class="mb-1">Смена пароля</div>
					<Notice :text="notice.password" className="alert alert-danger mb-2" />
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-key"></i>
							</div>
						</div>
						<input type="password" class="form-control" placeholder="Старый пароль" v-model="password.old">
					</div>
				</div>
				<div class="mb-3">
					<div class="input-group">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="fas fa-key"></i>
							</div>
						</div>
						<input type="password" class="form-control" placeholder="Новый пароль" v-model="password.new">
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
				<div class="mb-3">
					<div class="mb-1">Ваш уровень</div>
					<div class="btn-group btn-group-toggle d-flex">
						<label class="btn btn-info" :class="{ 'active': level === 'junior' }">
							<input class="custom-control-input" name="level" type="radio" value="junior" v-model="level">
							Junior
						</label>
						<label class="btn btn-info" :class="{ 'active': level === 'middle' }">
							<input class="custom-control-input" name="level" type="radio" value="middle" v-model="level">
							Middle
						</label>
						<label class="btn btn-info" :class="{ 'active': level === 'senior' }">
							<input class="custom-control-input" name="level" type="radio" value="senior" v-model="level">
							Senior
						</label>
					</div>
				</div>
				<div class="clearfix">
					<div class="mb-1">Социальные сети</div>
					<div v-for="(socialNetwork, index) in socialNetworks" class="mb-3">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="dropdown__social-networks">
									<dropdown-menu
										:hover="true"
										:hover_timeout="0"
										transition="translate-fade-down"
										v-model="dropdowns[index]"
									>
										<button class="btn btn-secondary dropdown-toggle dropdown-icon" type="button">
											<i :class="socialNetwork.icon"></i>
										</button>
										<div slot="dropdown" class="dropdown-icons">
											<div v-for="item in icons" class="dropdown-item" @click="changeIcon(index, item)">
												<i :class="item.icon"></i>
											</div>
										</div>
									</dropdown-menu>
								</div>
							</div>
							<input type="text" class="form-control" :placeholder="socialNetwork.name" v-model="socialNetwork.link">
							<button type="button" class="btn btn-danger float-right ml-3" @click="removeFields(index)">
								<i class="fas fa-minus"></i>
							</button>
						</div>
					</div>
					<button type="button" class="btn btn-success float-right mb-3" @click="addFields">
						<i class="fas fa-plus"></i>
					</button>
				</div>
			</div>
		</div>
		<button class="btn btn-success float-right" @click="update">Обновить</button>
	</div>
</template>

<script>
import validator from "validator";
import Notice from "@/components/Notice";
import DropdownMenu from "@innologica/vue-dropdown-menu";

export default {
	data() {
		return {
			dropdowns: [],
			progress: 0,
			notice: {
				email: null,
				file: null,
				password: null
			},
			icons: [
				{
					name: "github",
					icon: "fab fa-github",
				},
				{
					name: "facebook",
					icon: "fab fa-facebook",
				},
				{
					name: "twitter",
					icon: "fab fa-twitter",
				}
			],
			password: {
				old: null,
				new: null
			},
			userpic: null,
			email: {
				value: null,
				default: null,
				invalid: null
			},
			notification: null,
			socialNetworks: [],
			country: null,
			level: null
		}
	},
	methods: {
		upload(e) {
			this.uploadFile(e.target.name, e.target.files[0], this.onloadstart, this.onprogress, this.onloadend, this.onuploaded);
		},
		onloadstart() {
			this.progress = 0;
			this.notice.file = null;
		},
		onprogress(e) {
			this.progress = Math.floor(e.loaded * 100 / e.total);
		},
		onloadend() {
			this.progress = 100;
		},
		onuploaded(error, file) {
			if(error) {
				this.notice.file = error;
			} else {
				this.userpic = file.link;
			}
		},
		update() {
			let payload = {
				data: {
					login: this.getAuthUserName,
					password: this.password,
					email: {
						address: this.email.value,
						notification: this.notification
					},
					userpic: this.userpic,
					socialNetworks: this.socialNetworks,
					country: this.country,
					level: this.level
				}
			}

			if(this.email.invalid) {
				this.notice.email = "Некорректный e-mail";

				return false;
			}

			if(this.password.new === null || this.password.new.length === 0) {
				this.notice.password = "Новый пароль не может быть пустым";

				return false;
			}

			if(this.password.new !== null && this.password.old !== null && this.password.new === this.password.old) {
				this.notice.password = "Новый пароль совпадает со старым";

				return false;
			}

			this.send(`user/${this.getAuthUserName}`, payload).then(response => {
				if(response.status === "success") {
					this.receive(`user/${this.getAuthUserName}`).then(response => {
						if(response.status === "success") {
							this.$store.commit("user/auth", response.data);
						}
					});
					this.notice.email = null;
				}

				if(response.status === "error") {
					switch(response.error) {
						case "email already exists":
							this.notice.email = response.error;

							break;
						case "wrong old password":
							this.notice.password = response.error;

							break;
					}
				}
			});
		},
		removeFields(index) {
			if(this.socialNetworks.length > 1) {
				this.socialNetworks.splice(index, 1);
				this.dropdowns.splice(index, 1);
			}
		},
		addFields() {
			let fields = {
				name: this.icons[0].name,
				icon: this.icons[0].icon,
				link: ""
			}

			this.socialNetworks.push(fields);
			this.dropdowns.push(false)
		},
		changeIcon(index, item) {
			this.socialNetworks[index].name = item.name;
			this.socialNetworks[index].icon = item.icon;
		}
	},
	watch: {
		"email.value"(value, oldValue) {
			this.notice.email = null;

			if(value === this.email.default) {
				this.email.invalid = null;

				return;
			}

			if(oldValue !== null) {
				if(validator.isEmail(value)) {
					this.email.invalid = false;
				} else {
					this.email.invalid = true;
				}
			}
		},
		"password.old"() {
			this.notice.password = null;
		},
		"password.new"() {
			this.notice.password = null;
		}
	},
	mounted() {
		let user = this.$store.state["user/auth"];

		if(user) {
			this.email.value = user.email.address;
			this.email.default = user.email.address;
			this.notification = user.email.notification;
			this.userpic = user.userpic;
			this.country = user.country;
			this.level = user.level;
			
			if(user.socialNetworks.length > 0) {
				this.socialNetworks = user.socialNetworks;
			} else {
				this.addFields();
			}
		} else {
			this.$router.push("/login");
		}

	},
	components: {
		Notice,
		DropdownMenu
	}
}
</script>

<style scoped>
.dropdown-icon {
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    color: #495057;
    box-shadow: none;
    border-radius: .25rem 0 0 .25rem;
}

.dropdown-icons {
    text-align: center;
}

.dropdown__social-networks .dropdown-item {
	padding: 0.25rem 0;
}
</style>

<style>
.dropdown__social-networks .dropdown-menu {
	width: 55px;
    min-width: 0px;
    top: 35px !important;
}
</style>