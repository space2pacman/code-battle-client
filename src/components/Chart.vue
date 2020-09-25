<script>
import { Line } from "vue-chartjs";

export default {
	extends: Line,
	data() {
		return {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true
							}
						}
					]
                }
			}
		}
	},
	mounted() {
		this.renderChart(this.data, this.options);
	},
	watch: {
		"data.labels": {
			deep: true,
			handler() {
				this.$data._chart.update();
			}
		}
	},
	props: {
		data: {
			type: Object,
			default: null
		}
	}
}
</script>