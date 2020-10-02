<template>
	<div>
		<div class="card" v-for="(item, index) in data.list" :class="{ 'mb-3': index !== data.list.length - 1 }">
			<h6 class="card-header">{{ data.models[index] }}</h6>
			<div class="card-body">
				<Chart :data="item" />
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
				list: [],
				models: []
			}
		}
	},
	methods: {
		addData(data) {
			let MAX_DATA_LENGTH = 50;
			let template = {
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

			if(this.data.list.length === 0) {
				for(let i = 0; i < data.length; i++) {
					this.data.list.push(JSON.parse(JSON.stringify(template)));
					this.data.models.push(data[i].model);
				}
			} else {
				for(let i = 0; i < this.data.list.length; i++) {
					if(this.data.list[i].labels.length > MAX_DATA_LENGTH) {
						this.data.list[i].labels.shift();
						this.data.list[i].datasets[0].data.shift();
						this.data.list[i].datasets[1].data.shift();
						this.data.list[i].datasets[2].data.shift();
					}
				}
			}

			data.forEach((cpu, index) => {
				this.data.list[index].labels.push(this.getDate());
				this.data.list[index].datasets[0].data.push(cpu.load.user);
				this.data.list[index].datasets[1].data.push(cpu.load.system);
				this.data.list[index].datasets[2].data.push(cpu.load.total);
			})

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