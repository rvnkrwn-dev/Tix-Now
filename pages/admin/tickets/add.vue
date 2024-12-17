<template>
  <!-- Breadcrumb -->
  <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
    <div class="flex items-center py-2">
      <button type="button" class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar" aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
        <span class="sr-only">Toggle Navigation</span>
        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M15 3v18"/>
          <path d="m8 9 3 3-3 3"/>
        </svg>
      </button>
      <ol class="ms-3 flex items-center whitespace-nowrap">
        <li class="flex items-center text-sm text-gray-800">Aplikasi
          <svg class="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 " width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </li>
        <li class="text-sm font-semibold text-gray-800 truncate" aria-current="page">
          Tiket dan Acara
        </li>
      </ol>
    </div>
  </div>

  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
        <div>
          <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Tiket</h2>
        </div>
        <hr>
        <div class="h-full w-full mt-2 overflow-y-auto">
          <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <div class="space-y-4 flex flex-col">
              <div class="grid sm:grid-cols-3">
                <label for="name" class="block text-sm font-medium mb-2 w-full">Nama tiket / event</label>
                <input type="text" id="name" v-model="name" class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Masukkan nama tiket atau event" required />
              </div>
              <div class="grid sm:grid-cols-3">
                <label for="description" class="block text-sm font-medium mb-2 w-full">Deskripsi tiket</label>
                <textarea id="description" v-model="description" class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Masukkan deskripsi tiket atau event" required></textarea>
              </div>
              <div class="grid sm:grid-cols-3">
                <label for="location" class="block text-sm font-medium mb-2 w-full">Lokasi</label>
                <input type="text" id="location" v-model="location" class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Masukkan lokasi acara" required />
              </div>
              <div class="grid sm:grid-cols-3">
                <label for="dateTime" class="block text-sm font-medium mb-2 w-full">Tanggal dan Waktu</label>
                <input type="datetime-local" id="dateTime" v-model="dateTime" class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required />
              </div>
              <div class="grid sm:grid-cols-3">
                <label for="stock" class="block text-sm font-medium mb-2 w-full">Stok</label>
                <input type="number" id="stock" v-model="stock" class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required />
              </div>
              <div class="grid sm:grid-cols-3">
                <label for="price" class="block text-sm font-medium mb-2 w-full">Harga</label>
                <input type="number" id="price" v-model="price" class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required />
              </div>
              <div class="grid sm:grid-cols-3">
                <label for="categories_id" class="block text-sm font-medium mb-2 w-full">Kategori</label>
                <select id="categories_id" v-model="categories_id" class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required>
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
              </div>
              <div class="grid sm:grid-cols-3">
                <label for="file" class="block text-sm font-medium mb-2 w-full">Gambar</label>
                <input type="file" id="file" @change="handleFileChange" class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div class="space-x-3 self-end">
                <button type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700" :disabled="isLoading">
                  {{ isLoading ? "Loading..." : "Simpan" }}
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

const name = ref<string>('')
const description = ref<string>('')
const location = ref<string>('')
const dateTime = ref<string>('')
const stock = ref<number | null>(null)
const price = ref<number | null>(null)
const categories = ref<any[]>([])
const categories_id = ref<number | null>(null)
const file = ref<File | null>(null)
const isLoading = ref<boolean>(false)

const fetchCategories = async () => {
  try {
    const response: any = await useFetchApi('/api/auth/categories')
    categories.value = response.data.categories
  } catch (error) {
    $toast('Gagal memuat kategori.', 'error')
  }
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    file.value = input.files[0]
  }
}

const clearForm = () => {
  name.value = ''
  description.value = ''
  location.value = ''
  dateTime.value = ''
  stock.value = null
  price.value = null
  categories_id.value = null
  file.value = null
}

const validateForm = () => {
  if (!name.value || !description.value || !location.value || !dateTime.value || !stock.value || !price.value || !categories_id.value) {
    $toast('Harap lengkapi semua field.', 'error')
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    isLoading.value = true

    const formData = new FormData()
    formData.append('title', name.value)
    formData.append('description', description.value)
    formData.append('location', location.value)
    formData.append('dateTime', dateTime.value)
    formData.append('stock', stock.value!.toString())
    formData.append('price', price.value!.toString())
    formData.append('categories_id', categories_id.value!.toString())
    if (file.value) {
      formData.append('file', file.value)
    }

    console.log(formData)
    await useFetchApi('/api/auth/tickets', {
      method: 'POST',
      body: formData
    })

    $toast('Tiket berhasil ditambahkan.', 'success')
    clearForm()
  } catch (error) {
    $toast('Gagal menambahkan tiket.', 'error')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>
