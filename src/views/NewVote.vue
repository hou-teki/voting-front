<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { VoteRequest } from '@/types/vote'
import { createVote } from '@/apis/voteApi'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// do not use same name with ref
const form: VoteRequest = reactive({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    options: ['', ''],
})

const onSubmit = async () => {
    if (!userStore.isLogin || !userStore.id) {
        ElMessage.error('User not logged in')
        return
    }

    try {
        await createVote(form)
        ElMessage.success('Vote created successfully')
        clearForm()
    } catch (error) {
        ElMessage.error('Failed to create vote')
    }
}

function addOption() {
    form.options.push('')
}

function removeOption(index: number) {
    if (form.options.length <= 2) return // at least 2 options required
    form.options.splice(index, 1)
}

function clearForm() {
    form.title = ''
    form.description = ''
    form.startDate = ''
    form.endDate = ''
    form.options = ['', '']
}
</script>

<template>
    <el-card>
        <el-form :model="form" label-width="100px">
            <!-- title -->
            <el-form-item label="Vote title">
                <el-input v-model="form.title" />
            </el-form-item>

            <!-- description -->
            <el-form-item label="Description">
                <el-input v-model="form.description" type="textarea" />
            </el-form-item>

            <!-- start date and end date -->
            <el-form-item label="Activity time">
                <el-col :span="6">
                    <el-date-picker v-model="form.startDate" type="date" placeholder="Start date" style="width: 100%" />
                </el-col>
                <el-col :span="1">-</el-col>
                <el-col :span="6">
                    <el-date-picker v-model="form.endDate" type="date" placeholder="End date" style="width: 100%" />
                </el-col>
            </el-form-item>

            <!-- Options -->
            <el-form-item label="Options">
                <el-space direction="vertical" alignment="start">
                    <div v-for="(opt, idx) in form.options" :key="idx">
                        <el-form-item :prop="`options.${idx}`">
                            <el-input v-model="form.options[idx]" :placeholder="`Option ${idx + 1}`" clearable />
                        </el-form-item>

                        <el-button type="danger" @click="removeOption(idx)"
                            :disabled="form.options.length <= 2">Delete</el-button>
                    </div>

                    <el-button type="success" @click="addOption">Add Option</el-button>
                </el-space>
            </el-form-item>
        </el-form>

        <!-- confirm button -->
        <template #footer>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="clearForm">Clear</el-button>
        </template>

    </el-card>
</template>