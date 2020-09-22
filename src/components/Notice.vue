<template>
	<div v-if="text" :class="className">
		{{ notices[text] ? notices[text] : text }}
		<slot name="button" />
	</div>
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
				"wrong old password": "Неверный старый пароль",
				"task is not solved": "Вы еще не решили эту задачу",
				"unsupported file type": "Неподдерживаемый тип файла. Поддерживаются: jpg, png",
				"max image size 50kb": "Максимальный размер изображения 50кб",
				"no liked solutions": "Нет понравившихся решений",
				"user already exists": "Пользователь уже существует",
				"email already exists": "Этот электронный адрес уже используется",
				"invalid characters in login": "Недопустимые символы в логине",
				"invalid characters in password": "Недопустимые символы в пароле",
				"access closed": "Доступ закрыт"
			}
		}
	},
	props: {
		text: String,
		className: String
	}
}
</script>