<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <main class="font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 sidebar-expanded">

        <div class="relative flex">

            <!-- Content -->
            <div class="w-full md:w-1/2">
                <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">

                    <div class="flex-1">
                        <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                            <!-- Logo -->
                            <a class="block" href="/">
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
                            </a>
                        </div>
                    </div>

                    <div class="max-w-sm mx-auto w-full px-4 py-8">
                        <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Create your Account ✨</h1>
                        <!-- Form -->
                        <form @submit.prevent="submit">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1" for="name">
                                        Name
                                        <span class="text-rose-500">*</span>
                                    </label>
                                    <input id="name" v-model="form.name" type="text" required autofocus autocomplete="name"
                                        class="form-input w-full bg-slate-900" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1" for="email">
                                        Email
                                        <span class="text-rose-500">*</span>
                                    </label>
                                    <input id="email" v-model="form.email" type="text" required autocomplete="email"
                                        class="form-input w-full bg-slate-900" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1" for="password">
                                        Password
                                        <span class="text-rose-500">*</span>
                                    </label>
                                    <input id="password" v-model="form.password" type="password" required autofocus
                                        autocomplete="new-password" class="form-input w-full bg-slate-900" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1" for="password_confirmation">
                                        Password Confirmation
                                        <span class="text-rose-500">*</span>
                                    </label>
                                    <input id="password_confirmation" v-model="form.password_confirmation" type="password"
                                        required autofocus autocomplete="new-password"
                                        class="form-input w-full bg-slate-900" />
                                </div>
                            </div>
                            <!-- policy jika ada -->
                            <!-- <div v-if="$page.props.jetstream.hasTermsAndPrivacyPolicyFeature" class="mt-4">
                                <InputLabel for="terms">
                                    <div class="flex items-center">
                                        <Checkbox id="terms" v-model:checked="form.terms" name="terms" required />

                                        <div class="ml-2">
                                            I agree to the <a target="_blank" :href="route('terms.show')"
                                                class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">Terms
                                                of Service</a> and <a target="_blank" :href="route('policy.show')"
                                                class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">Privacy
                                                Policy</a>
                                        </div>
                                    </div>
                                    <InputError class="mt-2" :message="form.errors.terms" />
                                </InputLabel>
                            </div> -->
                            <!-- end policy -->

                            <div class="flex items-center justify-between mt-6">
                                <div class="mr-1">
                                    <label class="flex items-center">
                                        <input type="checkbox" class="form-checkbox bg-slate-900" />
                                        <span class="text-sm ml-2">Active</span>
                                    </label>
                                </div>
                                <!-- <router-link class="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
                                    to="/">Sign Up</router-link> -->
                                <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing">
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                        <!-- Footer -->
                        <div class="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                            <div class="text-sm">
                                Have an account? 
                                <Link :href="route('login')"
                                    class="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
                                Sign In.
                                </Link>
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