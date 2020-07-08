<template>
	<div>
		<h4 class="font-weight-normal mt-4 mb-3">Результат тестов</h4>
		<div v-if="tests === 'unauthorized'">Вы не авторизованны</div>
		<div v-else>
			<Preloader v-if="isLoading" />
			<div v-if="isSolved">
				<div class="row mb-4">
					<div class="col">
						<div class="alert mb-0 alert-success">Успешные : {{ successful }}</div>
					</div>
					<div class="col">
						<div class="alert mb-0 alert-danger">Не успешные : {{ unsuccessful }}</div>
					</div>
				</div>
				<div class="card mt-3">
					<div class="card-body">
						<div v-for="test in tests" class="alert pb-3" :class="test.solved ? 'alert-success' : 'alert-danger'">
							<div v-if="test.logs.length > 0" class="card mb-3 mt-3">
								<div class="card-body">
									<div class="card-subtitle mb-2 text-muted font-italic">Log</div>
									<div v-for="log in test.logs" class="card-text">{{ log }}</div>
								</div>
							</div>
							<div>Ожидается: {{ test.expected }}</div>
							<div>Вывод: {{ test.return }}</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="!isLoading && !isSolved">Нажмите на запуск</div>
		</div>
	</div>
</template>

<script>
import Preloader from "@/components/Preloader";

export default {
	data() {
		return {
			isLoading: false,
			isSolved: false,
			tests: null
		}
	},
	mounted() {
		this.$parent.$on("onTestStart", () => {
			this.isLoading = true;
			this.isSolved = false;
		})
		this.$parent.$on("onTestEnd", (error, tests) => {
			if(error) {
				this.tests = error;
			} else {
				setTimeout(() => {
					this.isLoading = false;
					this.isSolved = true;
				}, 1000);

				this.tests = tests || [];
			}
		})
	},
	computed: {
		successful() {
			return this.tests.filter(test => test.solved === true).length;
		},
		unsuccessful() {
			return this.tests.filter(test => test.solved === false).length;
		}
	},
	components: {
		Preloader
	}
}
</script>