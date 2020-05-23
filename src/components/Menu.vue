<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Code battle</a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Главная</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/tasks" class="nav-link">Задания</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/registration" class="nav-link">Регистрация</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Войти</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>