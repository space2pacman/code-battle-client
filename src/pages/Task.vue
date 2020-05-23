<template>
	<div>
		<h4 class="mb-3">Задание</h4>
		<div class="row">
			<div class="col">
				<ul class="nav nav-tabs">
					<li v-for="tab in tabs.list" class="nav-item">
						<a class="nav-link" :class="{ 'active': tab === tabs.active }" href="#" @click.prevent="switchTab(tab)">{{ tab }}</a>
					</li>
				</ul>
				<!-- fix -->
				<Description v-if="tabs.active === 'Описание'" />
				<Result v-if="tabs.active === 'Результат'" />
			</div>
			<div class="col">
				<Editor lang="javascript" theme="monokai" height="400" v-model="code" />
				<button type="button" class="btn btn-success float-right mt-3">Запуск</button>
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
				list: ["Описание", "Результат"],
				active: "Описание"
			},
			code: "function reverseString(str) { return str.split('').reverse().join('') }"
		}
	},
	methods: {
		switchTab(tab) {
			this.tabs.active = tab;
		}
	},
	components: {
		Description,
		Result,
		Editor
	}
}
</script>