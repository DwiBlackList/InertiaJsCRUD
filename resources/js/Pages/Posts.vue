<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';

// Import 'defineProps' from Vue to access the 'data' prop
import { defineProps } from 'vue';

// Define the 'data' prop
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <AppLayout title="Posts">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        Post
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg text-white">


          <div v-for="post in data" :key="post.id">
            <p>ID : {{ post.id }}</p>
            <p>Title : {{ post.title }}</p>
            <p>Body : {{ post.body }}</p>
            <p>Create : {{ post.created_at }}</p>
            <!-- Display other properties as needed -->
          </div>

          
        </div>
      </div>
    </div>
  </AppLayout>
</template>