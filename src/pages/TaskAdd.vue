<template>
	<div>
		<h1 class="mb-4">Новая задача</h1>
		<div class="row">
			<div class="col">
				<ul class="nav nav-tabs">
					<li v-for="tab in tabs.list" class="nav-item">
						<a class="nav-link" :class="{ 'active': tab.type === tabs.active }" href="#" @click.prevent="switchTab(tab.type)">{{ tab.caption }}</a>
					</li>
				</ul>
				<task-fields v-show="tabs.active === 'description'" @data="onTaskFields" />
				<result v-show="tabs.active === 'result'" />
				<!-- <Notice :text="'test'" /> -->
			</div>
			<div class="col">
				<Ace lang="javascript" theme="monokai" height="400" v-model="func.body" />
				<button type="button" class="btn btn-success float-right ml-3 mt-3" @click="checkTask">Проверка</button>
				<button type="button" class="btn btn-success float-right mt-3" @click="addTask" :class="{ 'disabled' : !completed }">Добавить</button>
			</div>
		</div>
	</div>
</template>

<script>
//import Notice from "@/components/Notice";
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

			this.send("task/check", payload);
		},
		addTask() {
			let payload = {
				data: this.data
			}
			
			this.send("task/add", payload);
		},
		onTaskFields(data) {
			this.fields = data;
		}
	},
	components: {
		//Notice,
		TaskFields,
		Result,
		Ace
	}
}
</script>