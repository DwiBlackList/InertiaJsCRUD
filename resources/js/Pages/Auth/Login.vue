<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import AuthenticationCard from '@/Components/AuthenticationCard.vue';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Checkbox from '@/Components/Checkbox.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

defineProps({
    canResetPassword: Boolean,
    status: String,
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.transform(data => ({
        ...data,
        remember: form.remember ? 'on' : '',
    })).post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <main class="font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 sidebar-expanded">

        <div class="relative flex">

            <!-- Content -->
            <div class="w-full md:w-1/2">
                <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
                    <div v-if="status" class="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                        {{ status }}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                            <!-- Logo -->
                            <router-link class="block" to="/">
                                <svg width="32" height="32" viewBox="0 0 32 32">
                                    <defs>
                                        <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                                            <stop stop-color="#A5B4FC" stop-opacity="0" offset="0%" />
                                            <stop stop-color="#A5B4FC" offset="100%" />
                                        </linearGradient>
                                        <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                                            <stop stop-color="#38BDF8" stop-opacity="0" offset="0%" />
                                            <stop stop-color="#38BDF8" offset="100%" />
                                        </linearGradient>
                                    </defs>
                                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                                    <path
                                        d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                                        fill="#4F46E5" />
                                    <path
                                        d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                                        fill="url(#logo-a)" />
                                    <path
                                        d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                                        fill="url(#logo-b)" />
                                </svg>
                            </router-link>
                        </div>
                    </div>

                    <div class="max-w-sm mx-auto w-full px-4 py-8">
                        <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Welcome back! ✨</h1>
                        <!-- Form -->
                        <form @submit.prevent="submit">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1" for="email">Email Address</label>
                                    <input id="email" class="form-input w-full bg-slate-900" type="email"
                                        v-model="form.email" />
                                    <InputError class="mt-2" :message="form.errors.email" />

                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1" for="password">Password</label>
                                    <input id="password" class="form-input w-full bg-slate-900" type="password"
                                        autoComplete="on" v-model="form.password" />
                                    <InputError class="mt-2" :message="form.errors.password" />

                                </div>
                            </div>
                            <div class="flex items-center justify-between mt-6">
                                <div class="mr-1">
                                    <Link v-if="canResetPassword" :href="route('password.request')"
                                        class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                                    Forgot your password?
                                    </Link>

                                </div>
                                <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing">
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>
                        <!-- Footer -->
                        <div class="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                            <div class="text-sm">
                                Don’t you have an account? <router-link
                                    class="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                                    to="/signup">Sign Up</router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Image -->
            <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
                <img class="object-cover object-center w-full h-full" src="../../../images/auth-image.jpg" width="760"
                    height="1024" alt="Authentication" />
                <img class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block"
                    src="../../../images/auth-decoration.png" width="218" height="224" alt="Authentication decoration" />
            </div>

        </div>

    </main>
</template>