import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || null)
  const currentFilter = ref('all')

  const loadTasks = async () => {
    try {
      if (!tasks.value) {
        const res = await fetch('/task.json')
        tasks.value = await res.json()
        saveToLocalStorage()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const filteredTasks = computed(() => {
    switch (currentFilter.value) {
      case 'finished':
        return tasks.value.filter((task) => task.done)
      case 'unfinished':
        return tasks.value.filter((task) => !task.done)
      default:
        return tasks.value
    }
  })

  const addTask = (newTask) => {
    const maxId = tasks.value.reduce((max, task) => (task.id > max ? task.id : max), 0)
    tasks.value.push({
      id: maxId + 1,
      ...newTask,
    })
    saveToLocalStorage()
  }

  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter((task) => task.id != taskId)
    saveToLocalStorage()
  }

  const toggleTaskDone = (taskId) => {
    const task = tasks.value.find((task) => task.id === taskId)
    if (task) {
      task.done = !task.done
      saveToLocalStorage()
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  return {
    tasks,
    loadTasks,
    deleteTask,
    saveToLocalStorage,
    filteredTasks,
    currentFilter,
    addTask,
    toggleTaskDone,
  }
})
