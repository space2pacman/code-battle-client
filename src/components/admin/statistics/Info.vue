<template>
	<div>
		<div v-if="info">
			<div class="row mb-3">
				<div class="col-6">
					<div class="card">
						<h6 class="card-header">Платформа</h6>
						<div class="card-body">{{ info.platform }}</div>
					</div>
				</div>
				<div class="col-6">
					<div class="card">
						<h6 class="card-header">Директория</h6>
						<div class="card-body">{{ info.directory }}</div>
					</div>
				</div>
			</div>
			<div class="row mb-3">
				<div class="col-6">
					<div class="card">
						<h6 class="card-header">Время работы системы</h6>
						<div class="card-body">{{ uptime(info.uptime.system) }}</div>
					</div>
				</div>
				<div class="col-6">
					<div class="card">
						<h6 class="card-header">Время работы приложения</h6>
						<div class="card-body">{{ uptime(info.uptime.app) }}</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-6">
					<div class="card">
						<h6 class="card-header">Версия</h6>
						<div class="card-body">
							<div>OS: {{ info.version.os }}</div>
							<div>node: {{ info.version.node }}</div>
							<div>mongodb: {{ info.version.mongodb }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			info: null
		}
	},
	methods: {
		requestData() {
			this.receive("system/info").then(response => {
				if(response.status === "success") {
					this.info = response.data;
				}
			});
		},
		uptime(time) {
			let seconds = time;
			let minutes = seconds / 60;
			let hours = minutes / 60;

			seconds = Math.floor(seconds);
			minutes = Math.floor(minutes);
			hours = Math.floor(hours);

			seconds = (seconds % 60).toString();
			minutes = (minutes % 60).toString();
			hours = (hours % 60).toString();

			seconds = seconds.length === 1 ? "0" + seconds : seconds;
			minutes = minutes.length === 1 ? "0" + minutes : minutes;
			hours = hours.length === 1 ? "0" + hours : hours;

			return `${hours}:${minutes}:${seconds}`;
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
	}
}
</script>