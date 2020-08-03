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
				<option v-for="type in types">{{ type }}</option>
			</select>
			<input type="text" class="form-control mr-3" placeholder="На выход" v-model="test.output.value">
			<select class="form-control mr-3" v-model="test.output.type">
				<option v-for="type in types">{{ type }}</option>
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
			types: ["String", "Number", "Boolean", "Object", "Array"],
			data: {
				caption: null,
				description: null,
				level: null,
				language: null,
				func: {
					name: null
				},
				tests: []
			}
		}
	},
	methods: {
		removeFields(index) {
			if(this.data.tests.length > 1) {
				this.data.tests.splice(index, 1);
			}
		},
		addFields() {
			let fields = {
				input: {
					value: "",
					type: "String"
				},
				output: {
					value: "",
					type: "String"
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
	},
	mounted() {
		if(this.task) {
			this.data.caption = this.task.caption;
			this.data.description = this.task.description;
			this.data.level = this.task.level;
			this.data.language = this.task.language;
			this.data.func.name = this.task.func.name;
			this.data.tests = this.task.tests;
		} else {
			this.addFields();
		}
	},
	props: {
		task: Object
	}
}
</script>