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

import { Head, Link, useForm } from '@inertiajs/vue3';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

const form = useForm({
  title: '',
  body: '',
});

const submit = () => {
  form.post(route('posts.store'), {
    onFinish: () => form.reset('password', 'password_confirmation'),
  });
};


// delete
function destroy(id) {
    if (confirm("Are you sure you want to Delete")) {
        form.delete(route('posts.destroy', id));
    }
}
</script>

<template>
  <AppLayout title="Posts">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        Post
      </h2>
    </template>
    <!-- Post Data -->
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg text-white">
          <form @submit.prevent="submit">
            <div>
              <InputLabel for="title" value="Title" />
              <TextInput id="title" v-model="form.title" type="text" class="mt-1 block w-full" required />
              <InputError class="mt-2" :message="form.errors.title" />
            </div>

            <div class="mt-4">
              <InputLabel for="body" value="Body" />
              <TextInput id="body" v-model="form.body" type="text" class="mt-1 block w-full" required />
              <InputError class="mt-2" :message="form.errors.body" />
            </div>

            <div class="flex items-center mt-4">
              <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Post
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- read data -->
    <div v-for="post in data" :key="post.id">
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg text-white">


            <p>ID : {{ post.id }}</p>
            <p>Title : {{ post.title }}</p>
            <p>Body : {{ post.body }}</p>
            <p>Create : {{ post.created_at }}</p>
            
            <PrimaryButton><Link :href="route('posts.edit' , post.id)" class="">Edit</Link></PrimaryButton>
            <SecondaryButton @click="destroy(post.id)">Delete</SecondaryButton>
            
            <!-- Display other properties as needed -->
            
            
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>