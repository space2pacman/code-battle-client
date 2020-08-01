<template>
	<div>
		<h1 class="mb-4">{{ caption }}</h1>
		<div v-if="typeof task === 'string'">
			<Notice :text="task" />
		</div>
		<div v-if="task instanceof Object" class="row">
			<div class="col">
				<Tabs :tabs="tabs" @switchTab="switchTab" />
				<slot name="tabs-content" />
			</div>
			<div class="col">
				<Ace lang="javascript" theme="monokai" height="400" v-model="code" />
				<slot name="buttons" />
			</div>
		</div>
	</div>
</template>

<script>
import Tabs from "@/components/Tabs";
import Notice from "@/components/Notice";
import Ace from "vue2-ace-editor";
import "brace/mode/javascript";
import "brace/theme/monokai";

export default {
	data() {
		return {
			code: null
		}
	},
	methods: {
		switchTab(tab) {
			this.tabs.active = tab;
		}
	},
	mounted() {
		this.$root.$on("onSwitchTab", this.switchTab);
	},
	watch: {
		code() {
			this.$root.$emit("onCodeInput", this.code);
		},
		task() {
			if(this.task instanceof Object) {
				this.code = this.task.func.body;
			}
		}
	},
	props: {
		caption: String,
		tabs: Object,
		task: {
			types: [String, Object],
			default() {
				return {};
			}
		}
	},
	components: {
		Tabs,
		Notice,
		Ace
	}
}
</script>