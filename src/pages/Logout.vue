<template>
	<div>test</div>
</template>

<script>
export default {
	mounted() {
		this.send("logout", {
			token: this.getToken
		}).then(response => {
			if(response.status === "success") {
				this.$store.commit("token", null);
				this.$router.push("/");
			}
		})
	}
}
</script>