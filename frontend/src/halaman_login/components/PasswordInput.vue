<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
    <div class="input-group">
        <input
            type="password"
            class="password"
            placeholder="password"
            :value="props.modelValue"
            @input="onInput"
        >
    </div>
</template>

<style scoped>

</style>