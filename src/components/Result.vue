<template>
	<div>
		<h4 class="font-weight-normal mt-4 mb-3">Результат тестов</h4>
		<Notice v-if="!isAuthorized" :text="tests" />
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
							<div>
								Ожидается: {{ test.expected.value }} <span class="badge" :class="getBadge(test.expected.type)">{{ test.expected.type }}</span>
							</div>
							<div>
								Вывод: {{ test.return.value }} <span class="badge" :class="getBadge(test.return.type)">{{ test.return.type }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="!isLoading && !isSolved">Нажмите на запуск</div>
	</div>
</template>

<script>
import Preloader from "@/components/Preloader";
import Notice from "@/components/Notice";

export default {
	data() {
		return {
			isLoading: false,
			isSolved: false,
			tests: null
		}
	},
	mounted() {
		this.$root.$on("onTestStart", () => {
			this.isLoading = true;
			this.isSolved = false;
		})
		this.$root.$on("onTestEnd", (error, tests) => {
			if(error) {
				this.tests = error;
			} else {
				setTimeout(() => {
					if(this.unsuccessful === 0) {
						this.$emit("onResultSuccess");
					}

					if(this.unsuccessful > 0) {
						this.$emit("onResultUnsuccess");
					}

					this.isLoading = false;
					this.isSolved = true;
				}, 1000);

				this.tests = tests || [];
			}
		})
	},
	methods: {
		getBadge(type) {
			return `badge-${type.toLowerCase()}`;
		}
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
		Preloader,
		Notice
	}
}
</script>

<style scoped>
.badge-number {
	background: #4169e1;
	color: #fff;
}

.badge-string {
	background: #ffff33;
}

.badge-boolean {
	background: #9400d3;
	color: #fff;
}

.badge-array {
	background: #a0522d;
	color: #fff;
}

.badge-object {
	background: #32cd32;
	color: #fff;
}

.badge-function {
	background: #000;
	color: #fff;
}

.badge-null {
	background: #a9a9a9;
	color: #fff;
}

.badge-undefined {
	background: #a9a9a9;
	color: #fff;
}
</style>