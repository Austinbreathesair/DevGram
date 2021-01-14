<template>
  <div id="login">
    <PasswordReset v-if="showPasswordReset"
                   @close="togglePasswordReset()"></PasswordReset>
    <section>
      <div class="col1">
        <h1>DevGram</h1>
        <p>Welcome to DevGram! A sample social media web application powered by Vue.js and Firebase</p>
      </div>
      <div :class="{ 'signupForm': !showLoginForm }"
           class="col2">
        <form v-if="showLoginForm"
              @submit.prevent>
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
        <form v-else
              @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Name</label>
            <input v-model.trim="signupForm.name"
                   type="text"
                   placeholder="John Doe"
                   id="name" />
          </div>
          <div>
            <label for="title">Title</label>
            <input v-model.trim="signupForm.title"
                   type="text"
                   placeholder="Dr."
                   id="title" />
          </div>
          <div>
            <label for="email2">Email</label>
            <input v-model.trim="signupForm.email"
                   type="text"
                   placeholder="your@email.com"
                   id="email2" />
          </div>
          <div>
            <label for="password2">Password</label>
            <input v-model.trim="signupForm.password"
                   type="password"
                   placeholder="**********"
                   id="password2" />
          </div>
          <button @click="signUp()"
                  class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset';

export default {
  components: {
    PasswordReset,
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: '',
      },
      showLoginForm: true,
      showPasswordReset: false,
    };
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title,
      });
    },
  },
};
</script>

<style>
</style>