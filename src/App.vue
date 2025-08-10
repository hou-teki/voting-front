<script setup lang="ts"></script>

<template>
  <el-container class="layout">
    <el-header class="header">
      <h1>Voting App</h1>
      <el-menu mode="horizontal" router :default-active="$route.path" class="menu">
        <el-menu-item index="/votes">Vote List</el-menu-item>
        <el-menu-item index="/new">New Vote</el-menu-item>
        <el-menu-item index="/me">My Page</el-menu-item>
      </el-menu>
    </el-header>

    <el-main class="main">
      <el-row justify="center" :gutter="0">
        <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
          <router-view />
        </el-col>
      </el-row>
    </el-main>

    <el-footer class="footer">
      <p>© 2025 Voting App. All rights reserved.</p>
    </el-footer>
  </el-container>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

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

.main {
  flex: 1;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
