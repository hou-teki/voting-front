<script setup lang="ts">
import type { VoteResponse } from '@/types/vote'

const props = defineProps<{
  data: VoteResponse[]
  showMyChoice?: boolean
  pageCount: number
  pageSize: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const onCurrentChange = (p: number) => emit('page-change', p)
</script>

<template>
  <el-table :data="props.data" stripe style="width: 100%">
    <el-table-column prop="title" label="Title" />
    <el-table-column prop="description" label="Description" />

    <el-table-column v-if="props.showMyChoice" label="My Choice">
      <template #default="scope">
        {{ scope.row.options && scope.row.options.length > 0 ? scope.row.options[0].label : '' }}
      </template>
    </el-table-column>
  </el-table>
  <el-pagination layout="prev, pager, next" :page-count="props.pageCount" :page-size="props.pageSize"
    :current-page="props.currentPage" @current-change="onCurrentChange" />
</template>
