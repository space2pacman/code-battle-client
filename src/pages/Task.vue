<template>
	<div>
		<h4 class="mb-3">Задание</h4>
		<div class="row">
			<div class="col">
				<ul class="nav nav-tabs">
					<li v-for="tab in tabs.list" class="nav-item">
						<a class="nav-link" :class="{ 'active': tab.type === tabs.active }" href="#" @click.prevent="switchTab(tab.type)">{{ tab.caption }}</a>
					</li>
				</ul>
				<Description v-show="tabs.active === 'description'" />
				<Result v-show="tabs.active === 'result'" />
			</div>
			<div class="col">
				<Editor lang="javascript" theme="monokai" height="400" v-model="code" />
				<button type="button" class="btn btn-success float-right mt-3" @click="run">Запуск</button>
			</div>
		</div>
	</div>
</template>

<script>
import Description from "@/components/Description";
import Result from "@/components/Result";
import Editor from "vue2-ace-editor";
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
						caption: "Результат",
						type: "result"
					}
				],
				active: "description"
			},
			code: "function reverseString(str) { return str.split('').reverse().join('') }"
		}
	},
	methods: {
		switchTab(tab) {
			this.tabs.active = tab;
		},
		run() {
			let data = {
				code: this.code
			}

			this.switchTab("result");
			this.send("task", data);
			this.$emit("onResult");
		}
	},
	components: {
		Description,
		Result,
		Editor
	}
}
</script>