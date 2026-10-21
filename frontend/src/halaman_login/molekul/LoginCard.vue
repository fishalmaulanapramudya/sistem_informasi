<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import TombolLogin from '../components/TombolLogin.vue';
import UsernameInput from '../components/UsernameInput.vue';
import PasswordInput from '../components/PasswordInput.vue';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = () => {
    const trimmedUsername = username.value.trim();
    const trimmedPassword = password.value.trim();

    if (!trimmedUsername || !trimmedPassword) {
        errorMessage.value = 'Username dan password wajib diisi.';
        return;
    }

    errorMessage.value = '';
    router.push('/dashboard');
};
</script>

<template>
    <div class="login-card">
        <form @submit.prevent="handleLogin" class="login-form">
            <h1>Login</h1>
            <UsernameInput v-model="username" />
            <PasswordInput v-model="password" />

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

            <TombolLogin />
        </form>
    </div>
</template>

<style scoped>
.error-message {
    margin: 0 0 12px;
    color: #ffffff;
    font-size: 0.9rem;
}
</style>
