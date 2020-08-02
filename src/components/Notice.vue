<template>
	<div v-if="text" :class="className">{{ notices[text] ? notices[text] : text }}</div>
</template>

<script>
export default {
	data() {
		return {
			notices: {
				"unauthorized": "Вы не авторизованы",
				"user not found": "Пользователь не найден",
				"task not found": "Задача не найдена",
				"tasks not found": "Задачи не найдены",
				"solution not found": "Решение отсутствует",
				"wrong password": "Неверный пароль",
				"task is not solved": "Вы еще не решили эту задачу"
			}
		}
	},
	props: {
		text: String,
		className: String
	}
}
</script>