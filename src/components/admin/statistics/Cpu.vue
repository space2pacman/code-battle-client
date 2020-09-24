<template>
	<div class="card">
		<div class="card-body">
			<div class="card">
				<div class="card-header">Intel(R) Core(TM) i3-7020U CPU @ 2.30GHz</div>
				<div class="card-body">
					<Chart :data="data" />
				</div>
			</div>
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
						label: "USER",
						backgroundColor: "#9fb2d4",
						data: []
					},
					{
						label: "SYSTEM",
						backgroundColor: "#65709e",
						data: []
					},
					{
						label: "TOTAL",
						backgroundColor: "#2c4c6c",
						data: []
					}
				]
			}
		}
	},
	methods: {
		addData(data) {
			this.data.labels.push(this.getDate());
			this.data.datasets[0].data.push(data[0].load.user);
			this.data.datasets[1].data.push(data[0].load.system);
			this.data.datasets[2].data.push(data[0].load.total);
		},
		requestData() {
			this.receive("system/cpu").then(response => {
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