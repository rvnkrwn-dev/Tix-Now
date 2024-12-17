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
          Tiket dan Acara
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <div class="w-full min-h-screen lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <client-only>
        <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
          <!-- Header -->
          <div>
            <h2 class="text-xl font-medium text-gray-800 w-full">Ubah Tiket dan Acara</h2>
          </div>
          <hr>

          <div class="h-full w-full mt-2">
            <!-- Form untuk mengubah Tiket dan Acara -->
            <form v-if="selectedUser" @submit.prevent="handleSubmit">
              <div class="space-y-4 flex flex-col">
                <!-- Nama Lengkap -->
                <div class="grid sm:grid-cols-3">
                  <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Lengkap</label>
                  <input
                      type="text"
                      id="name"
                      v-model="selectedUser.full_name"
                      class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Masukan nama"
                      required
                  />
                </div>
                <!-- Email -->
                <div class="grid sm:grid-cols-3">
                  <label for="email" class="block text-sm font-medium mb-2 w-full">Email</label>
                  <input
                      type="email"
                      id="email"
                      v-model="selectedUser.email"
                      class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Masukan email"
                      required
                  />
                </div>
                <!-- Role -->
                <div class="grid sm:grid-cols-3">
                  <label for="role" class="block text-sm font-medium mb-2 w-full">Role</label>
                  <select
                      id="role"
                      v-model="selectedUser.role"
                      class="py-3 px-4 pe-9 block col-span-2 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required
                  >
                    <option value="null" selected>-Pilih-</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                  </select>
                </div>

                <!-- Button Actions -->
                <div class="space-x-3 self-end">
                  <button
                      type="button"
                      @click="selectedUser = null"
                      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-transparent text-red-600 hover:bg-red-200 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Batal
                  </button>
                  <button
                      type="submit"
                      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>

            <!-- Jika tidak ada Tiket dan Acara yang dipilih, tampilkan combobox pencarian -->
            <div v-else>
              <label for="hs-combobox-basic-usage" class="block text-sm font-medium mb-2 w-full">Cari Tiket dan Acara</label>
              <ComboBoxTicket @selectedTicket="handleSelectedUser"/>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {User} from "~/types/TypesModel";

definePageMeta({
  layout: 'admin',
})

const {$toast} = useNuxtApp();

const selectedUser = ref<any>(null)
const isLoading = ref<boolean>(false)

const handleSelectedUser = (user: User) => {
  selectedUser.value = {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    status: user.password,
  }
}

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    await useFetchApi(`/api/auth/users/${selectedUser.value?.id}`, {
      method: 'PUT',
      body: selectedUser.value
    })

    $toast('Berhasil mengubah data Tiket dan Acara.', 'success');
    selectedUser.value = null
  } catch (error) {
    $toast('Gagal mengubah data Tiket dan Acara.', 'error');
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>

</style>