<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { VoteResponse } from '@/types/vote'
import { castVote, getVoteList } from '@/apis/voteApi';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()

const votes = ref<VoteResponse[]>([])

const loading = ref(false)
const loadingMap = ref<Record<string, boolean>>({})

const page = ref(0)
const size = ref(1)
const hasNext = ref(true)

onMounted(async () => {
    await fetchVotes()
})

const fetchVotes = async () => {
    loading.value = true
    try {
        const response = await getVoteList(page.value, size.value)

        votes.value.push(...response.content)
        page.value += 1
        hasNext.value = !response.last
    } catch (error) {
        ElMessage.error('Failed to fetch vote list.')
    } finally {
        loading.value = false
    }
}

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

        const res = await castVote(voteId, optionId)

        // update view
        applyCastResult(res)

        ElMessage.success('Vote cast successfully.')
    } catch (error) {
        ElMessage.error('Failed to cast vote.')
    } finally {
        loadingMap.value[key] = false
    }
}

function applyCastResult(res: VoteResponse) {
    votes.value = votes.value.map(old => {
        if (old.id !== res.id) return old
        return {
            ...old,
            totalVotes: res.totalVotes,
            options: res.options,
            canViewResult: res.canViewResult,
            canCast: res.canCast
        }
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
                <h3>{{ vote.title }}</h3>
            </template>

            <p>{{ vote.description }}</p>
            <p>{{ vote.startDate || '' }} ~ {{ vote.endDate || '' }}</p>

            <div v-for="option in vote.options" :key="option.id" class="option-item">

                <div v-if=vote.canCast>
                    <el-button type="success" round @click="handleVote(vote.id, option.id)"
                        :loading="loadingMap[keyOf(vote.id, option.id)]">
                        {{ option.label }}
                    </el-button>
                </div>
                <div v-else>
                    <el-button type="info" round disabled>
                        {{ option.label }}
                    </el-button>
                </div>

                <div v-if=vote.canViewResult>
                    <el-progress :stroke-width="18" :percentage="percent(option.count, vote.totalVotes)" />
                </div>
            </div>
        </el-card>
        <el-divider />
    </div>
    <el-button @click="fetchVotes" :loading="loading" v-if="hasNext">loading more</el-button>
</template>

<style scoped>
.option-item {
    margin-bottom: 12px;
}
</style>