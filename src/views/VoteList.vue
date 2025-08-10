<script setup lang="ts">
const votes = [
    {
        id: 1,
        title: 'Vote 1',
        description: 'Description for vote 1',
        creator: 'user123',
        startDate: '2025-01-01',
        endDate: '2026-01-31',
        status: 'active',
        totalCount: 30,
        options: [
            { id: 1, voteId: 1, label: 'Option 1', count: 20 },
            { id: 2, voteId: 1, label: 'Option 2', count: 10 }
        ]
    },
    {
        id: 2,
        title: 'Vote 2',
        description: 'Description for vote 2',
        creator: 'user123',
        startDate: '2025-01-01',
        endDate: '2026-01-31',
        status: 'active',
        totalCount: 30,
        options: [
            { id: 1, voteId: 2, label: 'Option 1', count: 20 },
            { id: 2, voteId: 2, label: 'Option 2', count: 10 }
        ]
    },
    {
        id: 3,
        title: 'Vote 3',
        description: 'Description for vote 3',
        creator: 'user123',
        startDate: '2025-01-01',
        endDate: '2026-01-31',
        status: 'active',
        totalCount: 30,
        options: [
            { id: 1, voteId: 3, label: 'Option 1', count: 20 },
            { id: 2, voteId: 3, label: 'Option 2', count: 10 }
        ]
    },
];
</script>

<template>
    <el-card v-for="vote in votes" :key="vote.id" shadow="hover">
        <template #header>
            <span>{{ vote.title }}</span>
        </template>
        <p>{{ vote.description }}</p>
        <div>
            <div v-for="option in vote.options" :key="option.id">
                <span>{{ option.label }}</span>
                <el-progress :stroke-width="24" :percentage="option.count" />
            </div>
        </div>
    </el-card>
</template>