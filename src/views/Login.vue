<template>
  <div id="login">
    <PasswordReset v-if="showPasswordReset"
                   @close="togglePasswordReset()"></PasswordReset>
    <section>
      <div class="col1">
        <h1>DevBook</h1>
        <p>Welcome to DevBook! A sample social media web application where developers can share small snippets of code they found useful. Who knows, it may be just what you're looking for?</p>
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
                   required
                   id="email" />
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model="loginForm.password"
                   type="password"
                   placeholder="*******"
                   required
                   id="password1" />
          </div>
          <button @click="login()"
                  class="button">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password</a>
            <a @click="toggleForm()">Create a new account</a>
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
                   required
                   id="password2" />
          </div>
          <button @click="signup()"
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
      errors: [],
    };
  },
  methods: {
    checkForm: function (e) {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.loginForm.email) {
        this.errors.push('Name required.');
      }
      if (!this.loginForm.password) {
        this.errors.push('Age required.');
      }

      e.preventDefault();
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.checkForm;
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
      this.errors = [];

      if (!this.loginForm.email) {
        this.errors.push('Email address is required.');
      }
      if (!this.loginForm.password) {
        this.errors.push('Password is required.');
      }
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