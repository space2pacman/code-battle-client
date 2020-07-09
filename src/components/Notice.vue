<template>
	<div :class="className">{{ notices[text] }}</div>
</template>

<script>
export default {
	data() {
		return {
			notices: {
				"unauthorized": "Вы не авторизованы",
				"not found": "Решение отсутствует",
				"user not found": "Пользователь не найден",
				"wrong password": "Неверный пароль"
			}
		}
	},
	props: {
		text: String,
		className: String
	}
}
</script>