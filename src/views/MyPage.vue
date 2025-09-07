<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { VoteResponse } from '@/types/vote'
import { useUserStore } from '@/stores/userStore'
import { getMyCreatedVotes } from '@/apis/users'
import { ElMessage } from 'element-plus'

const myCreatedVotes = ref<VoteResponse[]>([])
const loading = ref(false)

const userStore = useUserStore()

const activeNames = ref(['1', '2'])

onMounted(async () => {
    if (!userStore.isLogin || !userStore.id) {
        return
    }

    loading.value = true
    try {
        myCreatedVotes.value = await getMyCreatedVotes(userStore.id)
    } catch (error) {
        ElMessage.error('Failed to fetch created votes.')
    } finally {
        loading.value = false
    }
})


</script>

<template>
    <div v-if="!userStore.isLogin || !userStore.id">
        <el-empty description="You have not logged in yet." />
    </div>
    <div v-else>
        <el-descriptions title="My Information" :column="2" border>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        Username
                    </div>
                </template>
                {{ userStore.username }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        Gender
                    </div>
                </template>
                Male
            </el-descriptions-item>
        </el-descriptions>

        <div>
            <el-collapse v-model="activeNames">
                <!-- My Created Votes -->
                <el-collapse-item title="My Created Votes" name="1">
                    <el-scrollbar>
                        <el-table :data="myCreatedVotes" stripe style="width: 100%">
                            <el-table-column prop="title" label="Title" />
                            <el-table-column prop="description" label="Description" />
                        </el-table>
                    </el-scrollbar>
                </el-collapse-item>

                <!-- My Participated Votes -->
                <el-collapse-item title="My Polls" name="2">
                    <el-scrollbar>
                        <p v-for="vote in myCreatedVotes" :key="vote.id">
                            {{ vote.title }}
                        </p>
                    </el-scrollbar>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>