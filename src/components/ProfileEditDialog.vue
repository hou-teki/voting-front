<script setup lang="ts">
import type { UserDto } from '@/types/user'

const props = defineProps<{
  modelValue: boolean
  myProfile: UserDto
  formLabelWidth?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const close = () => emit('update:modelValue', false)
const onCancel = () => emit('cancel')
const onConfirm = () => emit('confirm')
</script>

<template>
  <el-dialog :model-value="props.modelValue" title="Update Profile" width="500" @close="onCancel">
    <el-form :model="props.myProfile">
      <el-form-item label="Gender" :label-width="props.formLabelWidth || '140px'">
        <el-radio-group v-model="props.myProfile.gender">
          <el-radio value="MALE">Male</el-radio>
          <el-radio value="FEMALE">Female</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Age Range" :label-width="props.formLabelWidth || '140px'">
        <el-select v-model="props.myProfile.ageRange" placeholder="Please select a age range">
          <el-option label="  ~19" value="TEEN" />
          <el-option label="20~29" value="TWENTIES" />
          <el-option label="30~39" value="THIRTIES" />
          <el-option label="40~49" value="FORTIES" />
          <el-option label="50~  " value="FIFTY_PLUS" />
        </el-select>
      </el-form-item>

      <el-form-item label="Department" :label-width="props.formLabelWidth || '140px'">
        <el-input v-model="props.myProfile.department" autocomplete="off" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onConfirm">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>
