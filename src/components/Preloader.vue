<template>
	<div class="spinner d-flex justify-content-center p-5" :class="{ 'spinner__overlay': overlay }">
		<div class="spinner__item spinner-border text-success spinner__size--large"></div>
	</div>
</template>

<script>
export default {
	props: {
		overlay: Boolean
	}
}
</script>

<style scoped>
.spinner {
	position: relative;
	height: 200px;
}

.spinner__overlay {
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(255 255 255 / 0.85);
    z-index: 10;
}

.spinner__item {
	position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin: auto;
}

.spinner__size--large {
	width: 100px;
	height: 100px;
}
</style>