<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';

</script>

<template>
  <el-container class="layout">
    <AppHeader />

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

.main {
  flex: 1;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
