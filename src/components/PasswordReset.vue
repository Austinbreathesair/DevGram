<template>
  <div class="modal">
    <div class="modal-content">
      <div @click="$emit('close')"
           class="close">
        <strong>X</strong>
      </div>
      <h3>Reset Password</h3>
      <div v-if="!showSuccess">
        <p>Enter your email address to reset your password</p>
        <form @submit.prevent>
          <input v-model.trim="email"
                 type="email"
                 placeholder="your@email.com" />
        </form>
        <p v-if="errorMsg !== ''"
           class="error">{{errorMsg}}</p>
        <button @click="resetPassword()"
                class="button">Reset Password</button>
      </div>
      <p v-else>Success! Check your email for the reset link.</p>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  data() {
    return {
      email: '',
      showSuccess: false,
      errorMsg: '',
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = '';

      try {
        await auth.sendPasswordResetEmail(this.email);
        this.showSuccess = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
};
</script>

<style>
</style>