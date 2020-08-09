<template>
	<div class="main__section" :class="background">
		<div class="container">
			<div class="d-flex justify-content-between align-items-center" :class="rowReverse">
				<div class="w-50">
					<h2 class="display-4">{{ section.caption }}</h2>
					<slot name="description" />
				</div>
				<div class="w-50">
					<img :src="section.image.link" class="pt-5 pb-5" :class="[imagePadding, imageSize, imageDirection]">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		imageSize() {
			return this.section.image.size ? this.section.image.size : "w-100";
		},
		imagePadding() {
			return this.index % 2 === 1 ? "pr-5" : "pl-5";
		},
		imageDirection() {
			return { "float-right": this.index % 2 === 0 };
		},
		rowReverse() {
			return { "flex-row-reverse": this.index % 2 === 1 };
		},
		background() {
			return { "bg-light": this.index % 2 === 1 };
		}
	},
	props: {
		section: Object,
		index: Number
	}
}
</script>

<style scoped>
.main__section:last-child {
	margin-bottom: 90px;
}

.main__section--last {
	margin-bottom: 200px !important;
}
</style>