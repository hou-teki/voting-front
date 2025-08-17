<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import type { VoteForm } from '@/types/vote'
import { createVote } from '@/apis/votes'
import { useUserStore } from '@/stores/userStore'

let uid = 0
const newOption = () => ({
    id: ++uid,
    label: '',
})

const userStore = useUserStore()

// do not use same name with ref
const form = reactive({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    options: [newOption(), newOption()],
})

const formRef = ref<FormInstance>()

function addOption() {
    form.options.push(newOption())
}

function removeOption(index: number) {
    if (form.options.length <= 2) return // at least 2 options required
    form.options.splice(index, 1)
}

const onSubmit = async () => {
    if (!userStore.isLogin || !userStore.id) {
        ElMessage.error('User not logged in')
        return
    }

    try {
        const formWithCreatorId: VoteForm = { ...form, creatorId: userStore.id }
        await createVote(formWithCreatorId)
        ElMessage.success('Vote created successfully')
    } catch (error) {
        ElMessage.error('Failed to create vote')
    }
}
</script>

<template>
    <el-card>
        <el-form :model="form" label-width="100px">
            <el-form-item label="Vote title">
                <el-input v-model="form.title" />
            </el-form-item>

            <el-form-item label="Description">
                <el-input v-model="form.description" type="textarea" />
            </el-form-item>

            <el-form-item label="Activity time">
                <el-col :span="6">
                    <el-date-picker v-model="form.startDate" type="date" placeholder="Start date" style="width: 100%" />
                </el-col>
                <el-col :span="1">-</el-col>
                <el-col :span="6">
                    <el-date-picker v-model="form.endDate" type="date" placeholder="End date" style="width: 100%" />
                </el-col>
            </el-form-item>

            <el-form-item label="Options">
                <div v-for="(opt, idx) in form.options" :key="idx">
                    <el-form-item :prop="`options.${idx}.label`">
                        <el-input v-model="opt.label" :placeholder="`Option ${idx + 1}`" clearable />
                    </el-form-item>

                    <el-button type="danger" @click="removeOption(idx)"
                        :disabled="form.options.length <= 2">Delete</el-button>
                </div>

                <el-button type="primary" @click="addOption">Add Option</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Clear</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>