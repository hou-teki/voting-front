<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { ElMessage } from 'element-plus';

const userStore = useAuthStore()

const onLogout = () => {
    userStore.clearUser()
    ElMessage.success('Logged out successfully')
}
</script>

<template>
    <el-affix>
        <el-header class="header">
            <el-menu mode="horizontal" :ellipsis="false" router :default-active="$route.path" class="menu">
                <!-- Title -->
                <el-menu-item>
                    <h1>Voting App</h1>
                </el-menu-item>

                <!-- Navigation -->
                <el-menu-item index="/votes">Vote List</el-menu-item>
                <el-menu-item index="/new">New Vote</el-menu-item>
                <el-menu-item index="/me">My Page</el-menu-item>

                <!-- User Info -->
                <template v-if="userStore.isLogin">
                    <el-sub-menu index="user">
                        <template #title>Hi, {{ userStore.username }}</template>
                        <div class="el-menu-item" @click.stop.prevent="onLogout">Log Out</div>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item index="/login">Log In</el-menu-item>
                    <el-menu-item index="/signup">Sign Up</el-menu-item>
                </template>
            </el-menu>
        </el-header>
    </el-affix>
</template>

<style scoped>
.el-menu--horizontal>.el-menu-item:nth-child(4) {
    margin-right: auto;
}
</style>