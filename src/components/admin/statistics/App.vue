<template>
	<div class="card">
		<h6 class="card-header">Память приложения</h6>
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
						label: "FREE MB",
						backgroundColor: "#2c4c6c",
						data: []
					},
					{
						label: "APP MB",
						backgroundColor: "#9fb2d4",
						data: []
					}
				]
			}
		}
	},
	methods: {
		addData(data) {
			let MAX_DATA_LENGTH = 50;

			if(this.data.labels.length > MAX_DATA_LENGTH) {
				this.data.labels.shift();
				this.data.datasets[0].data.shift();
			}

			this.data.labels.push(this.getDate());
			this.data.datasets[0].data.push(data.memory.free);
			this.data.datasets[1].data.push(data.memory.app);
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