<template>
	<div>
		<main-section v-for="(section, index) in sections" :section="section" :index="index">
			<template v-if="section.slot === 'button'" v-slot:description>
				<button type="button" class="btn btn-success btn-lg mt-5">Попробовать</button>
			</template>
		</main-section>
	</div>
</template>

<script>
import MainSection from "@/components/MainSection";

export default {
	data() {
		return {
			sections: [
				{
					caption: "Совершенствуйте свои навыки программирования",
					image: {
						link: require("@/assets/code.jpg"),
						size: "w-100"
					},
					slot: "button"
				},
				{
					caption: "Выполняйте задания на качество/скорость и зарабатывайте очки",
					image: {
						link: require("@/assets/brain.png")
					}
				},
				{
					caption: "Создавайте свои задания",
					image: {
						link: require("@/assets/lamp.png")
					}
				},
				{
					caption: "Обсуждайте решения других пользователей",
					image: {
						link: require("@/assets/chat.png")
					}
				}
			]
		} 
	},
	components: {
		MainSection
	}
}
</script>