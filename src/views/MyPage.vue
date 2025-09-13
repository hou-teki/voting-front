<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

import { useUserStore } from '@/stores/userStore'
import { getMyCreatedVotes, getMyParticapedVotes, getMyProfile, updateMyProfile } from '@/apis/userApi'
import type { UserDto } from '@/types/user'
import type { VoteResponse } from '@/types/vote'

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

const userStore = useUserStore()


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
        const response = await getMyParticapedVotes(currentPageParticipated.value - 1, pageSizeParticipated.value)
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
        <el-descriptions title="My Profile" :column="2" border>
            <template #extra>
                <el-button type="primary" @click="dialogFormVisible = true">Update</el-button>
            </template>

            <el-descriptions-item>
                <template #label>Username</template>
                {{ myProfile.username }}
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>Gender</template>
                {{ myProfile.gender }}
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>Age Range</template>
                {{ ageRangeLabels[myProfile.ageRange] }}
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>Department</template>
                {{ myProfile.department }}
            </el-descriptions-item>
        </el-descriptions>

        <el-dialog v-model="dialogFormVisible" title="Update Profile" width="500">
            <el-form :model="myProfile">
                <el-form-item label="Gender" :label-width="formLabelWidth">
                    <el-radio-group v-model="myProfile.gender">
                        <el-radio value="MALE">Male</el-radio>
                        <el-radio value="FEMALE">Female</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="Age Range" :label-width="formLabelWidth">
                    <el-select v-model="myProfile.ageRange" placeholder="Please select a age range">
                        <el-option label="  ~19" value="TEEN" />
                        <el-option label="20~29" value="TWENTIES" />
                        <el-option label="30~39" value="THIRTIES" />
                        <el-option label="40~49" value="FORTIES" />
                        <el-option label="50~  " value="FIFTY_PLUS" />
                    </el-select>
                </el-form-item>

                <el-form-item label="Department" :label-width="formLabelWidth">
                    <el-input v-model="myProfile.department" autocomplete="off" />
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cancelUpdate">Cancel</el-button>
                    <el-button type="primary" @click="confirmUpdate">Confirm</el-button>
                </div>
            </template>
        </el-dialog>

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
                    <el-pagination layout="prev, pager, next" :page-count="totalCreated" :page-size="pageSizeCreated"
                        :current-page="currentPageCreated" @current-change="onCurrentChangeCreated" />
                </el-collapse-item>

                <!-- My Participated Votes -->
                <el-collapse-item title="My Polls" name="2">
                    <el-scrollbar>
                        <el-table :data="myParticipatedVotes" stripe style="width: 100%">
                            <el-table-column prop="title" label="Title" />
                            <el-table-column prop="description" label="Description" />
                            <el-table-column prop="options[0].label" label="My Choice" />
                        </el-table>
                        <el-pagination layout="prev, pager, next" :page-count="totalParticipated"
                            :page-size="pageSizeParticipated" :current-page="currentPageParticipated"
                            @current-change="onCurrentChangeParticipated" />
                    </el-scrollbar>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>