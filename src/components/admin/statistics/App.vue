<template>
	<div class="card">
		<div class="card-body">
			<Chart :data="data" />
		</div>
	</div>
</template>

<script>
import Chart from "@/components/Chart";

export default {
	data() {
		return {
			timer: null,
			data: {
				labels: [],
				datasets: [
					{
						label: "APP MB",
						backgroundColor: "#007bff",
						data: []
					}
				]
			}
		}
	},
	methods: {
		addData(data) {
			this.data.labels.push(this.getDate());
			this.data.datasets[0].data.push(data.memory);
		},
		requestData() {
			this.receive("system/app").then(response => {
				if(response.status === "success") {
					this.addData(response.data);
				}
			});
		}
	},
	mounted() {
		this.requestData();

		clearInterval(this.timer);
		this.timer = setInterval(() => {
			this.requestData();
		}, 5000)
	},
	beforeDestroy() {
		clearInterval(this.timer);
	},
	components: {
		Chart
	}
}
</script>