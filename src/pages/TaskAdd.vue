<template>
	<div>
		<h1 class="mb-4">Новая задача</h1>
		<div class="row">
			<div class="col">
				<Tabs :tabs="tabs" @switchTab="switchTab" />
				<task-fields v-show="tabs.active === 'description'" @data="onTaskFields" />
				<result v-show="tabs.active === 'result'" />
			</div>
			<div class="col">
				<Ace lang="javascript" theme="monokai" height="400" v-model="func.body" />
				<button type="button" class="btn btn-success float-right ml-3 mt-3" @click="checkTask">Запуск проверки</button>
				<button type="button" class="btn btn-success float-right mt-3" @click="addTask" :class="{ 'disabled' : !completed }">Добавить</button>
			</div>
		</div>
	</div>
</template>

<script>
import Tabs from "@/components/Tabs";
import TaskFields from "@/components/TaskFields";
import Result from "@/components/Result";
import Ace from "vue2-ace-editor";
import "brace/mode/javascript";
import "brace/theme/monokai";

export default {
	data() {
		return {
			tabs: {
				list: [
					{
						caption: "Описание",
						type: "description"
					},
					{
						caption: "Результат проверки",
						type: "result"
					}
				],
				active: "description"
			},
			func: {
				body: null
			},
			fields: null,
			completed: false
		}
	},
	methods: {
		switchTab(tab) {
			this.tabs.active = tab;
		},
		checkTask() {
			let payload = {
				data: {
					func: {
						name: this.fields.func.name,
						body: this.func.body
					},
					tests: this.fields.tests
				}
			}

			this.switchTab("result")
			this.$emit("onTestStart");
			this.send("task/check", payload).then(response => {
				if(response.status === "success") {
					this.$emit("onTestEnd", null, response.data);
				}

				if(response.status === "error") {
					this.$emit("onTestEnd", response.error);
				}
			});
		},
		addTask() {
			let payload = {
				data: {
					fields: this.fields,
					func: this.func.body,
					author: this.getAuthUserName
				}
			}
			
			this.send("task/add", payload);
		},
		onTaskFields(data) {
			this.fields = data;
		}
	},
	components: {
		Tabs,
		TaskFields,
		Result,
		Ace
	}
}
</script>