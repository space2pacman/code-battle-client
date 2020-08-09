<template>
	<div class="spinner d-flex justify-content-center p-5">
		<div class="spinner__item spinner-border text-success spinner__size--large"></div>
	</div>
</template>

<style scoped>
.spinner {
	position: relative;
	height: 200px;
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