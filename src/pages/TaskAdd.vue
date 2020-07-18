<template>
	<div>
		<h1 class="mb-4">Новая задача</h1>
		<div class="row">
			<div class="col">
				<input type="text" class="form-control mb-3" placeholder="Название" v-model="caption">
				<textarea class="form-control mb-3" placeholder="Описание" v-model="description"></textarea>
				<input type="number" class="form-control mb-3" placeholder="Уровень" v-model="level">
				<input type="text" class="form-control mb-3" placeholder="Язык" v-model="language">
				<input type="text" class="form-control mb-3" placeholder="Имя функции" v-model="func.name">
				<div class="mb-1">Тесты</div>
				<div v-for="(test, index) in tests" class="d-flex mb-3">
					<input type="text" class="form-control mr-3" placeholder="На вход" v-model="test.input.value">
					<select class="form-control mr-3" v-model="test.input.type">
						<option>String</option>
						<option>Number</option>
						<option>Boolean</option>
						<option>Object</option>
						<option>Array</option>
					</select>
					<input type="text" class="form-control mr-3" placeholder="На выход" v-model="test.output.value">
					<select class="form-control mr-3" v-model="test.output.type">
						<option>String</option>
						<option>Number</option>
						<option>Boolean</option>
						<option>Object</option>
						<option>Array</option>
					</select>
					<button type="button" class="btn btn-danger float-right" @click="removeTestFields(index)">
						<i class="fas fa-minus"></i>
					</button>
				</div>
				<button type="button" class="btn btn-success float-right" @click="addTestFields">
					<i class="fas fa-plus"></i>
				</button>
				<!-- <Notice :text="'test'" /> -->
			</div>
			<div class="col">
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
			},
			tests: [
				{
					input: {
						value: null,
						type: null
					},
					output: {
						value: null,
						type: null
					}
				}
			]
		}
	},
	methods: {
		removeTestFields(index) {
			if(this.tests.length > 1) {
				this.tests.splice(index, 1);
			}
		},
		addTestFields() {
			let fields = {
				input: {
					value: null,
					type: null
				},
				output: {
					value: null,
					type: null
				}
			}

			this.tests.push(fields);
		}
	},
	components: {
		//Notice,
		Ace
	}
}
</script>