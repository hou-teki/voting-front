<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';

</script>

<template>
  <el-container class="container">
    <AppHeader />

    <el-main>
      <el-row justify="center" :gutter="0">
        <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
          <router-view />
        </el-col>
      </el-row>
    </el-main>

    <el-footer class="footer">
      <el-text type="info">© {{ new Date().getFullYear() }} Voting App. All rights reserved.</el-text>
    </el-footer>
  </el-container>
</template>

<style scoped>
.container {
  min-height: 100vh;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
