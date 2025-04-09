<template>
  <div class="w-fit mx-auto">
    <div class="flex flex-wrap items-center justify-center r-all font-medium">
      <div class="text-center">
        <input
          checked
          type="radio"
          name="toggle"
          id="1"
          class="hidden"
          value="all"
          v-model="modelValue"
        />
        <label class="radio-label px-2 rounded-md w-full block cursor-pointer" for="1"
          >All tasks</label
        >
      </div>
      <div class="text-center">
        <input
          type="radio"
          name="toggle"
          id="2"
          class="hidden"
          value="finished"
          v-model="modelValue"
        />
        <label class="radio-label px-2 rounded-md w-full block cursor-pointer" for="2"
          >Finished</label
        >
      </div>
      <div class="text-center">
        <input
          type="radio"
          name="toggle"
          id="3"
          class="hidden"
          value="unfinished"
          v-model="modelValue"
        />
        <label class="radio-label px-2 rounded-md w-full block cursor-pointer" for="3"
          >Unfinished</label
        >
      </div>
    </div>
    <div class="border-t-2 w-full mt-2 border-slate-300"></div>
  </div>
</template>

<script setup>
const modelValue = defineModel()
</script>

<style scoped>
.active {
  background-color: #54a8e5;
}
.radio-label {
  transition: 0.2s;
  user-select: none;
}

input[type='radio']:checked + label {
  background-color: #54a8e5;
  color: #fff;
}
</style>
