<template>
	<div class="row mt-5">
		<div class="col">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a class="nav-link active" href="#">Задание</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Результат</a>
				</li>
			</ul>
			<h4 class="font-weight-normal mt-4">Перевернуть строку</h4>
			<div>
				<small>Напишите функцию по развороту строки</small>
			</div>
			<hr>
			<div>
				<small>Пример теста</small>
			</div>
			<div class="card mt-3">
				<div class="card-body">
					<div>
						<small>Ввод: Hello</small>
					</div>
					<div>
						<small>Вывод: olleH</small>
					</div>
				</div>
			</div>
		</div>
		<div class="col">
			<Editor lang="javascript" theme="monokai" v-model="code" />
			<button type="button" class="btn btn-success float-right mt-3">Запуск</button>
		</div>
	</div>
</template>

<script>
import Editor from "vue2-ace-editor";
import "brace/mode/javascript";
import "brace/theme/monokai";

export default {
	data() {
		return {
			code: "function reverseString(str) { return str.split('').reverse().join('') }"
		}
	},
	components: {
		Editor
	}
}
</script>