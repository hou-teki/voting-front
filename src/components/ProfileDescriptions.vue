<script setup lang="ts">
import type { UserDto } from '@/types/user'

defineProps<{
  myProfile: UserDto
  ageRangeLabels: Record<string, string>
}>()
</script>

<template>
  <el-descriptions title="My Profile" :column="2" border>
    <template #extra>
      <slot name="extra" />
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
</template>
