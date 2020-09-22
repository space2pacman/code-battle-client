<template>
	<div>
		<Menu />
		<component :is="layout">
			<div v-if="checkAuthorized">
				<div v-if="isAuthorized">
					<router-view v-if="checkAccessLevel(getAccessLevel)" />
					<Notice v-else text="Доступ закрыт" />
				</div>
				<Notice v-else text="Вы не авторизованы" />
			</div>
			<router-view v-else />
		</component>
		<Footer />
	</div>
</template>

<script>
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Notice from "@/components/Notice";
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
		},
		checkAuthorized() {
			return this.$route.meta.authorized;
		},
		getAccessLevel() {
			return this.$route.meta.accessLevel;
		}
	},
	components: {
		Menu,
		Footer,
		Notice,
		DefaultLayout,
		MainLayout
	}
}
</script>

<style>
.pb-6 {
	padding-bottom: 150px;
}

/* states */
.is-warning {
	border-color: #ffc107 !important;
    padding-right: calc(1.5em + .75rem) !important;
	background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23ffc107' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23ffc107' stroke='none'/%3e%3c/svg%3e");
	background-repeat: no-repeat;
	background-position: right calc(0.375em + 0.1875rem) center;
	background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.is-warning:focus {
	box-shadow: 0 0 0 0.2rem rgb(255 193 7 / 25%) !important;
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