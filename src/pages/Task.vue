<template>
	<div>
		<h1 class="mb-4">Задание</h1>
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
			id: this.$route.params.id,
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
			task: null,
			code: null
		}
	},
	methods: {
		switchTab(tab) {
			this.tabs.active = tab;
		},
		run() {
			let data = {
				code: this.code,
				id: this.id
			}

			this.switchTab("result");
			this.$emit("onTestStart");
			this.send("task/test", data).then(response => {
				this.$emit("onTestEnd", response.data);
			});
		}
	},
	mounted() {
		this.receive(`task/${this.id}`);
		this.$store.subscribe(mutation => {
			if(mutation.type === "task") {
				this.task = mutation.payload;
				this.code = this.task.function.body;
			}
		})
	},
	components: {
		Description,
		Result,
		Editor
	}
}
</script>