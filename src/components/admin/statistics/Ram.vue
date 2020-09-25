<template>
	<div class="card">
		<div class="card-header">Оперативная память</div>
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
						backgroundColor: "#9fb2d4",
						data: []
					},
					{
						label: "TOTAL MB",
						backgroundColor: "#2c4c6c",
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
				this.data.datasets[1].data.shift();
			}

			this.data.labels.push(this.getDate());
			this.data.datasets[0].data.push(data.free);
			this.data.datasets[1].data.push(data.total);
		},
		requestData() {
			this.receive("system/ram").then(response => {
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