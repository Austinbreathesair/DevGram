<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>DevBook</h3>
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="/"><strong>Dashboard</strong></router-link>
          </li>
          <li>
            <router-link to="/settings"><strong>Profile</strong></router-link>
          </li>
          <li><a @click="logout()"><strong>Logout</strong></a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style>
</style>