<template>
	<div>
		<h4 class="font-weight-normal mt-4">Результат тестов</h4>
		<div v-if="isLoading" class="d-flex justify-content-center p-5">
			<div class="spinner-border text-success spinner__size--large"></div>
		</div>
		<div v-else>
			<div class="row">
				<div class="col">
					<div class="alert alert-success">Успешыне : 1</div>
				</div>
				<div class="col">
					<div class="alert alert-danger">Не успешыне : 4</div>
				</div>
			</div>
			<div class="card mt-3">
				<div class="card-body">
					<div class="alert alert-success">
						<div>Ожидается: 120</div>
						<div>Вывод: 120</div>
					</div>
					<div class="alert alert-danger">
						<div>Ожидается: 120</div>
						<div>Вывод: 120</div>
					</div>
					<div class="alert alert-danger">
						<div>Ожидается: 120</div>
						<div>Вывод: 120</div>
					</div>
					<div class="alert alert-danger">
						<div>Ожидается: 120</div>
						<div>Вывод: 120</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isLoading: true
		}
	},
	mounted() {
		this.$parent.$on("onResult", () => {
			setTimeout(() => {
				this.isLoading = false;
			}, 1000)
		})
	}
}
</script>

<style scoped>
.spinner__size--large {
	width: 100px;
	height: 100px;
}
</style>