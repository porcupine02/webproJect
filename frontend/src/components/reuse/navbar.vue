<template>
  <nav
    class="navbar is-dark"
    role="navigation"
    aria-label="main navigation"
    style="position: fixed; top: 0; width: 100%"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="http://localhost:8080/">
        <i class="fas fa-home"></i>
        Home
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" v-if="logins == true" href="search.html">
          ค้นหาห้องพัก
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> ห้องพักของเรา </a>

          <div class="navbar-dropdown">
            <a class="navbar-item" href="index.html#01"> Standard Room </a>
            <a class="navbar-item" href="index.html#02"> Deluxe Room </a>
            <a class="navbar-item" href="index.html#03"> Suite Room </a>
            <a class="navbar-item" href="index.html#04"> Superior Room </a>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons asd">
            <a
              class="button is-info"
              v-if="logins == false"
              @click="isActive_Sign_up = true"
            >
              <strong>Sign up</strong>
            </a>
            <a class="button is-dark" v-if="logins == true" href="profile.html">
              <strong>My Profile</strong>
            </a>
            <a
              class="button is-dark"
              v-if="logins == false"
              @click="isActive_Sign_in = true"
            >
              Log in
            </a>
            <a
              class="button is-danger"
              v-if="logins == true"
              @click="logins = false"
              >Log out</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>