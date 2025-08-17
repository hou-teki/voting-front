<script setup lang="ts">
import { login } from '@/apis/users';
import { useUserStore } from '@/stores/userStore';
import type { LoginRequest } from '@/types/user';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive<LoginRequest>({
    username: '',
    password: ''
})

const loading = ref(false)

const onSubmit = async () => {
    loading.value = true
    try {
        const res = await login(form)

        useUserStore().setUser(res)
        ElMessage.success('Login successful')
        router.push('/votes')
    } catch (error) {
        console.error('Login failed:', error)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <el-card>
        <h1>Log In</h1>
        <el-form :model="form">
            <!-- Username -->
            <el-form-item>
                <el-input v-model="form.username" placeholder="Username" />
            </el-form-item>
            <!-- Password -->
            <el-form-item>
                <el-input type="password" v-model="form.password" placeholder="Password" />
            </el-form-item>
            <!-- Button -->
            <el-button type="primary" @click="onSubmit">Login</el-button>
        </el-form>
    </el-card>
</template>