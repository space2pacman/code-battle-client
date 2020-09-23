<template>
	<div>
		<h1 class="mb-4">Статистика</h1>
		<Tabs :tabs="tabs" :change-hash="false" @switchTab="switchTab" />
		<App v-if="tabs.active === 'app'" />
		<Ram v-if="tabs.active === 'ram'" />
		<Cpu v-if="tabs.active === 'cpu'" />
		<Info v-if="tabs.active === 'info'" />
	</div>
</template>

<script>
import Tabs from "@/components/Tabs";
import App from "@/components/admin/statistics/App";
import Ram from "@/components/admin/statistics/Ram";
import Cpu from "@/components/admin/statistics/Cpu";
import Info from "@/components/admin/statistics/Info";

export default {
	data() {
		return {
			tabs: {
				list: [
					{
						caption: "Приложение",
						type: "app"
					},
					{
						caption: "Память",
						type: "ram"
					},
					{
						caption: "CPU",
						type: "cpu"
					},
					{
						caption: "Информация",
						type: "info"
					}
				],
				active: "app"
			}
		}
	},
	methods: {
		switchTab(tab) {
			this.tabs.active = tab;
		}
	},
	components: {
		Tabs,
		App,
		Ram,
		Cpu,
		Info
	}
}
</script>