<template>
	<div class="container">
		<Menu />
		<router-view />
	</div>
</template>

<script>
import Menu from "./components/Menu";

export default {
	components: {
		Menu
	}
}
</script>