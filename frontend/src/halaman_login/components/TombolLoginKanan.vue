<script setup>
const emit = defineEmits(['show-login']);
</script>

<template>
    <button class="btn-login kanan" @click="emit('show-login')">Login</button>
</template>

<style scoped>

</style>