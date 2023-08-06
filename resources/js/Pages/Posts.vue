<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';

// import Sidebar from '@/Components/Sidebar.vue';
import Header from '@/Components/Header.vue';
import ModalBlank from '@/Components/ModalBlank.vue';
import ModalBasic from '@/Components/ModalBasic.vue'
import PaginationClassic from '@/Components/PaginationClassic.vue';


// Import 'defineProps' from Vue to access the 'data' prop
import { reactive, onMounted, ref, computed } from 'vue';

import { Inertia } from '@inertiajs/inertia';

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
  createPostModal.value = false; // Close the modal after deleting
};

const createPostModal = ref(false)

// delete
// function destroy(id) {
//   if (confirm("Are you sure you want to Delete")) {
//     form.delete(route('posts.destroy', id));
//   }
// }
// Define a reactive property to track if the delete modal is open
const dangerModalOpen = ref(false);

let postIdToDelete = null; // Store the post ID to delete
let postTitleToDelete = null; // Store the post ID to delete

let modalPost = ref({
  id: null,
  title: ''
});

// Function to open the delete modal and store the post ID
function openDeleteModal(postId, postTitle) {
  dangerModalOpen.value = true; // Open the modal
  // postTitleToDelete = postTitle; // Store the post ID
  // postIdToDelete = postId; // Store the post ID
  modalPost.value.id = postId;
  modalPost.value.title = postTitle;
}

// Function to delete the post
function deletePost() {
  console.log('Deleting post:', modalPost.value.id);
  if (modalPost.value.id) {
    form.delete(route('posts.destroy', modalPost.value.id)).then(() => {
      fetchData(); // Refresh the data
      dangerModalOpen.value = false; // Close the modal after deleting
    }).catch(error => {
      console.error('Error deleting post:', error);
    });
  }
}

function closeDeleteModal() {
  dangerModalOpen.value = false;
}

function deletePostAndCloseModal() {
  deletePost(); // Delete the post
  closeDeleteModal(); // Close the modal
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

// const sidebarOpen = ref(true)
</script>

<!-- <template>
  <AppLayout title="Posts">
    <template #header>
      <div class="flex justify-between">
        <div class="flex items-center">
          <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Post
          </h2>

        </div>
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg text-white">
          <TextInput id="title" v-model="searchQuery" type="text" class="mt-1 block w-full"
            placeholder="Search Posts..." />
        </div>
      </div>
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

   

    <div v-for="post in filteredPosts" :key="post.id">
      <div class="max-w-7xl mx-auto p-6 lg:p-8">
        <div class="mt-16 mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-1 gap-6 lg:gap-8">
            <div
              class="scale-100 p-6 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
              <div class="w-full">
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
            </div>
          </div>
        </div>
      </div>

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
          </div>
        </div>
      </teleport>

    </div>
  </AppLayout>
</template> -->

<template>
  <div class="flex h-[100dvh] overflow-hidden">

    <!-- Sidebar -->

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">

      <!-- Site header -->
      <Header />

      <main class="grow">
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Your Post ✨</h1>
            </div>

            <!-- Right: Actions -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

              <!-- Add board button -->
              <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" aria-controls="feedback-modal"
                @click.stop="createPostModal = true">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path
                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="ml-2">Add Post</span>
              </button>
              <ModalBasic id="feedback-modal" :modalOpen="createPostModal" @close-modal="createPostModal = false"
                title="Send New Post">
                <form @submit.prevent="submit">

                  <!-- Modal content -->
                  <div class="px-5 py-4">
                    <div class="text-sm">
                      <div class="font-medium text-slate-800 dark:text-slate-100 mb-3">Let us know what you think 🙌</div>
                    </div>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-sm font-medium mb-1 text-slate-400" for="name">title <span
                            class="text-rose-500">*</span></label>
                        <input id="title" class="form-input w-full px-2 py-1 bg-dark border-dark" type="text" required v-model="form.title" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium mb-1 text-slate-400" for="feedback">Message <span
                            class="text-rose-500">*</span></label>
                        <textarea id="feedback" class="form-textarea w-full px-2 py-1 bg-dark border-dark" rows="4"
                          required v-model="form.body"></textarea>
                      </div>
                    </div>
                  </div>
                  <!-- Modal footer -->
                  <div class="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                    <div class="flex flex-wrap justify-end space-x-2">
                      <button
                        class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                        @click.stop="createPostModal = false">Cancel</button>
                      <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" type="submit">Send</button>
                    </div>
                  </div>
                </form>
              </ModalBasic>

            </div>

          </div>

          <div class="border-t border-slate-200 dark:border-slate-700">
            <div class="max-w-3xl m-auto mt-8">

              <!-- Filters -->

              <!-- Posts -->
              <div class="">
                <!-- Read Post -->
                <article class="pt-6" v-for="post in filteredPosts" :key="post.id">
                  <div class="xl:flex">
                    <div class="w-32 shrink-0">
                      <div class="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 xl:leading-8">{{
                        formatDate(post.created_at) }} , {{ formatTime(post.created_at) }}</div>
                    </div>
                    <div class="grow pb-6 border-b border-slate-200 dark:border-slate-700">
                      <header>
                        <div class="flex justify-between">
                          <div>
                            <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-3">{{ post.title }}</h2>
                            <div class="flex flex-nowrap items-center space-x-2 mb-4">
                              <div class="flex items-center">
                                <a class="block mr-2 shrink-0" href="#0">
                                  <img class="rounded-full border-2 border-white dark:border-slate-800 box-content"
                                    src="../../images/defaultdark.jpg" width="32" height="32" alt="User 04" />
                                </a>
                                <a class="block text-sm font-semibold text-slate-800 dark:text-slate-100" href="#0">
                                  {{ post.user.name }}
                                </a>
                              </div>
                              <div class="text-slate-400 dark:text-slate-600">·</div>
                            </div>
                          </div>
                          <div>

                            <div class="m-1.5">
                              <!-- Start -->
                              <div class="flex flex-wrap -space-x-px">
                                <button
                                  class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                                  @click="editPost(post)">
                                  <svg class="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 shrink-0"
                                    viewBox="0 0 16 16">
                                    <path
                                      d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                                  </svg>
                                  <span class="ml-2">Edit Content</span>
                                </button>
                                <button
                                  class="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-rose-500"
                                  @click.stop="openDeleteModal(post.id, post.title)">
                                  <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                                    <path
                                      d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                                  </svg>
                                  <span class="ml-2">Delete</span>
                                </button>
                              </div>
                              <!-- End -->
                            </div>

                          </div>
                        </div>

                      </header>
                      <div class="space-y-3 text-slate-500">
                        <p>{{ post.body }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- end post -->


                  <!-- modal delete -->
                  <ModalBlank id="danger-modal" :modalOpen="dangerModalOpen" @close-modal="closeDeleteModal">
                    <div class="p-5 flex space-x-4">
                      <!-- Icon -->
                      <div
                        class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100 dark:bg-rose-500/30">
                        <svg class="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
                          <path
                            d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                        </svg>
                      </div>
                      <!-- Content -->
                      <div class="w-moz-available">
                        <!-- Modal header -->
                        <div class="mb-2">
                          <div class="text-lg font-semibold text-slate-800 dark:text-slate-100">Delete Post {{
                            modalPost.title }} ?</div>
                        </div>
                        <!-- Modal content -->
                        <div class="text-sm mb-10">
                          <div class="space-y-2 text-slate-500">
                            <p>Are You Sure Want To Delete It ?</p>
                          </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex flex-wrap justify-end space-x-2">
                          <button
                            class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                            @click.stop="closeDeleteModal">Cancel</button>
                          <button class="btn-sm bg-rose-500 hover:bg-rose-600 text-white"
                            @click="deletePostAndCloseModal">Yes, Delete it</button>
                        </div>
                      </div>
                    </div>
                  </ModalBlank>


                </article><!-- end for data -->
              </div>

              <!-- Pagination -->
              <div class="xl:pl-32  mt-6">
                <PaginationClassic />
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>

  </div>
</template>