<template>
	<div class="d-flex">
		<div v-for="card in cards" class="card w-100 mr-3">
			<div class="card-body text-center">
				<h3 class="display-4">{{ card.value }}</h3>
				<p class="mt-3 text-muted font-weight-normal">{{ card.description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		cards: Array
	}
}
</script>