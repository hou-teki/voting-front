<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { CastVoteResponse, VoteListItem } from '@/types/vote'
import { castVote, getVoteList } from '@/apis/votes';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()

const votes = ref<VoteListItem[]>([])

const loading = ref(false)
const loadingMap = ref<Record<string, boolean>>({})

onMounted(async () => {
    loading.value = true
    try {
        votes.value = await getVoteList()
    } catch (error) {
        ElMessage.error('Failed to fetch vote list.')
    } finally {
        loading.value = false
    }
})

const keyOf = (voteId: number, optionId: number) => {
    return `${voteId}_${optionId}`
}

async function handleVote(voteId: number, optionId: number) {
    const key = keyOf(voteId, optionId)
    loadingMap.value[key] = true

    try {
        if (!userStore.isLogin || !userStore.id) {
            ElMessage.error('User not logged in')
            return
        }

        const res = await castVote({ userId: userStore.id, voteId, optionId })

        // update view
        applyCastResult(res)

        ElMessage.success('Vote cast successfully.')
    } catch (error) {
        ElMessage.error('Failed to cast vote.')
    } finally {
        loadingMap.value[key] = false
    }
}

function applyCastResult(res: CastVoteResponse) {
    votes.value = votes.value.map(old => {
        if (old.id !== res.voteId) return old
        return { ...old, total: res.total, options: res.options }
    })
}

function percent(count: number, total: number): number {
    return total > 0 ? Math.round((count / total) * 100) : 0
}

</script>

<template>
    <div v-for="vote in votes" :key="vote.id">
        <el-card shadow="hover">
            <template #header>
                <h2>{{ vote.title }}</h2>
            </template>

            <p>{{ vote.description }}</p>
            <p>{{ vote.startDate }} ~ {{ vote.endDate || '-' }}</p>

            <div v-for="option in vote.options" :key="option.id">
                <div v-if="userStore.isLogin && userStore.id">
                    <el-button type="warning" @click="handleVote(vote.id, option.id)"
                        :loading="loadingMap[keyOf(vote.id, option.id)]">
                        Vote
                    </el-button>
                </div>

                <div>
                    <span>{{ option.label }}</span>
                    <el-progress :stroke-width="18" :percentage="percent(option.count, vote.total)" />
                </div>
            </div>
        </el-card>
        <el-divider />
    </div>
</template>