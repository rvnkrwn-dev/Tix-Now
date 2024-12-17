<template>
  <section>
    <div class="p-6 py-8 md:px-0 container mx-auto">
      <div class="flex justify-between gap-2 flex-col md:flex-row">
        <h2 class="text-2xl font-semibold">Semua Acara</h2>
        <div class="relative w-full md:max-w-xs">
          <label for="hs-table-search" class="sr-only">Search</label>
          <input
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              class="py-2 px-3 ps-9 block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Cari disini"
              v-model="searchText"
              @input="fetchEvents"
          />
          <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
            <svg class="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24"
                 height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round"
                 stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Display Events -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-4 gap-6">
        <div v-if="loading" v-for="i in [1,2,3,4]" :key="i"
             class="w-full h-[40dvh] py-8 md:h-[50dvh] animate-pulse rounded-xl">
          <div class="w-full h-full flex items-center justify-center">
            <div class="bg-gray-300 w-full h-full rounded-lg"></div>
          </div>
        </div>
        <NuxtLink v-else v-for="item in eventsAndTickets" :key="item.id" :to="`/events/${item.slug}`"
             class="flex flex-col bg-white shadow-md shadow-black/10 rounded-xl">
          <img class="w-full h-auto rounded-t-xl"
               :src="addCloudinaryTransformations(item?.secureUrl)"
               alt="Card Image">
          <div class="p-4 md:p-5 space-y-3">
            <h3 class="text-gray-800 font-semibold">{{ item.title }}</h3>
            <ul class="font-normal text-gray-500">
              <li><span>{{ formatDate(item.dateTime) }}</span></li>
              <li><span>{{ item.location }}</span></li>
            </ul>
            <hr>
            <p>Rp. {{ item.price.toLocaleString() }}</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center space-x-4 mt-6">
        <button
            :disabled="currentPage <= 1"
            @click="changePage(currentPage - 1)"
            class="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50">
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
            :disabled="currentPage >= totalPages"
            @click="changePage(currentPage + 1)"
            class="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const eventsAndTicketsData = ref([]);
const loading = ref<boolean>(true);
const searchText = ref<string>('');
const currentPage = ref<number>(1);
const totalPages = ref<number>(1); // Store total pages
const pageSizes = ref<number>(10); // Store total pages

const eventsAndTickets: any = computed(() => eventsAndTicketsData.value);

const fetchEvents = async () => {
  try {
    loading.value = true;
    const query = searchText.value ? `search?q=${searchText.value}` : ''; // Add search query if exists
    if (query) {
      const response: any = await useFetchApi(`/api/tickets/${query}`);
      eventsAndTicketsData.value = response.data.tickets;
      totalPages.value = 1; // Set total pages from API response
    } else {
      const response: any = await useFetchApi(`/api/tickets?page=${currentPage.value}&pagesize=${pageSizes}`);
      eventsAndTicketsData.value = response.data.tickets;
      totalPages.value = response.meta.totalPages; // Set total pages from API response
    }
  } catch (e) {
    console.error('Error fetching events:', e);
  } finally {
    loading.value = false;
  }
};

const changePage = (page: number) => {
  currentPage.value = page;
  fetchEvents(); // Fetch events for the new page
};

function addCloudinaryTransformations(url: string, transformations: string = "ar_16:9,c_crop,g_auto,w_1280") {
  const uploadIndex = url.indexOf("/image/upload/");
  if (uploadIndex === -1) {
    throw new Error("URL Cloudinary tidak valid");
  }

  const beforeUpload = url.substring(0, uploadIndex + 14);
  const afterUpload = url.substring(uploadIndex + 14);

  return `${beforeUpload}${transformations}/${afterUpload}`;
}

function formatDate(dateTime: string) {
  const date = new Date(dateTime);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

onMounted(() => {
  fetchEvents();
});

// Watch the searchText to fetch events when search input changes
watch(searchText, () => {
  currentPage.value = 1; // Reset to page 1 when search query changes
  fetchEvents();
});
</script>
