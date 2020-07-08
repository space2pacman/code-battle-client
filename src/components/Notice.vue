<template>
	<div>{{ notices[text] }}</div>
</template>

<script>
export default {
	data() {
		return {
			notices: {
				"unauthorized": "Вы не авторизованы",
				"not found": "Решение отсутствует"
			}
		}
	},
	props: {
		text: String
	}
}
</script>