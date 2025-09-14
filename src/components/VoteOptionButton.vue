<script setup lang="ts">
defineProps<{
  label: string
  loading?: boolean
  disabled?: boolean
  type?: 'success' | 'info'
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const onClick = () => emit('click')
</script>

<template>
  <el-button :type="type || 'success'" round @click="onClick" :loading="loading" :disabled="disabled">
    {{ label }}
  </el-button>
</template>

