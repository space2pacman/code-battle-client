<template>
	<div>
		<h1 class="mb-4">Задания</h1>
		<div class="row">
			<div class="col-9">
				<TaskCard v-for="task in tasks" :task="task" />
			</div>
			<div class="col-3">
				<div class="card">
					<div class="card-body">
						<h5 class="mb-4">Фильтр</h5>
						<div class="mb-4">
							<h6>Уровень</h6>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck1">
								<label class="custom-control-label" for="customCheck1">Легкий</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck2">
								<label class="custom-control-label" for="customCheck2">Средений</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck3">
								<label class="custom-control-label" for="customCheck3">Сложный</label>
							</div>
						</div>
						<div class="mb-4">
							<h6>Компании</h6>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck4">
								<label class="custom-control-label" for="customCheck4">Github</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck5">
								<label class="custom-control-label" for="customCheck5">Google</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck6">
								<label class="custom-control-label" for="customCheck6">Yandex</label>
							</div>
						</div>
						<div class="mb-4">
							<h6>Теги</h6>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck7">
								<label class="custom-control-label" for="customCheck7">JavaScript</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck8">
								<label class="custom-control-label" for="customCheck8">PHP</label>
							</div>
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customCheck9">
								<label class="custom-control-label" for="customCheck9">Vue.js</label>
							</div>
						</div>
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
			tasks: [
				{
					id: 0,
					caption: "Перевернуть строку",
					description: "Напишите функцию по развороту строки",
					level: 0,
					completed: false,
					solutions: 8023,
					author: "space2pacman",
					function: {
						name: "reverseString",
						body: "function reverseString(str) { return str.split('').reverse().join('') }"
					},
					company: null,
					tags: ["JavaScript"],
					tests: [
						{
							input: "Hello",
							output: "olleH"
						},
						{
							input: "apple",
							output: "elppa"
						},
						{
							input: "I love Javascript",
							output: "tpircsavaJ evol I"
						}
					]
				},
				{
					id: 0,
					caption: "Факториал",
					description: "Напишите функцию по подсчету факториалаи",
					level: 0,
					completed: true,
					solutions: 564,
					author: "pacman",
					function: {
						name: "fact",
						body: "function fact(n) { return 120 }"
					},
					company: "Google",
					tags: ["JavaScript"],
					tests: [
						{
							input: 5,
							output: 120
						},
						{
							input: 6,
							output: 720
						},
						{
							input: 7,
							output: 5040
						},
						{
							input: 8,
							output: 40320
						},
						{
							input: 9,
							output: 362880
						}
					]
				}
			]
		}
	}
}
</script>