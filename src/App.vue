<template>
	<div>
		<Menu />
		<div class="container pb-6">
			<router-view />
		</div>
		<Footer />
	</div>
</template>

<script>
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default {
	// watch: {
	// 	"$route"() {
			
	// 	}
	// },
	components: {
		Menu,
		Footer
	}
}
</script>

<style>
.pb-6 {
	padding-bottom: 150px;
}
</style>