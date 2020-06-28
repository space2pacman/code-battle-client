<template>
	<div class="container">
		<Menu />
		<router-view />
	</div>
</template>

<script>
import Menu from "./components/Menu";

export default {
	// watch: {
	// 	"$route"() {
			
	// 	}
	// },
	// mounted() {
		
	// },
	components: {
		Menu
	}
}
</script>