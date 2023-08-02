<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';


// Import 'defineProps' from Vue to access the 'data' prop
import { defineProps, reactive, onMounted, ref, computed } from 'vue';

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
      <div class="flex justify-between">
        <div class="flex items-center">
          <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Post
          </h2>

        </div>
        <!-- Search bar -->
        <!-- <div class="py-12"> -->
        <!-- <div class="max-w-7xl mx-auto sm:px-6 lg:px-8"> -->
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg text-white">
          <TextInput id="title" v-model="searchQuery" type="text" class="mt-1 block w-full"
            placeholder="Search Posts..." />
        </div>
      </div>
      <!-- </div> -->
      <!-- </div> -->
    </template>

    <div class="max-w-7xl py-12 sm:px-6 lg:px-8 mt-5 mx-auto bg-gray-800 p-6 rounded shadow-md">
      <h2 class="text-2xl font-semibold mb-4 text-white">Make Post</h2>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block text-gray-300 font-semibold mb-1" for="title">Title :</label>
          <input class="w-full border rounded py-2 px-3 bg-gray-700 text-white" type="text" id="title" name="name"
            placeholder="Your Title" v-model="form.title" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-300 font-semibold mb-1" for="body">Content :</label>
          <textarea class="w-full border rounded py-2 px-3 bg-gray-700 text-white" id="body" name="body" rows="4"
            placeholder="Your Content" v-model="form.body" required></textarea>
        </div>
        <div class="flex justify-between">
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            type="submit">Submit</button>
          <button class="bg-gray-600 hover:bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded"
            type="reset">Reset</button>
        </div>
      </form>
    </div>

    <!-- read data -->

    <div v-for="post in filteredPosts" :key="post.id">
      <div class="max-w-7xl mx-auto p-6 lg:p-8">
        <div class="mt-16 mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-1 gap-6 lg:gap-8">
            <div
              class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
              <div class="w-full">
                <!-- <div class="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-7 h-7 stroke-red-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div> 
                              
                              -->
                <div class="flex justify-between">

                  <div>
                    <h2 class="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                      {{ post.title }}
                    </h2>
                  </div>

                  <div class="text-white">
                    <Dropdown align="right" width="48">
                      <template #trigger>
                        <span class="inline-flex rounded-md">
                          <button type="button"
                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150">
                            Actions

                            <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          </button>
                        </span>
                      </template>

                      <template #content>
                        <div class="block px-4 py-2 text-xs text-gray-400">
                          Manage Post
                        </div>

                        <div
                          class="block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                          @click="editPost(post)">
                          Edit
                        </div>
                        <div
                          class="block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                          @click="destroy(post.id)">
                          Delete
                        </div>
                      </template>
                    </Dropdown>
                  </div>
                </div>
                <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {{ post.body }}
                </p>
                <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm flex justify-between leading-relaxed">
                <div>
                  {{ post.user.name }}
                </div>
                <div>
                  {{ formatDate(post.created_at) }}
                </div>
                </p>
              </div>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Edit -->
      <!-- Edit Modal -->
      <teleport to="body">
        <div v-if="editedPost.id !== null" class="fixed inset-0 flex items-center justify-center">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-1/2">
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300 ">Edit Post</h3>


            <div v-if="editedPost.id !== null"
              class="max-w-7xl sm:px-6 lg:px-8 mt-5 mx-auto bg-gray-800 p-6 rounded shadow-md">
              <form @submit.prevent="updatePost">
                <div class="mb-4">
                  <label class="block text-gray-300 font-semibold mb-1" for="title">Title :</label>
                  <input class="w-full border rounded py-2 px-3 bg-gray-700 text-white" type="text" name="name"
                    placeholder="Your Title" id="edit-title" v-model="editedPost.title" required>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-300 font-semibold mb-1" for="body">Content :</label>
                  <textarea class="w-full border rounded py-2 px-3 bg-gray-700 text-white" id="body" name="body" rows="4"
                    placeholder="Your Content" v-model="editedPost.body" required></textarea>
                </div>
                <div class="flex justify-between">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    type="submit">Submit</button>
                  <button class="bg-gray-600 hover:bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded"
                    @click="closeModal">Cancel</button>
                </div>
              </form>

            </div>


            <!-- <div class="mb-4">
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
              </div> -->
          </div>
        </div>
      </teleport>

    </div>
  </AppLayout>
</template>