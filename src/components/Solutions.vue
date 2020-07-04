<template>
	<div>
		<h4 class="font-weight-normal mt-4 mb-3">Решения</h4>
		<Preloader v-if="isLoading" />
	</div>
</template>

<script>
import Preloader from "@/components/Preloader";

export default {
	data() {
		return {
			isLoading: false,
		}
	},
	components: {
		Preloader
	}
}
</script>

