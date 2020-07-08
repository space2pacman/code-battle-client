<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <router-link class="navbar-brand" to="/">Code battle</router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Главная</router-link>
                </li>
                <li>
                    <router-link to="/tasks" class="nav-link">Задания</router-link>
                </li>
                <li>
                    <router-link to="/registration" class="nav-link" v-if="!isAuthorized">Регистрация</router-link>
                </li>
                <li>
                    <router-link to="/login" class="nav-link" v-if="!isAuthorized">Войти</router-link>
                </li>
                <li>
                    <router-link to="/profile/pacman" class="nav-link" v-if="isAuthorized">Профиль</router-link>
                </li>
                <li>
                    <router-link to="/logout" class="nav-link" v-if="isAuthorized">Выйти</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>