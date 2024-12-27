<template>
  <section>
    <div class="p-6 py-8 md:px-0 container mx-auto">
      <!-- Features -->
      <div v-if="ticket && ticket.title" class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <!-- Grid -->
        <div class="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div>
            <img class="rounded-xl w-full" :src="ticket?.secureUrl" alt="Features Image">
          </div>

          <!-- End Col -->
          <div class="mt-5 sm:mt-10 lg:mt-0">
            <div class="space-y-6 sm:space-y-8">
              <!-- Title -->
              <div class="space-y-2 md:space-y-4">
                <h2 class="font-bold text-3xl lg:text-4xl text-gray-800">{{ ticket.title }}</h2>
                <p class="text-gray-500">{{ ticket.description }}</p>
              </div>
              <!-- End Title -->

              <!-- List -->
              <ul class="space-y-2 sm:space-y-4">
                <li class="flex gap-x-3">
                  <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <div class="grow">
                    <span class="text-sm sm:text-base text-gray-500">
                      <span class="font-bold">{{ formatDate(ticket.dateTime) }}</span>
                    </span>
                  </div>
                </li>

                <li class="flex gap-x-3">
                  <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <div class="grow">
                    <span class="text-sm sm:text-base text-gray-500">
                      <span class="font-bold">{{ ticket.location }}</span>
                    </span>
                  </div>
                </li>

                <li class="flex gap-x-3">
                  <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <div class="grow">
                    <span class="text-sm sm:text-base text-gray-500">
                      <span class="font-bold">{{ ticket.stock }} tiket tersedia</span>
                    </span>
                  </div>
                </li>

                <!-- Quantity Selection -->
                <li class="flex gap-x-3">
                  <!-- Input Number -->
                  <div class="py-2 px-3 bg-white border border-gray-200 rounded-lg">
                    <div class="w-full flex justify-between items-center gap-x-3">
                      <input id="formQuantity" v-model="quantity" :max="ticket.stock"
                             class="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0" type="number"
                             aria-roledescription="Number field">
                      <div class="flex justify-end items-center gap-x-1.5">
                        <button type="button" @click="quantity--" :disabled="quantity <= 1"
                                class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                          <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                               stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                          </svg>
                        </button>
                        <button type="button" @click="quantity++" :disabled="quantity >= ticket.stock"
                                class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                          <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                               viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                               stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="flex gap-x-3">
                  <button @click="purchaseTicket" :disabled="quantity > ticket.stock || loading"
                          class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                    {{ loading ? "Loading" : `Beli Tiket - ${ ticket.price * quantity}` }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <!-- End Col -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const {isLoggedIn} = useAuth()

const {$toast} = useNuxtApp();
const {slug} = useRoute().params;
const ticketData = ref<any>({});
const loading = ref<boolean>(true);
const quantity = ref(1);


const ticket = computed(() => ticketData.value);

const fetchEvents = async () => {
  try {
    loading.value = true;
    const response: any = await useFetchApi(`/api/tickets/${slug}`);
    ticketData.value = response.data;
  } catch (e) {
    console.error('Error fetching events:', e);
  } finally {
    loading.value = false;
  }
};

function formatDate(dateTime: string) {
  const date = new Date(dateTime);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function purchaseTicket() {
  try {
    if (!isLoggedIn().value) return navigateTo('/login');
    loading.value = true;

    const payload = {
      detailRequests: [
        {
          ticket_id: ticketData.value.id,
          quantity: quantity.value,
        },
      ],
    };

    const timeoutDuration = 50000; // Timeout duration dalam ms
    const maxRetries = 3; // Maksimum percobaan ulang jika gagal

    // Fungsi untuk melakukan request dengan retry logic
    const fetchWithRetry = async (url, options, retries) => {
      try {
        return await useFetchApi(url, options);
      } catch (error) {
        if (retries <= 0) throw error; // Jika sudah maksimal retry, lempar error
        await new Promise(resolve => setTimeout(resolve, 2000)); // Tunggu 2 detik sebelum retry
        return fetchWithRetry(url, options, retries - 1);
      }
    };

    // Membuat Promise untuk timeout
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeoutDuration)
    );

    // Menggunakan Promise.race untuk menjalankan request dengan timeout
    const response = await Promise.race([
      fetchWithRetry('/api/auth/transactions', {
        method: 'POST',
        body: payload,
      }, maxRetries),
      timeout,
    ]);

    // Jika berhasil, update stok dan tampilkan pesan sukses
    ticketData.value.stock -= quantity.value;
    $toast("Tiket berhasil di booking. Tunggu pesan email berikutnya.", "success");

  } catch (e) {
    // Menangani error timeout atau error lain
    if (e.message === 'Request timeout') {
      $toast("Proses transaksi membutuhkan waktu lebih lama dari yang diharapkan.", "error");
    } else if (e.message === 'Network Error') {
      $toast("Terjadi masalah jaringan. Coba lagi nanti.", "error");
    } else {
      $toast("Terjadi kesalahan saat memproses transaksi.", "error");
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchEvents();
});
</script>

<style scoped>
/* You can add styles for the quantity input if necessary */
</style>
