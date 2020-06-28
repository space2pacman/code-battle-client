<template>
	<div>
		<h4 class="font-weight-normal mt-4">Результат тестов</h4>
		<div v-if="isLoading" class="d-flex justify-content-center p-5">
			<div class="spinner-border text-success spinner__size--large"></div>
		</div>
		<div v-else>
			<div class="row">
				<div class="col">
					<div class="alert alert-success">Успешыне : {{ successful }}</div>
				</div>
				<div class="col">
					<div class="alert alert-danger">Не успешыне : {{ unsuccessful }}</div>
				</div>
			</div>
			<div class="card mt-3">
				<div class="card-body">
					<div v-for="test in tests" class="alert" :class="test.result ? 'alert-success' : 'alert-danger'">
						<div>Ожидается: {{ test.expected }}</div>
						<div>Вывод: {{ test.return }}</div>
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
			isLoading: true,
			tests: null
		}
	},
	mounted() {
		this.$parent.$on("onResult", tests => {
			setTimeout(() => {
				this.isLoading = false;
			}, 1000);

			this.tests = tests;
		})
	},
	computed: {
		successful() {
			return this.tests.filter(test => test.result === true).length;
		},
		unsuccessful() {
			return this.tests.filter(test => test.result === false).length;
		}
	}
}
</script>

<style scoped>
.spinner__size--large {
	width: 100px;
	height: 100px;
}
</style>