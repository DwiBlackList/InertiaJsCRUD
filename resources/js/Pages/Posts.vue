<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';

// Import 'defineProps' from Vue to access the 'data' prop
import { defineProps, reactive, onMounted , ref , computed } from 'vue';

import { Inertia } from '@inertiajs/inertia'

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
  form.post(route('posts.store'));
};

// delete
function destroy(id) {
  if (confirm("Are you sure you want to Delete")) {
    form.delete(route('posts.destroy', id));
  }
}

// edit
// Define the 'editedPost' reactive property to store the edited post data
const editedPost = reactive({
  id: null,
  title: '',
  body: '',
});

// Function to open the modal for editing a post
function editPost(post) {
  editedPost.id = post.id;
  editedPost.title = post.title;
  editedPost.body = post.body;
}

function updatePost() {

  //define variable 
  let title = editedPost.title
  let body = editedPost.body

  //send data
  Inertia.put(`/posts/${editedPost.id}`, {
    title: title,
    body: body
  })

}

function closeModal() {
  editedPost.id = null;
  editedPost.title = '';
  editedPost.body = '';
}

// filter data
const searchQuery = ref('');

// Create a computed property to filter posts based on the search query
const filteredPosts = computed(() => {
  if (!searchQuery.value) {
    return props.data; // Return all posts if search query is empty
  }

  const query = searchQuery.value.toLowerCase();
  return props.data.filter(post => {
    return (
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
    );
  });
});

// Function to format the date as only the date
function formatDate(timestamp) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(timestamp).toLocaleDateString(undefined, options);
}

// Function to format the date as only the time
function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
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
    <!-- Search bar -->
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg text-white">
          <TextInput id="title" v-model="searchQuery" type="text" class="mt-1 block w-full" placeholder="Searc Posts..."/>
        </div>
      </div>
    </div>
    <!-- read data -->
    <div v-for="post in filteredPosts" :key="post.id">
      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg text-white">


            <p>ID : {{ post.id }}</p>
            <p>Title : {{ post.title }}</p>
            <p>Body : {{ post.body }}</p>
            <p>Date Created : {{ formatDate(post.created_at) }}</p>
            <p>Time Created : {{ formatTime(post.created_at) }}</p>
            <p>Created by : {{ post.user.name }}</p>

            <PrimaryButton @click="editPost(post)">Edit</PrimaryButton>
            <SecondaryButton @click="destroy(post.id)">Delete</SecondaryButton>

            <!-- Display other properties as needed -->


          </div>
        </div>
      </div>

      <!-- Modal Edit -->
      <!-- Edit Modal -->
      <teleport to="body">
        <div v-if="editedPost.id !== null" class="fixed inset-0 flex items-center justify-center">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300 ">Edit Post</h3>
            <form @submit.prevent="updatePost">
              <div class="mb-4">
                <label for="edit-title" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  Title
                </label>
                <input type="text" id="edit-title" v-model="editedPost.title" class="form-input mt-1 block w-full"
                  required />
              </div>
              <div class="mb-4">
                <label for="edit-body" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">
                  Body
                </label>
                <textarea id="edit-body" v-model="editedPost.body" class="form-textarea mt-1 block w-full" rows="4"
                  required></textarea>
              </div>
              <div class="flex items-center justify-end mt-4">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save Changes
                </button>
                <button type="button" class="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                  @click="closeModal">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </teleport>

    </div>
  </AppLayout>
</template>