<template>
	<div>
		<h1 class="mb-4">Настройки профиля</h1>
		<div class="row">
			<Preloader v-if="isLoading" :overlay="true" />
			<div class="col">
				<div>
					<div class="mb-1">E-mail</div>
					<Notice :text="notice.email" className="alert alert-danger mb-2" />
					<Notice :text="notice.confirmed" className="alert alert-warning mb-2 d-flex justify-content-between align-items-center">
						<template v-slot:button>
							<button class="btn btn-warning">Подтвердить</button>
						</template>
					</Notice>
					<div class="input-group mb-3">
						<div class="input-group-prepend">
							<div class="input-group-text">
								<i class="far fa-envelope"></i>
							</div>
						</div>
						<input type="text" class="form-control" placeholder="E-mail" v-model="email.value" :class="[validateForm('email'), checkState(email.confirmed)]">
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
							<option v-for="item in countries">{{ item }}</option>
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
import Preloader from "@/components/Preloader";
import Notice from "@/components/Notice";
import DropdownMenu from "@innologica/vue-dropdown-menu";

export default {
	data() {
		return {
			isLoading: false,
			dropdowns: [],
			progress: 0,
			notice: {
				email: null,
				confirmed: null,
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
			level: null,
			countries: [
				"Австралия",
				"Австрия",
				"Азербайджан",
				"Аландские острова",
				"Албания",
				"Алжир",
				"Виргинские Острова (США)",
				"Американское Самоа",
				"Ангилья",
				"Ангола",
				"Андорра",
				"Антарктика",
				"Антигуа и Барбуда",
				"Аргентина",
				"Армения",
				"Аруба",
				"Афганистан",
				"Багамские Острова",
				"Бангладеш",
				"Барбадос",
				"Бахрейн",
				"Белиз",
				"Белоруссия",
				"Бельгия",
				"Бенин",
				"Бермуды",
				"Болгария",
				"Боливия",
				"Бонэйр, Синт-Эстатиус и Саба",
				"Босния и Герцеговина",
				"Ботсвана",
				"Бразилия",
				"Британская территория в Индийском океане",
				"Виргинские Острова (Великобритания)",
				"Бруней",
				"Буркина-Фасо",
				"Бурунди",
				"Бутан",
				"Вануату",
				"Ватикан",
				"Великобритания",
				"Венгрия",
				"Венесуэла",
				"Внешние малые острова США",
				"Восточный Тимор",
				"Вьетнам",
				"Габон",
				"Гаити",
				"Гайана",
				"Гамбия",
				"Гана",
				"Гваделупа",
				"Гватемала",
				"Гвиана",
				"Гвинея",
				"Гвинея-Бисау",
				"Германия",
				"Гернси",
				"Гибралтар",
				"Гондурас",
				"Гонконг",
				"Гренада",
				"Гренландия",
				"Греция",
				"Грузия",
				"Гуам",
				"Дания",
				"Джерси",
				"Джибути",
				"Доминика",
				"Доминиканская Республика",
				"ДР Конго",
				"Египет",
				"Замбия",
				"САДР",
				"Зимбабве",
				"Израиль",
				"Индонезия",
				"Иордания",
				"Ирак",
				"Иран",
				"Ирландия",
				"Исландия",
				"Испания",
				"Италия",
				"Йемен",
				"Кабо-Верде",
				"Казахстан",
				"Острова Кайман",
				"Камбоджа",
				"Камерун",
				"Канада",
				"Катар",
				"Кения",
				"Кипр",
				"Киргизия",
				"Кирибати",
				"Китайская Республика",
				"КНДР",
				"Китай",
				"Кокосовые острова",
				"Колумбия",
				"Коморы",
				"Коста-Рика",
				"Кот-д’Ивуар",
				"Куба",
				"Кувейт",
				"Кюрасао",
				"Лаос",
				"Латвия",
				"Лесото",
				"Либерия",
				"Ливан",
				"Ливия",
				"Литва",
				"Лихтенштейн",
				"Люксембург",
				"Маврикий",
				"Мавритания",
				"Мадагаскар",
				"Майотта",
				"Макао",
				"Северная Македония",
				"Малави",
				"Малайзия",
				"Мали",
				"Мальдивы",
				"Мальта",
				"Марокко",
				"Мартиника",
				"Маршалловы Острова",
				"Мексика",
				"Микронезия",
				"Мозамбик",
				"Молдавия",
				"Монако",
				"Монголия",
				"Монтсеррат",
				"Мьянма",
				"Намибия",
				"Науру",
				"Непал",
				"Нигер",
				"Нигерия",
				"Нидерланды",
				"Никарагуа",
				"Ниуэ",
				"Новая Зеландия",
				"Новая Каледония",
				"Норвегия",
				"ОАЭ",
				"Оман",
				"Остров Буве",
				"Остров Мэн",
				"Острова Кука",
				"Остров Норфолк",
				"Остров Рождества",
				"Острова Питкэрн",
				"Острова Святой Елены, Вознесения и Тристан-да-Кунья",
				"Пакистан",
				"Палау",
				"Государство Палестина",
				"Панама",
				"Папуа — Новая Гвинея",
				"Парагвай",
				"Перу",
				"Польша",
				"Португалия",
				"Пуэрто-Рико",
				"Республика Конго",
				"Республика Корея",
				"Реюньон",
				"Россия",
				"Руанда",
				"Румыния",
				"Сальвадор",
				"Самоа",
				"Сан-Марино",
				"Сан-Томе и Принсипи",
				"Саудовская Аравия",
				"Эсватини",
				"Северные Марианские Острова",
				"Сейшельские Острова",
				"Сен-Бартелеми (Карибы)",
				"Сен-Мартен",
				"Сен-Пьер и Микелон",
				"Сенегал",
				"Сент-Винсент и Гренадины",
				"Сент-Китс и Невис",
				"Сент-Люсия",
				"Сербия",
				"Сингапур",
				"Синт-Мартен",
				"Сирия",
				"Словакия",
				"Словения",
				"Соломоновы Острова",
				"Сомали",
				"Судан",
				"Суринам",
				"США",
				"Сьерра-Леоне",
				"Таджикистан",
				"Таиланд",
				"Танзания",
				"Теркс и Кайкос",
				"Того",
				"Токелау",
				"Тонга",
				"Тринидад и Тобаго",
				"Тувалу",
				"Тунис",
				"Туркмения",
				"Турция",
				"Уганда",
				"Узбекистан",
				"Украина",
				"Уоллис и Футуна",
				"Уругвай",
				"Фарерские острова",
				"Фиджи",
				"Филиппины",
				"Финляндия",
				"Фолклендские острова",
				"Франция",
				"Французская Полинезия",
				"Французские Южные и Антарктические территории",
				"Херд и Макдональд",
				"Хорватия",
				"ЦАР",
				"Чад",
				"Черногория",
				"Чехия",
				"Чили",
				"Швейцария",
				"Швеция",
				"Шри-Ланка",
				"Эквадор",
				"Экваториальная Гвинея",
				"Эритрея",
				"Эстония",
				"Эфиопия",
				"ЮАР",
				"Южная Георгия и Южные Сандвичевы Острова",
				"Южный Судан",
				"Ямайка",
				"Япония"
			]
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

			if(this.password.old !== null && (this.password.new === null || this.password.new.length === 0)) {
				this.notice.password = "Новый пароль не может быть пустым";

				return false;
			}

			if(this.password.new !== null && this.password.old !== null && this.password.new === this.password.old) {
				this.notice.password = "Новый пароль совпадает со старым";

				return false;
			}

			this.isLoading = true;
			this.send(`user/${this.getAuthUserName}`, payload).then(response => {
				if(response.status === "success") {
					this.receive(`user/${this.getAuthUserName}`).then(response => {
						if(response.status === "success") {
							this.$store.commit("user/auth", response.data);
							this.isLoading = false;
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

					this.isLoading = false;
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
		},
		checkState(state) {
			if(state === false) {
				return "is-warning";
			}
		},
		checkEmailConfirmation() {
			if(this.email.confirmed === false) {
				this.notice.confirmed = "E-mail адрес не подтвержден";
			}
		},
		setSocialNetworks(socialNetworks) {
			if(socialNetworks.length > 0) {
				this.socialNetworks = socialNetworks;
			} else {
				this.addFields();
			}
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
				this.email.confirmed = null;
				this.notice.confirmed = null;

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
			if(user !== this.$route.params.login) {
				this.$router.push(`/user/${user.login}/settings`);
			}

			this.email.value = user.email.address;
			this.email.default = user.email.address;
			this.email.confirmed = user.email.confirmed;
			this.notification = user.email.notification;
			this.userpic = user.userpic;
			this.country = user.country;
			this.level = user.level;
			this.setSocialNetworks(user.socialNetworks);
			this.checkEmailConfirmation();
		} else {
			this.$router.push("/login");
		}

		this.$store.subscribe(mutation => {
			if(mutation.type === "user/auth") {
				this.email.confirmed = mutation.payload.email.confirmed;
				this.email.invalid = null;
				this.checkEmailConfirmation();
			}
		})
	},
	components: {
		Preloader,
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