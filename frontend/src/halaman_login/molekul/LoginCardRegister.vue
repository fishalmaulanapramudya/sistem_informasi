<script setup>

import TombolLogin from '../components/TombolLogin.vue';
import UsernameInput from '../components/UsernameInput.vue';
import PasswordInput from '../components/PasswordInput.vue';
import EmailInput from '../components/EmailInput.vue';

</script>

<template>
    <div class="login-card register">
        <form action="#" method="post" class="login-form register">
            <h1>REGISTRATION</h1>
            <UsernameInput/>
            <EmailInput/>
            <PasswordInput/>
            <TombolLogin/>
        </form>
    </div>
</template>