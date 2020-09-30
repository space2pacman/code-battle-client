<template>
	<div>
		<div class="row">
			<div class="col-3">
				<div class="list-group">
					<div class="list-group-item list-group-item-stub"></div>
					<router-link
						v-for="link in links.list" 
						class="list-group-item list-group-item-action" 
						:to="'#' + link.href" 
						:class="{ 'active': link.href === links.active }"
					>
						{{ link.caption }}
					</router-link>
				</div>
			</div>
			<div class="col-9">
				<Statistics v-if="links.active === 'statistics'" />
				<Users v-if="links.active === 'users'" />
			</div>
		</div>
	</div>
</template>

<script>
import Statistics from "@/components/admin/Statistics";
import Users from "@/components/admin/Users";

export default {
	data() {
		return {
			links: {
				list: [
					{
						href: "statistics",
						caption: "Статистика"
					},
					{
						href: "users",
						caption: "Пользователи"
					}
				],
				active: ""
			}
		}
	},
	methods: {
		checkHash() {
			let hash = this.$route.hash.slice(1);

			if(hash.length === 0) {
				this.$router.push({ hash: "statistics" });
			}
		}
	},
	watch: {
		"$route"(value) {
			let hash = value.hash.slice(1);

			this.links.active = hash;
			this.checkHash();
		}
	},
	mounted() {
		this.checkHash();
	},
	components: {
		Statistics,
		Users
	}
}
</script>

<style scoped>
.list-group-item-stub {
	padding-top: 60px;
}
</style>