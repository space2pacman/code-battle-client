<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container">
            <router-link class="navbar-brand" to="/">Code battle</router-link>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Главная</router-link>
                    </li>
                    <li>
                        <router-link to="/tasks" class="nav-link">Задачи</router-link>
                    </li>
                    <li>
                        <router-link to="/registration" class="nav-link" v-if="!isAuthorized">Регистрация</router-link>
                    </li>
                    <li>
                        <router-link to="/login" class="nav-link" v-if="!isAuthorized">Войти</router-link>
                    </li>
                    <li>
                        <router-link :to="'/user/' + getAuthUserName" class="nav-link" v-if="isAuthorized">Профиль</router-link>
                    </li>
                    <li>
                        <router-link to="/task/add/" class="nav-link" v-if="checkAccessLevel(100)">Добавить задачу</router-link>
                    </li>
                    <li>
                        <router-link to="/logout" class="nav-link" v-if="isAuthorized">Выйти</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>