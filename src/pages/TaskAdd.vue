<template>
	<div>
		<h1 class="mb-4">Новая задача</h1>
		<div class="row">
			<div class="col-6">
				<div class="form-row mb-3">
					<input type="text" class="form-control" placeholder="Название" v-model="caption">
				</div>
				<div class="form-row mb-3">
					<textarea class="form-control" placeholder="Описание" v-model="description"></textarea>
				</div>
				<div class="form-row mb-3">
					<input type="number" class="form-control" placeholder="Уровень" v-model="level">
				</div>
				<div class="form-row mb-3">
					<input type="text" class="form-control" placeholder="Язык" v-model="language">
				</div>
				<div class="form-row mb-3">
					<input type="text" class="form-control" placeholder="Имя функции" v-model="func.name">
				</div>
				<div>Тесты</div>
				<div class="form-row mb-3">
					<div class="col-6 p-0 pr-2">
						<input type="text" class="form-control" placeholder="На вход">
					</div>
					<div class="col-6 p-0 pl-2">
						<input type="text" class="form-control" placeholder="На выход">
					</div>
				</div>
				<!-- <Notice :text="'test'" /> -->
			</div>
			<div class="col-6">
				<Ace lang="javascript" theme="monokai" height="400" v-model="func.body" />
				<button type="button" class="btn btn-success float-right mt-3">Добавить</button>
			</div>
		</div>
	</div>
</template>

<script>
//import Notice from "@/components/Notice";
import Ace from "vue2-ace-editor";
import "brace/mode/javascript";
import "brace/theme/monokai";

export default {
	data() {
		return {
			caption: null,
			description: null,
			level: null,
			language: null,
			func: {
				name: null,
				body: null
			}
		}
	},
	components: {
		//Notice,
		Ace
	}
}
</script>