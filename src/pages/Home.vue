<template>
  <div class="@container px-7 py-10">
    <ButtonRow class="mb-4" v-model="currentFilter"></ButtonRow>
    <Loader v-if="!tasks" class="p-10"></Loader>
    <TaskList v-if="tasks" :tasks="filteredTasks" class="mb-3"></TaskList>
    <AddTask></AddTask>
  </div>
</template>

<script setup>
import TaskList from '@/components/TaskList.vue'
import ButtonRow from '@/components/ButtonRow.vue'
import Loader from '@/components/Loader.vue'
import AddTask from '@/components/AddTask.vue'
import { useTaskStore } from '@/stores/task'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const taskStore = useTaskStore()
const { tasks, currentFilter, filteredTasks } = storeToRefs(taskStore)

onMounted(async () => {
  await taskStore.loadTasks()
})
</script>

<style></style>
