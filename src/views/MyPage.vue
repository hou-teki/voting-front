<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

import { useAuthStore } from '@/stores/authStore'
import { getMyCreatedVotes, getMyParticipatedVotes, getMyProfile, updateMyProfile } from '@/apis/userApi'
import type { UserDto } from '@/types/user'
import type { VoteResponse } from '@/types/vote'

import ProfileDescriptions from '@/components/ProfileDescriptions.vue'
import ProfileEditDialog from '@/components/ProfileEditDialog.vue'
import VotesTable from '@/components/VotesTable.vue'

const formLabelWidth = '140px'

const ageRangeLabels: Record<string, string> = {
    TEEN: "~19",
    TWENTIES: "20~29",
    THIRTIES: "30~39",
    FORTIES: "40~49",
    FIFTY_PLUS: "50+"
}

const activeNames = ref(['1', '2'])


const myProfile: UserDto = reactive({
    id: 0,
    username: 'Not Set',
    gender: 'Not Set',
    ageRange: 'Not Set',
    department: 'Not Set'
})

const myCreatedVotes = ref<VoteResponse[]>([])
const myParticipatedVotes = ref<VoteResponse[]>([])

const currentPageCreated = ref(1)
const pageSizeCreated = ref(4)
const totalCreated = ref(0)

const currentPageParticipated = ref(1)
const pageSizeParticipated = ref(4)
const totalParticipated = ref(0)

const loading = ref(false)
const dialogFormVisible = ref(false)

const userStore = useAuthStore()


onMounted(async () => {
    if (!userStore.isLogin || !userStore.id) {
        return
    }

    fetchMyProfile()
    fetchMyCreatedVotes()
    fetchMyParticipatedVotes()
})

// User Profile Functions
const cancelUpdate = async () => {
    fetchMyProfile()
    dialogFormVisible.value = false
}

const confirmUpdate = async () => {
    try {
        await updateMyProfile(myProfile)
        ElMessage.success('Profile updated successfully')
        dialogFormVisible.value = false
    } catch (error) {
        ElMessage.error('Failed to update profile')
    }
}

const fetchMyProfile = async () => {
    loading.value = true
    try {
        const response = await getMyProfile()

        myProfile.username = response.username
        myProfile.gender = response.gender
        myProfile.ageRange = response.ageRange
        myProfile.department = response.department
    } catch (error) {
        ElMessage.error('Failed to fetch profile.')
    } finally {
        loading.value = false
    }
}

// Votes Functions
const fetchMyCreatedVotes = async () => {
    loading.value = true
    try {
        const response = await getMyCreatedVotes(currentPageCreated.value - 1, pageSizeCreated.value)
        myCreatedVotes.value = response.content
        totalCreated.value = response.totalPages
    } catch (error) {
        ElMessage.error('Failed to fetch created votes.')
    } finally {
        loading.value = false
    }
}

const fetchMyParticipatedVotes = async () => {
    loading.value = true
    try {
        const response = await getMyParticipatedVotes(currentPageParticipated.value - 1, pageSizeParticipated.value)
        myParticipatedVotes.value = response.content
        totalParticipated.value = response.totalPages
    } catch (error) {
        ElMessage.error('Failed to fetch participated votes.')
    } finally {
        loading.value = false
    }
}

const onCurrentChangeCreated = (page: number) => {
    currentPageCreated.value = page
    fetchMyCreatedVotes()
}

const onCurrentChangeParticipated = (page: number) => {
    currentPageParticipated.value = page
    fetchMyParticipatedVotes()
}

</script>

<template>
    <div v-if="!userStore.isLogin || !userStore.id">
        <el-empty description="You have not logged in yet." />
    </div>
    <div v-else>
        <ProfileDescriptions :my-profile="myProfile" :age-range-labels="ageRangeLabels">
            <template #extra>
                <el-button type="primary" @click="dialogFormVisible = true">Update</el-button>
            </template>
        </ProfileDescriptions>

        <ProfileEditDialog v-model="dialogFormVisible" :my-profile="myProfile" :form-label-width="formLabelWidth"
            @cancel="cancelUpdate" @confirm="confirmUpdate" />

        <div>
            <el-collapse v-model="activeNames">
                <!-- My Created Votes -->
                <el-collapse-item title="My Created Votes" name="1">
                    <VotesTable :data="myCreatedVotes" :page-count="totalCreated" :page-size="pageSizeCreated"
                        :current-page="currentPageCreated" @page-change="onCurrentChangeCreated" />
                </el-collapse-item>

                <!-- My Participated Votes -->
                <el-collapse-item title="My Polls" name="2">
                    <VotesTable :data="myParticipatedVotes" :show-my-choice="true" :page-count="totalParticipated"
                        :page-size="pageSizeParticipated" :current-page="currentPageParticipated"
                        @page-change="onCurrentChangeParticipated" />
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
