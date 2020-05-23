<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a class="navbar-brand" href="#">Code battle</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li v-for="item in menu" class="nav-item">
                    <router-link :to="item.href" class="nav-link">{{ item.caption }}</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    caption: "Главная",
                    href: "/"
                },
                {
                    caption: "Задания",
                    href: "/tasks"
                },
                {
                    caption: "Регистрация",
                    href: "/registration"
                },
                {
                    caption: "Войти",
                    href: "/login"
                },
                {
                    caption: "Профиль",
                    href: "/profile/name"
                }
            ]
        }
    }
}
</script>