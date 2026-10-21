<script setup lang="ts">
</script>

<template>
  <section class="dashboard-page">
    <h1>Dashboard</h1>
    <RouterLink to="/user">user</RouterLink>
  </section>
</template>

<style scoped>
.dashboard-page {
    width: 850px;
  min-height: 550px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fb;
  color: #1f2937;
  font-family: Arial, sans-serif;
}

h1 {
  margin: 0;
  font-size: 2rem;
}

a{
  text-decoration: none;
  color:red;
  font-size: 10 px;
  margin: 20px;
  transition: ease-in-out 0.3s;
  cursor: pointer;
}
a:hover{
  font-size: 15px;
  color: rgb(81, 167, 81);
}
</style>
