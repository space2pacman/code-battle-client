<template>
	<div>
		<Menu />
		<component :is="layout">
			<router-view />
		</component>
		<Footer />
	</div>
</template>

<script>
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
	// watch: {
	// 	"$route"() {
			
	// 	}
	// },
	computed: {
		layout() {
			return this.$route.meta.layout || "default-layout";
		}
	},
	components: {
		Menu,
		Footer,
		DefaultLayout,
		MainLayout
	}
}
</script>

<style>
.pb-6 {
	padding-bottom: 150px;
}
</style>