<template>
  <section class="h-[40dvh] md:h-[50dvh] py-8 container mx-auto">
    <div v-if="loading" class="w-full h-[40dvh] py-8 md:h-[50dvh] animate-pulse rounded-xl">
      <div class="w-full h-full flex items-center justify-center">
        <div class="bg-gray-300 w-full h-full rounded-lg"></div>
      </div>
    </div>
    <swiper
        v-else
        :spaceBetween="30"
        :centeredSlides="true"
        :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
        :pagination="{
      clickable: true,
    }"
        :navigation="true"
        :modules="modules"
        @autoplayTimeLeft="onAutoplayTimeLeft"
        class="sm:rounded-xl overflow-hidden"
    >
      <swiper-slide v-for="item in eventsAndTickets" :key="item.id">
        <div class="swiper-item w-full h-full">
          <img
              loading="lazy"
              class="min-h-full min-w-full object-fill"
              :src="addCloudinaryTransformations(item?.secureUrl)" :alt="item.publicId"/>
        </div>
      </swiper-slide>
      <template #container-end>
        <div class="autoplay-progress">
          <svg viewBox="0 0 48 48" ref="progressCircle">
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref="progressContent"></span>
        </div>
      </template>
    </swiper>
  </section>
  <section>
    <div class="p-6 py-8 md:px-0 container mx-auto">
      <div class="flex justify-between items-end">
        <h2 class="text-2xl font-semibold">Events Terdekat</h2>
        <NuxtLink to="/events" class="text-orange-500 font-semibold">Lihat semua</NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-4 gap-6">
        <div v-if="loading" v-for="i in [1,2,3,4]" :key="i"
             class="w-full h-[40dvh] py-8 md:h-[50dvh] animate-pulse rounded-xl">
          <div class="w-full h-full flex items-center justify-center">
            <div class="bg-gray-300 w-full h-full rounded-lg"></div>
          </div>
        </div>
        <NuxtLink v-for="item in eventsAndTickets" class="flex flex-col bg-white shadow-md shadow-black/10 rounded-xl" :to="`/events/${item.slug}`">
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
    </div>
  </section>
  <section>
    <!-- Subscribe -->
    <div class="bg-gray-700 mt-10 px-4 py-20 sm:px-6 lg:px-8 lg:py-32 mx-auto">
      <div class="grid md:grid-cols-2 gap-8">
        <div class="max-w-md">
          <h2 class="text-2xl text-white font-bold md:text-3xl md:leading-tight">Subscribe</h2>
          <p class="mt-3 text-white">
            Subscribe and start making the most of every engagement.
          </p>
        </div>

        <form>
          <div class="w-full sm:max-w-lg md:ms-auto">
            <div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <div class="w-full">
                <label for="hero-input" class="sr-only">Search</label>
                <input type="text" id="hero-input" name="hero-input"
                       class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Enter your email">
              </div>
              <a class="w-full sm:w-auto whitespace-nowrap py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none"
                 href="#">
                Subscribe
              </a>
            </div>
            <p class="mt-3 text-sm text-gray-300">
              No spam, unsubscribe at any time
            </p>
          </div>
        </form>
      </div>
    </div>
    <!-- End Subscribe -->
  </section>
  <section>
    <!-- Card Section -->
    <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-24 mx-auto container">
      <div class="text-center">
        <h2 class="text-2xl font-semibold">Cara Beli Tiket</h2>
        <p class="text-gray-500">Sekarang beli tiket online gak perlu ribet</p>
      </div>
      <!-- Grid -->
      <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <!-- Card 1: Register -->
        <div
            class="group cursor-pointer flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition">
          <div class="p-4 md:p-5">
            <div class="flex gap-x-5">
              <svg class="mt-1 shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                   stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>

              <div class="grow">
                <h3 class="group cursor-pointer-hover:text-orange-600 font-semibold text-gray-800">
                  Daftar Akun
                </h3>
                <p class="text-sm text-gray-500">
                  Mulai dengan membuat akun untuk mempermudah proses pembelian.
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card 2: Login -->
        <div
            class="group cursor-pointer flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition">
          <div class="p-4 md:p-5">
            <div class="flex gap-x-5">
              <svg class="mt-1 shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                   stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <path d="M12 17h.01"/>
              </svg>

              <div class="grow">
                <h3 class="group cursor-pointer-hover:text-orange-600 font-semibold text-gray-800">
                  Login ke Akun
                </h3>
                <p class="text-sm text-gray-500">
                  Masuk ke akun Anda untuk memulai proses pemilihan tiket.
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card 3: Pilih Tiket atau Acara -->
        <div
            class="group cursor-pointer flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition">
          <div class="p-4 md:p-5">
            <div class="flex gap-x-5">
              <svg class="mt-1 shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                   stroke-linejoin="round">
                <path
                    d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/>
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>
              </svg>

              <div class="grow">
                <h3 class="group cursor-pointer-hover:text-orange-600 font-semibold text-gray-800">
                  Pilih Tiket atau Acara
                </h3>
                <p class="text-sm text-gray-500">
                  Temukan acara atau tiket yang ingin Anda beli.
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->

        <!-- Card 4: Checkout -->
        <div
            class="group cursor-pointer flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition">
          <div class="p-4 md:p-5">
            <div class="flex gap-x-5">
              <svg class="mt-1 shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                   stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>

              <div class="grow">
                <h3 class="group cursor-pointer-hover:text-orange-600 font-semibold text-gray-800">
                  Checkout dan Bayar
                </h3>
                <p class="text-sm text-gray-500">
                  Lanjutkan untuk melakukan pembayaran dan dapatkan tiket Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- End Card -->
      </div>
      <!-- End Grid -->
    </div>
    <!-- End Card Section -->
  </section>

</template>

<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {formatDate} from "compatx";

const progressCircle = ref<HTMLElement | null>(null);
const progressContent = ref<HTMLElement | null>(null);
const modules = [Autoplay, Pagination, Navigation]
const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
  if (progressCircle.value) {
    progressCircle.value.style.setProperty('--progress', (1 - progress).toString());
  }

  if (progressContent.value) {
    progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
  }
};

const eventsAndTicketsData = ref()
const loading = ref<boolean>(true)

const eventsAndTickets: any = computed(() => eventsAndTicketsData.value)

function formatDate(dateTime: string) {
  const date = new Date(dateTime);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const fetchUpComingEvent = async () => {
  try {
    loading.value = true;
    const response: any = await useFetchApi('/api/tickets?page=1&pagesize=4&type=upcoming')
    eventsAndTicketsData.value = response.data.tickets
  } catch (e) {

  } finally {
    loading.value = false
  }
}

function addCloudinaryTransformations(url: string, transformations: string = "ar_16:9,c_crop,g_auto,w_1280") {
  // Pisahkan URL menjadi bagian sebelum dan sesudah "/image/upload/"
  const uploadIndex = url.indexOf("/image/upload/");
  if (uploadIndex === -1) {
    throw new Error("URL Cloudinary tidak valid");
  }

  // Sisipkan transformasi di antara bagian sebelum dan sesudah "/image/upload/"
  const beforeUpload = url.substring(0, uploadIndex + 14); // "/image/upload/" memiliki panjang 14 karakter
  const afterUpload = url.substring(uploadIndex + 14);

  // Gabungkan transformasi
  return `${beforeUpload}${transformations}/${afterUpload}`;
}

onMounted(() => {
  fetchUpComingEvent()
})
</script>

<style lang="css" scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--swiper-theme-color);
}

.autoplay-progress svg {
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: var(--swiper-theme-color);
  fill: none;
  stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
}
</style>