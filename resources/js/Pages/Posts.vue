<script setup>

// import Sidebar from '@/Components/Sidebar.vue';
import Header from '@/Components/Header.vue';
import ModalBlank from '@/Components/ModalBlank.vue';
import ModalBasic from '@/Components/ModalBasic.vue'
import PaginationClassic from '@/Components/PaginationClassic.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { reactive, onMounted, ref, computed } from 'vue';
import { Inertia } from '@inertiajs/inertia';
import TextInput from '@/Components/TextInput.vue';




// Import 'defineProps' from Vue to access the 'data' prop
// Define the 'data' prop
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

// Create
const createPostModal = ref(false)
const form = useForm({
  title: '',
  body: '',
});

const submit = () => {
  form.post(route('posts.store'));
  createPostModal.value = false; // Close the modal after deleting
};


// delete
// Define a reactive property to track if the delete modal is open
const dangerModalOpen = ref(false);

let modalPost = ref({
  id: null,
  title: ''
});

// Function to open the delete modal and store the post ID
function openDeleteModal(postId, postTitle) {
  dangerModalOpen.value = true; // Open the modal
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
const editModalOpen = ref(false);

// Define the 'editedPost' reactive property to store the edited post data
const editedPost = ref({
  id: null,
  title: '',
  body: ''
});

function openEditModal(post) {
  editedPost.value.id = post.id;
  editedPost.value.title = post.title;
  editedPost.value.body = post.body;
  editModalOpen.value = true;
}
function closeEditModal() {
  editModalOpen.value = false;
}
function updatePostAndCloseModal() {
  // Implement your update post logic here

  let title = editedPost.value.title;
  let body = editedPost.value.body;

  console.log('id:', editedPost.value.id);
  console.log('title:', title);
  console.log('body:', body);

  // Send data
  Inertia.put(`/posts/${editedPost.value.id}`, {
    title: title,
    body: body
  }).then(() => {
    // After updating, close the modal
    closeEditModal();
  }).catch(error => {
    console.error('Error updating post:', error);
    // Handle the error here, such as displaying an error message to the user
  });
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
              <TextInput id="title" v-model="searchQuery" type="text" class="" placeholder="Search Posts..." />
              <!-- Add board button -->
              <button class="btn bg-indigo-500 hover:bg-indigo-600 text-white" aria-controls="create-post-modal"
                @click.stop="createPostModal = true">
                <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path
                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span class="ml-2">Add Post</span>
              </button>
              <ModalBasic id="create-post-modal" :modalOpen="createPostModal" @close-modal="createPostModal = false"
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
                        <input id="title" class="form-input w-full px-2 py-1 bg-dark border-dark" type="text" required
                          v-model="form.title" />
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
                                  aria-controls="create-post-modal" @click.stop="openEditModal(post)">
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
                  <!-- Modal edit -->
                  <ModalBasic id="edit-modal" :modalOpen="editModalOpen" @close-modal=" false" title="Edit Post">
                    <form @submit.prevent="updatePostAndCloseModal">

                      <!-- Modal content -->
                      <div class="px-5 py-4">
                        <div class="text-sm">
                          <div class="font-medium text-slate-800 dark:text-slate-100 mb-3">Edit Your Post Here
                          </div>
                        </div>
                        <div class="space-y-3">
                          <div>
                            <label class="block text-sm font-medium mb-1 text-slate-400" for="name">title <span
                                class="text-rose-500">*</span></label>
                            <input id="title" v-model="editedPost.title"
                              class="form-input w-full px-2 py-1 bg-dark border-dark" type="text" required />
                          </div>
                          <div>
                            <label class="block text-sm font-medium mb-1 text-slate-400" for="feedback">Message <span
                                class="text-rose-500">*</span></label>
                            <textarea id="feedback" v-model="editedPost.body"
                              class="form-textarea w-full px-2 py-1 bg-dark border-dark" rows="4" required></textarea>
                          </div>
                        </div>
                      </div>
                      <!-- Modal footer -->
                      <div class="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                        <div class="flex flex-wrap justify-end space-x-2">
                          <button
                            class="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                            @click.stop="editModalOpen = false">Cancel</button>
                          <button class="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" type="submit">Save</button>
                        </div>
                      </div>
                    </form>
                  </ModalBasic>


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