<script setup>
import WelcomeLoginKiri from '../components/WelcomeLoginKiri.vue';
import WelcomeBackLoginKanan from '../components/WelcomeBackLoginKanan.vue';
import CtaKanan from '../components/CtaKanan.vue';
import CtaKiri from '../components/CtaKiri.vue';
import TombolDaftarCta from '../components/TombolDaftarCta.vue';
import TombolLoginKanan from '../components/TombolLoginKanan.vue';

const emit = defineEmits(['show-register', 'show-login']);
</script>

<template>
<div class="toggle-box">
    <div class="toggle-panel toggle-left">
        <WelcomeLoginKiri/>
        <CtaKiri/>
        <TombolDaftarCta @show-register="emit('show-register')"/>
    </div>

    <div class="toggle-panel toggle-right">
        <WelcomeBackLoginKanan/>
        <CtaKanan/>
        <TombolLoginKanan @show-login="emit('show-login')"/>
    </div>

</div>
</template>