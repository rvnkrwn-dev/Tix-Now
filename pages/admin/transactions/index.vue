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
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M15 3v18" />
          <path d="m8 9 3 3-3 3" />
        </svg>
      </button>
      <!-- End Navigation Toggle -->

      <!-- Breadcrumb -->
      <ol class="ms-3 flex items-center whitespace-nowrap">
        <li class="flex items-center text-sm text-gray-800">
          Transaksi
          <svg class="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 " width="16"
               height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" />
          </svg>
        </li>
        <li class="text-sm font-semibold text-gray-800 truncate" aria-current="page">
          Data Transaksi
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <DataTables
          :title="'Transaksi'"
          :fields="[
          { label: 'Transaksi ID', key: 'id' },
          { label: 'User ID', key: 'userId' },
          { label: 'Jumlah Tiket', key: 'totalTicket' },
          { label: 'Total Pembayaran', key: 'total' },
          { label: 'Status', key: 'status' },
          { label: 'Tanggal Transaksi', key: 'createdAt' }
        ]"
          :data="transactions"
          :perPage="pageSize"
          :totalPages="totalPages"
          :currentPage="currentPage"
          :prevPage="prevPage"
          :nextPage="nextPage"
          :isLoading="isLoading"
          :deleteAction="false"
          @fetchData="(e) => handleChangeFetchData(e)"
          @searchData="(e) => handleSearchData(e)"
          @deleteData="(e) => handleDeleteData(e)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { handleError } = useErrorHandling();
const { $toast } = useNuxtApp();

const page = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const currentPage = ref(1)
const nextPage = ref()
const prevPage = ref()
const transactionsData = ref([])
const isLoading = ref<boolean>(false)

const transactions: any = computed(() => transactionsData.value)

const fetchTransactions = async () => {
  try {
    isLoading.value = true
    const response: any = await useFetchApi(`/api/auth/transactions?page=${page.value}&pagesize=${pageSize.value}`);
    transactionsData.value = response?.data?.transction;
    totalPages.value = response?.meta?.totalPages;
    nextPage.value = response?.meta?.next;
    prevPage.value = response?.meta?.prev;
  } catch (e) {
    handleError(e)
  } finally {
    isLoading.value = false
  }
}

const handleChangeFetchData = async (payload: any) => {
  try {
    isLoading.value = true
    const response: any = await useFetchApi(payload.url);
    transactionsData.value = response?.data?.transction;
    totalPages.value = response?.meta?.totalPages;
    nextPage.value = response?.meta?.next;
    prevPage.value = response?.meta?.prev;
    currentPage.value = payload?.currentPage;
  } catch (e) {
    handleError(e)
  } finally {
    isLoading.value = false
  }
}

const handleSearchData = async (query: string) => {
  try {
    if (query.length === 0) {
      await fetchTransactions()
      return
    }
    isLoading.value = true
    const response: any = await useFetchApi(`/api/auth/transactions/search?q=${query}`);
    transactionsData.value = response?.data?.transction;
    totalPages.value = 1;
    nextPage.value = null;
    prevPage.value = null;
  } catch (e) {
    handleError(e)
  } finally {
    isLoading.value = false
  }
}

const handleDeleteData = async (id: number) => {
  if (!confirm('Are you sure?')) return
  try {
    isLoading.value = true
    await useFetchApi(`/api/auth/transactions/${id}`, {
      method: 'DELETE',
    });
    transactionsData.value = transactionsData.value.filter((transaction: any) => transaction.id !== id);
    $toast('Berhasil menghapus transaksi.', 'success');
  } catch (e) {
    $toast('Gagal menghapus transaksi.', 'error');
    handleError(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchTransactions()
})
</script>
