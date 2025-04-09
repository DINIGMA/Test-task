<template>
  <div class="flex flex-col border-1 border-slate-300 rounded-xl">
    <div v-for="task in tasks" :key="task.id">
      <TaskCard :task="task"></TaskCard>
    </div>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'

const props = defineProps({
  tasks: Array,
})
</script>

<style></style>
