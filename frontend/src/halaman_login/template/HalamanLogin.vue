<script setup>
import { ref } from 'vue';
import BagianKananLogin from '../organisme/BagianKananLogin.vue';
import BagianKiriLogin from '../organisme/BagianKiriLogin.vue';

const isRegister = ref(false);

const showRegister = () => {
    isRegister.value = true;
};

const showLogin = () => {
    isRegister.value = false;
};
</script>

<template>
<div :class="['login-container', { active: isRegister }]">
    <BagianKananLogin/>
    <BagianKiriLogin
        @show-register="showRegister"
        @show-login="showLogin"
    />
</div>
</template>
