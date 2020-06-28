<template>
	<div>
		<h4 class="font-weight-normal mt-4">Перевернуть строку</h4>
		<div>
			<small>{{ description }}</small>
		</div>
		<hr>
		<div>
			<small>Пример теста</small>
		</div>
		<div class="card mt-3">
			<div class="card-body">
				<div>
					<small>Ввод: {{ input }}</small>
				</div>
				<div>
					<small>Вывод: {{ output }}</small>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			description: null,
			input: null,
			output: null
		}
	},
	mounted() {
		this.$store.subscribe(mutation => {
			if(mutation.type === "task") {
				this.description = mutation.payload.description;
				this.input = mutation.payload.tests[0].input;
				this.output = mutation.payload.tests[0].output;
			}
		})
	}
}
</script>