<script setup>
import LoginCardRegister from '../molekul/LoginCardRegister.vue';
import ToggleBox from '../molekul/ToggleBox.vue';

const emit = defineEmits(['show-register', 'show-login']);
</script>

<template>
<LoginCardRegister/>
<ToggleBox
  @show-register="emit('show-register')"
  @show-login="emit('show-login')"
/>
</template>