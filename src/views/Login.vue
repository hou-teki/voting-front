<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { login } from '@/apis/authApi';
import { useAuthStore } from '@/stores/authStore';
import type { LoginRequest } from '@/types/user';

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

        useAuthStore().setUser(res.token, res.user)
        ElMessage.success('Login successful')
        router.push('/votes')
    } catch (error) {
        ElMessage.error('Login failed')
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
            <el-button type="primary" @click="onSubmit">Log In</el-button>
        </el-form>
    </el-card>
</template>