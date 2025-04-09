<template>
  <div class="flex justify-center items-center">
    <button
      class="bg bg-accent text-white px-7 py-2 rounded-xl cursor-pointer transition hover:opacity-80 active:opacity-75"
      @click="toggleModal()"
    >
      Add task
    </button>
    <teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <div @click.self="isModalOpen = false" class="absolute inset-0 bg-black opacity-25"></div>

        <!-- Контент модалки -->
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">Создание задачи</h3>
            <button
              class="text-xl text-medium text-gray-400 hover:text-red-500 active:text-red-500 transition-colors duration-200 cursor-pointer"
              @click="isModalOpen = false"
            >
              x
            </button>
          </div>
          <div class="mb-6">
            <form @submit.prevent="addTask()">
              <div class="flex flex-col gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Title"
                  v-model="taskData.title"
                  class="w-full pl-2 pr-2 py-[6px] transition-all bg-transparent border-[1px] outline-0 border-input rounded-md hover:border-input-hover focus:border-accent active:outline-accent-blue placeholder:text-slate-400"
                />
                <input
                  type="text"
                  v-model="taskData.desc"
                  placeholder="Description"
                  class="w-full pl-2 pr-2 py-[6px] transition-all bg-transparent border-[1px] outline-0 border-input rounded-md hover:border-input-hover focus:border-accent active:outline-accent-blue placeholder:text-slate-400"
                />
                <VueDatePicker
                  :placeholder="'dsdsdsd'"
                  class="border-slate-300"
                  v-model="taskData.date"
                ></VueDatePicker>
              </div>
              <transition name="fade">
                <div v-if="taskDataError" class="bg-red-400 py-2 px-5 rounded-lg mb-2">
                  <span>Title is Empty</span>
                </div>
              </transition>

              <div class="flex justify-end space-x-3">
                <button
                  @click="isModalOpen = false"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800 transition cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-accent text-white rounded hover:opacity-85 transition cursor-pointer"
                >
                  Подтвердить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { onUnmounted, reactive, ref } from 'vue'
import { useTaskStore } from '@/stores/task'
import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()
const { tasks, currentFilter, filteredTasks } = storeToRefs(taskStore)

const isModalOpen = ref(false)

const taskDataError = ref(false)

const taskData = reactive({
  title: '',
  desc: '',
  date: null,
  done: false,
})

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
  taskDataError.value = false
}

const resetForm = () => {
  taskData.title = ''
  taskData.desc = ''
  taskData.date = null
  taskDataError.value = false
}

const addTask = () => {
  if (taskData.title) {
    taskStore.addTask(taskData)
    resetForm()
    isModalOpen.value = false
  } else {
    taskDataError.value = true
  }
}
</script>

<style scoped>
.dp__theme_light {
  --dp-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #54a8e5;
}
</style>
