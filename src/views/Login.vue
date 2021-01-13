<template>
  <div id="login">
    <section>
      <div class="col1">
        <h1>DevGram</h1>
        <p>Welcome to DevGram! A sample social media web application powered by Vue.js and Firebase</p>
      </div>
      <div class="col2">
        <form>
          <h1>Welcome Back</h1>
          <div>
            <label for="email">Email</label>
            <input v-model="loginForm.email"
                   type="text"
                   placeholder="your@email.com"
                   id="email" />
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model="loginForm.password"
                   type="password"
                   placeholder="*******"
                   id="password1" />
          </div>
          <button @click="login()"
                  class="button">Log In</button>
          <div class="extras">
            <a>Forgot Password</a>
            <a>Create a new account</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
  },
};
</script>

<style>
</style>