<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { VoteResponse } from '@/types/vote'
import { castVote, getVoteList } from '@/apis/voteApi';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userStore';
import VoteCard from '@/components/VoteCard.vue'

const userStore = useUserStore()

const votes = ref<VoteResponse[]>([])

const loadingVotes = ref(false)
const loadingMap = ref<Record<string, boolean>>({})

const page = ref(0)
const size = ref(5)
const hasNext = ref(true)

onMounted(async () => {
    await fetchVotes()
})

const fetchVotes = async () => {
    loadingVotes.value = true
    try {
        const response = await getVoteList(page.value, size.value)
        votes.value.push(...response.content)
        page.value += 1
        hasNext.value = !response.last
    } catch (error) {
        ElMessage.error('Failed to fetch vote list.')
    } finally {
        loadingVotes.value = false
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

</script>

<template>
    <div v-for="vote in votes" :key="vote.id">
        <VoteCard :vote="vote" :loading-map="loadingMap" @cast="handleVote" />
        <el-divider />
    </div>
    <el-button @click="fetchVotes" :loading="loadingVotes" v-if="hasNext">loading more</el-button>
    <el-empty v-else-if="votes.length === 0" description="No votes yet." />
</template>
