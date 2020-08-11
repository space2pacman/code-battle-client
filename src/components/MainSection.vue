<template>
	<div class="main__section" :class="background">
		<div class="container">
			<div class="d-flex justify-content-between align-items-center" :class="rowReverse">
				<div class="w-50">
					<h2 class="display-4">{{ section.caption }}</h2>
				</div>
				<div class="w-50">
					<slot v-if="hasImage" name="image" />
					<img v-else :src="imageLink" class="pt-5 pb-5" :class="[imagePadding, imageSize, imageDirection]">
				</div>
			</div>
			<slot name="bottom" />
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		imageSize() {
			return this.section.image && this.section.image.size ? this.section.image.size : "w-50";
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
		},
		imageLink() {
			return this.section.image && this.section.image.link ? this.section.image.link : "";
		},
		hasImage() {
			return this.$slots.image !== undefined;
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