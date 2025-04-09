<template>
  <div
    class="flex items-end justify-between py-2 px-3 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer"
    @click="handleCardClick"
  >
    <div class="flex items-center space-x-3">
      <label class="custom-checkbox" @click.stop>
        <input type="checkbox" v-model="task.done" @change="taskStore.saveToLocalStorage()" />
        <span class="checkmark"></span>
      </label>
      <span
        class="text-lg transition-colors duration-200"
        :class="{
          'text-gray-600 line-through': task.done,
          'text-gray-800': !task.done,
        }"
      >
        {{ task.title }}
      </span>
    </div>
    <button
      class="text-xl text-medium text-gray-400 hover:text-red-500 active:text-red-500 transition-colors duration-200 cursor-pointer"
      @click.stop="taskStore.deleteTask(task.id)"
    >
      x
    </button>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/task'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  task: Object,
})

const handleCardClick = () => {
  router.push(`/task/${props.task.id}`)
}

const taskStore = useTaskStore()
</script>

<style scoped>
.custom-checkbox {
  display: block;
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  transition: all 0.2s ease;
  translate: 50% -50%;
}

.custom-checkbox:hover input ~ .checkmark {
  border-color: #9ca3af;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #54a8e5;
  border-color: #54a8e5;
}

.checkmark:after {
  content: '';
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.delete-btn {
  font-size: 24px;
  line-height: 1;
  padding: 2px 8px;
}

.delete-btn:hover {
  transform: scale(1.1);
}
</style>
