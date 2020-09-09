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
	// 	$route() {
			
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

/* dropdown */
.dropdown-menu {
    top: 38px !important;
}

.dropdown__mobile {
    border-top: 1px solid #dcdcdc;
}

.dropdown__mobile .dropdown-item {
    color: rgba(0,0,0,.5);
}

.dropdown__mobile .dropdown-item:first-child {
    margin-top: 8px;
}

.dropdown__mobile .dropdown-item:last-child {
    margin-bottom: 8px;
}


/* modile menu animate */
.mobile-nav-enter-active {
   transition-duration: 0.3s;
   transition-timing-function: ease-in;
}

.mobile-nav-leave-active {
   transition-duration: 0.3s;
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.mobile-nav-enter-to, .mobile-nav-leave {
   max-height: 100px;
   overflow: hidden;
}

.mobile-nav-enter, .mobile-nav-leave-to {
   overflow: hidden;
   max-height: 0;
}

/* dropdown menu animate */
.translate-fade-down-enter-active, .translate-fade-down-leave-active {
    transition: all 250ms;
    transition-timing-function: cubic-bezier(.53,2,.36,.85);
}

.translate-fade-down-enter, .translate-fade-down-leave-active {
    opacity: 0;
}

.translate-fade-down-enter, .translate-fade-down-leave-to {
    position: absolute;
}

.translate-fade-down-enter {
    transform: translateY(-10px);
}

.translate-fade-down-leave-active {
    transform: translateY(10px);
}
</style>