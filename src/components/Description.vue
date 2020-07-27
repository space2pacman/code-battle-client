<template>
	<div>
		<h4 class="font-weight-normal mt-4">{{ task.caption }}</h4>
		<div>
			<small>{{ task.description }}</small>
		</div>
		<hr>
		<div>
			<small>Пример теста</small>
		</div>
		<div class="card mt-3">
			<div class="card-body">
				<div>
					<small>Ввод: {{ task.tests[0].input.value }}</small>
				</div>
				<div>
					<small>Вывод: {{ task.tests[0].output.value }}</small>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		task: Object
	}
}
</script>