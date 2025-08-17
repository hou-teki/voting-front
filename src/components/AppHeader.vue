<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()

import { ElMessage } from 'element-plus';

const onLogout = () => {
    userStore.clearUser()
    ElMessage.success('Logged out successfully')
}

</script>

<template>
    <el-affix>
        <el-header class="header">
            <!-- Title -->
            <h1>Voting App</h1>
            <!-- Navigation -->
            <el-menu mode="horizontal" router :default-active="$route.path" class="menu">
                <el-menu-item index="/votes">Vote List</el-menu-item>
                <el-menu-item index="/new">New Vote</el-menu-item>
                <el-menu-item index="/me">My Page</el-menu-item>
            </el-menu>
            <!-- User Info -->
            <div v-if="userStore.isLogin">
                <span>Hi, {{ userStore.username }}</span>
                <el-button type="primary" @click="onLogout">Log Out</el-button>
            </div>
            <div v-else>
                <router-link to="/signup"><el-button type="primary" plain>Sign Up</el-button></router-link>
                <router-link to="/login"><el-button type="primary">Log In</el-button></router-link>
            </div>
        </el-header>
    </el-affix>
</template>

<style scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid var(--el-border-color);
    display: flex;
}

.menu {
    margin-left: 24px;
    flex: 1;
}
</style>