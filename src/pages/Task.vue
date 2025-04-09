<template>
  <div class="@container my-auto px-7">
    <div
      class="rounded-lg border-[1px] border-input hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div class="flex flex-col gap-3 p-6" v-if="currentTask">
        <span
          class="text-xl transition-colors duration-200"
          :class="{
            ' line-through': currentTask.done,
            'text-gray-800': !currentTask.done,
          }"
        >
          {{ currentTask.title }}
        </span>
        <p class="text-slate-500" v-if="currentTask?.desc">{{ currentTask?.desc }}</p>
        <div v-if="currentTask.date">
          <span class="bg-accent px-3 rounded-lg inline text-white">
            {{ formatDate(currentTask.date) }}
          </span>
        </div>
        <div class="flex justify-between items-center mt-4">
          <RouterLink to="/" class="text-slate-700 text-lg hover:text-slate-900">Назад</RouterLink>
          <button
            class="text-lg text-medium text-gray-400 hover:text-red-500 active:text-red-500 transition-colors duration-200 cursor-pointer"
            @click.stop="deleteTask(currentTask?.id)"
          >
            Удалить
          </button>
          <label class="custom-checkbox" @click.stop>
            <input type="checkbox" @change="taskStore.toggleTaskDone(currentTask.id)" />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/task'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const taskStore = useTaskStore()

const router = useRouter()

const { tasks } = storeToRefs(taskStore)

const props = defineProps({
  id: String,
})

const currentTask = computed(() => {
  if (tasks.value) {
    return tasks?.value.find((task) => task.id == props.id)
  }
})

function formatDate(stringDate) {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  const date = new Date(stringDate)

  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day} ${month} ${year}, ${hours}:${minutes}`
}

const deleteTask = (id) => {
  taskStore.deleteTask(id)
  router.push('/')
}

onMounted(async () => {
  if (!tasks.value) {
    taskStore.loadTasks()
  }
})
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
