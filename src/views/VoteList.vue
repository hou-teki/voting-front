<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { VoteListItem } from '@/types/vote'
import { getVoteList } from '@/apis/votes';

const loading = ref(false)
const votes = ref<VoteListItem[]>([]);

onMounted(async () => {
    loading.value = true
    try {
        votes.value = await getVoteList()
    } catch (error) {
        console.error('Failed to fetch vote list:', error)
    } finally {
        loading.value = false
    }
})

</script>

<template>
    <el-card v-for="(vote, idx) in votes" :key="idx" shadow="hover">
        <template #header>
            <span>{{ vote.title }}</span>
        </template>
        <p>{{ vote.description }}</p>
        <p>{{ vote.startDate }} ~ {{ vote.endDate || '-' }}</p>
        <div>
            <div v-for="(option, idx) in vote.options" :key="idx">
                <span>{{ option.label }}</span>
                <el-progress :stroke-width="24" :percentage="option.count" />
            </div>
        </div>
    </el-card>
</template>