<script setup>
const emit = defineEmits(['show-register']);
</script>

<template>
    <button class="btn-register" @click="emit('show-register')">Register</button>
</template>

<style scoped>
</style>