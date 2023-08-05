<script setup>
import { Head, Link } from '@inertiajs/vue3';
import PaginationClassic from '@/Components/PaginationClassic.vue';
import { defineProps } from 'vue';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
    data: Array,
});

// const props = defineProps({
//   canLogin: Boolean,
//   canRegister: Boolean,
//   laravelVersion: String,
//   phpVersion: String,
//   data: Object,
//   // Add pagination props
//   currentPage: Number,
//   lastPage: Number,
//   perPage: Number,
//   total: Number,
//   // ... other pagination-related props
// });

// // Define any reactive variables or methods here

// // Define your methods here
// const fetchData = (page) => {
//   // Fetch paginated data from the server using Inertia.js
//   this.$inertia.get(route("your.route.name"), { page: page });
// };

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
    <Head title="Welcome" />
    <!-- nav bar -->
    <div
        class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        <div v-if="canLogin" class="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10">
            <Link v-if="$page.props.auth.user" :href="route('dashboard')"
                class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
            Dashboard</Link>

            <template v-else>
                <Link :href="route('login')"
                    class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Log in</Link>

                <Link v-if="canRegister" :href="route('register')"
                    class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Register</Link>
            </template>
        </div>
        <!-- end of navbar-->

        <!-- Content area -->
        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <!-- Site header -->
            <!-- Page header -->
            <div class="sm:flex sm:justify-between sm:items-center mb-8">

                <!-- Left: Title -->
                <div class="mb-4 sm:mb-0">
                    <h1 class="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Post ✨</h1>
                </div>

                <!-- Right: Actions -->
                <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                    <!-- Add board button -->

                </div>

            </div>
            <main class="grow">
                <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <div class="">
                        <div class="max-w-3xl m-auto mt-8">
                            <!-- Posts -->
                            <div class="xl:-translate-x-16">
                                <!-- Post -->
                                <article class="pt-6" v-for="post in data" :key="post.id">
                                    <div class="xl:flex">
                                        <div class="w-32 shrink-0">
                                            <div
                                                class="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 xl:leading-8">
                                                {{ formatDate(post.created_at) }} , {{ formatTime(post.created_at) }}</div>
                                        </div>
                                        <div class="grow pb-6 border-b border-slate-200 dark:border-slate-700">
                                            <header>
                                                <h2 class="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-3">
                                                    {{ post.title }}</h2>
                                                <div class="flex flex-nowrap items-center space-x-2 mb-4">
                                                    <div class="flex items-center">
                                                        <a class="block mr-2 shrink-0" href="#0">
                                                            <img class="rounded-full border-2 border-white dark:border-slate-800 box-content"
                                                                src="../../images/defaultdark.jpg" width="32" height="32" alt="User 04" />
                                                        </a>
                                                        <a class="block text-sm font-semibold text-slate-800 dark:text-slate-100"
                                                            href="#0">
                                                            {{ post.user.name }}
                                                        </a>
                                                    </div>
                                                    <div class="text-slate-400 dark:text-slate-600">·</div>
                                                    <div>
                                                        <!-- <div
                                                            class="text-xs inline-flex font-medium bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400 rounded-full text-center px-2.5 py-1">
                                                            Product</div> -->
                                                    </div>
                                                </div>
                                            </header>
                                            <div class="space-y-3 text-slate-400 dark:text-slate-500">
                                                <p>{{ post.body }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>

                            <!-- Pagination -->
                            <div class="xl:pl-32 xl:-translate-x-16 mt-6">
                                <PaginationClassic />
                            </div>

                        </div>
                    </div>

                </div>
            </main>

        </div>
    </div>
</template>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}

@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
