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
    <el-descriptions title="My Information" :column="2" border>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    Username
                </div>
            </template>
            user123
        </el-descriptions-item>
        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    Employee ID
                </div>
            </template>
            1051
        </el-descriptions-item>
    </el-descriptions>

    <div>
        <el-collapse :v-model="['1', '2']">
            <el-collapse-item title="My Votes" name="1">
                <el-scrollbar>
                    <p v-for="vote in votes" :key="vote.id">
                        {{ vote.title }}
                    </p>
                </el-scrollbar>
            </el-collapse-item>

            <el-collapse-item title="My Polls" name="2">
                <el-scrollbar>
                    <p v-for="vote in votes" :key="vote.id">
                        {{ vote.title }}
                    </p>
                </el-scrollbar>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>