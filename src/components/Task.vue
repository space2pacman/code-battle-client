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
				<div class="position-relative">
					<Ace lang="javascript" theme="monokai" height="400" v-model="code" />
					<Preloader class="ace__preloader" v-if="preloader" />
				</div>
				<slot name="buttons" />
			</div>
		</div>
	</div>
</template>

<script>
import Tabs from "@/components/Tabs";
import Notice from "@/components/Notice";
import Ace from "vue2-ace-editor";
import Preloader from "@/components/Preloader";
import "brace/mode/javascript";
import "brace/theme/monokai";

export default {
	data() {
		return {
			preloader: false,
			code: null
		}
	},
	methods: {
		switchTab(tab) {
			this.tabs.active = tab;
		},
		onPreloaderStart() {
			this.preloader = true;
		},
		onPreloaderEnd() {
			this.preloader = false;
		}
	},
	mounted() {
		this.$root.$on("onSwitchTab", this.switchTab);
		this.$root.$on("onPreloaderStart", this.onPreloaderStart);
		this.$root.$on("onPreloaderEnd", this.onPreloaderEnd);
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
		Ace,
		Preloader
	}
}
</script>

<style scoped>
.ace__preloader {
	position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(255 255 255 / 0.85);
    z-index: 10;
}
</style>