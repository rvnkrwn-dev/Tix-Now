<template>
  <!-- Breadcrumb -->
  <div
      class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
    <div class="flex items-center py-2">
      <!-- Navigation Toggle -->
      <button type="button"
              class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
        <span class="sr-only">Toggle Navigation</span>
        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M15 3v18"/>
          <path d="m8 9 3 3-3 3"/>
        </svg>
      </button>
      <!-- End Navigation Toggle -->

      <!-- Breadcrumb -->
      <ol class="ms-3 flex items-center whitespace-nowrap">
        <li class="flex items-center text-sm text-gray-800">
          Aplikasi
          <svg class="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 " width="16"
               height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round"/>
          </svg>
        </li>
        <li class="text-sm font-semibold text-gray-800 truncate" aria-current="page">
          Pengguna
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
        <!-- Header -->
        <div>
          <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Pengguna</h2>
        </div>
        <!-- End Header -->

        <hr>

        <div class="h-full w-full mt-2 overflow-y-auto">
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4 flex flex-col">
              <div class="grid sm:grid-cols-3">
                <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Lengkap</label>
                <input type="text" id="name"
                       v-model="fullName"
                       class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Masukan nama">
              </div>
              <div class="grid sm:grid-cols-3">
                <label for="username" class="block text-sm font-medium mb-2 w-full">Username</label>
                <input type="text" id="username"
                       v-model="username"
                       class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Masukan username">
              </div>
              <div class="grid sm:grid-cols-3">
                <label for="email" class="block text-sm font-medium mb-2 w-full">Email</label>
                <input type="email" id="email"
                       v-model="email"
                       class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Masukan email">
              </div>
              <div class="grid sm:grid-cols-3">
                <label for="role" class="block text-sm font-medium mb-2 w-full">Role</label>
                <select id="role"
                        v-model="role"
                        class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                  <option value="null" selected>-Pilih-</option>
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
                </select>
              </div>
              <div class="space-x-3 self-end">
                <button type="submit"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                        :disabled="isLoading">
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
const {$toast} = useNuxtApp();

const fullName = ref(null)
const username = ref(null)
const email = ref(null)
const role = ref(null)
const isLoading = ref<boolean>(false)

const clearForm = () => {
  fullName.value = null
  username.value = null
  email.value = null
  role.value = null
}

const validateForm = () => {
  if (!fullName.value || !email.value || !role.value || !username.value) {
    $toast('Harap lengkapi semua field.', 'error');
    return false;
  }
  return true;
};


const handleSubmit = async () => {
  try {
    isLoading.value = true;
    if (!validateForm()) return
    await useFetchApi('/api/auth/users', {
      method: 'POST',
      body: {
        full_name: fullName.value,
        username: username.value,
        email: email.value,
        role: role.value,
      }
    })

    $toast('Berhasil menambahkan pengguna baru.', 'success');
    clearForm()
  } catch (error) {
    $toast('Gagal menambahkan pengguna baru.', 'success');
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>

</style>