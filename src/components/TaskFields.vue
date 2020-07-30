<template>
	<div class="mt-3">
		<input type="text" class="form-control mb-3" placeholder="Название" v-model="data.caption">
		<textarea class="form-control mb-3" placeholder="Описание" v-model="data.description"></textarea>
		<input type="number" class="form-control mb-3" placeholder="Уровень" v-model.number="data.level">
		<input type="text" class="form-control mb-3" placeholder="Язык" v-model="data.language">
		<input type="text" class="form-control mb-3" placeholder="Имя функции" v-model="data.func.name">
		<div class="mb-1">Тесты</div>
		<div v-for="(test, index) in data.tests" class="d-flex mb-3">
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
			<button type="button" class="btn btn-danger float-right" @click="removeFields(index)">
				<i class="fas fa-minus"></i>
			</button>
		</div>
		<button type="button" class="btn btn-success float-right" @click="addFields">
			<i class="fas fa-plus"></i>
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			data: {
				caption: null,
				description: null,
				level: null,
				language: null,
				func: {
					name: null
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
		}
	},
	methods: {
		removeFields(index) {
			if(this.tests.length > 1) {
				this.tests.splice(index, 1);
			}
		},
		addFields() {
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

			this.data.tests.push(fields);
		}
	},
	watch: {
		data: {
			deep: true,
			handler() {
				this.$emit("data", this.data);
			}
		}
	}
}
</script>