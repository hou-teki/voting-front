<script setup lang="ts">
import type { VoteResponse } from '@/types/vote'
import VoteOptionButton from './VoteOptionButton.vue'

const props = defineProps<{
  vote: VoteResponse
  loadingMap?: Record<string, boolean>
}>()

const emit = defineEmits<{
  (e: 'cast', voteId: number, optionId: number): void
}>()

function keyOf(voteId: number, optionId: number) {
  return `${voteId}_${optionId}`
}

function percent(count: number, total: number): number {
  return total > 0 ? Math.round((count / total) * 100) : 0
}
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <h3>{{ props.vote.title }}</h3>
    </template>

    <p>{{ props.vote.description }}</p>
    <p>{{ props.vote.startDate }} ~ {{ props.vote.endDate == '9999-12-31' ? '' : props.vote.endDate }}</p>

    <div v-for="option in props.vote.options" :key="option.id" class="option-item">
      <div v-if="props.vote.canCast">
        <VoteOptionButton :label="option.label" :type="'success'"
          :loading="props.loadingMap && props.loadingMap[keyOf(props.vote.id, option.id)]"
          @click="emit('cast', props.vote.id, option.id)" />
      </div>
      <div v-else>
        <VoteOptionButton :label="option.label" :type="'info'" :disabled="true" />
      </div>

      <div v-if="props.vote.canViewResult">
        <el-progress :stroke-width="18" :percentage="percent(option.count, props.vote.totalVotes)" />
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.option-item {
  margin-bottom: 12px;
}
</style>
