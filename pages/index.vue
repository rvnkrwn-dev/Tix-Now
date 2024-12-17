<template>
  <section class="h-[40dvh] md:h-[50dvh] py-8 container mx-auto">
    <swiper
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
      <swiper-slide>
        <img
            src="https://images.unsplash.com/photo-1731008948799-a23081ddf419?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      </swiper-slide>
      <swiper-slide>
        <img
            src="https://images.unsplash.com/photo-1731008948799-a23081ddf419?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      </swiper-slide>
      <swiper-slide>
        <img
            src="https://images.unsplash.com/photo-1731008948799-a23081ddf419?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      </swiper-slide>
      <swiper-slide>
        <img
            src="https://images.unsplash.com/photo-1731008948799-a23081ddf419?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      </swiper-slide>
      <swiper-slide>
        <img
            src="https://images.unsplash.com/photo-1731008948799-a23081ddf419?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
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
      <h2 class="text-2xl font-semibold">Events Terdekat</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 py-4 gap-6">
        <div v-for="i in [1,2,3,4,5,6,7,8]" class="flex flex-col bg-white shadow-md shadow-black/10 rounded-xl">
          <img class="w-full h-auto rounded-t-xl"
               src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80"
               alt="Card Image">
          <div class="p-4 md:p-5 space-y-3">
            <h3 class="text-gray-800 font-semibold">
              HARSASORA 62
            </h3>
            <ul class="font-normal text-gray-500">
              <li><span>18 Des 2024</span></li>
              <li><span>Surabaya</span></li>
            </ul>
            <hr>
            <p>Rp. 200.000</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <!-- Subscribe -->
    <div class="bg-blue-900 mt-10 px-4 py-20 sm:px-6 lg:px-8 lg:py-32 mx-auto">
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
                       class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                       placeholder="Enter your email">
              </div>
              <a class="w-full sm:w-auto whitespace-nowrap py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
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
    <div class="max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-24 mx-auto">
      <div class="text-center">
        <h2 class="text-2xl font-semibold">Cara Beli Tiket</h2>
        <p class="text-gray-500">Sekarang beli tiket online gak perlu ribet</p>
      </div>
      <!-- Grid -->
      <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <!-- Card -->
        <a class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition"
           href="#">
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
                <h3 class="group-hover:text-blue-600 font-semibold text-gray-800">
                  Ask our community
                </h3>
                <p class="text-sm text-gray-500">
                  Get help from 40k+ Preline users
                </p>
              </div>
            </div>
          </div>
        </a>
        <!-- End Card -->

        <!-- Card -->
        <a class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition"
           href="#">
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
                <h3 class="group-hover:text-blue-600 font-semibold text-gray-800">
                  Get help in the app
                </h3>
                <p class="text-sm text-gray-500">
                  Just head to «Help» in the app
                </p>
              </div>
            </div>
          </div>
        </a>
        <!-- End Card -->

        <!-- Card -->
        <a class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition"
           href="#">
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
                <h3 class="group-hover:text-blue-600 font-semibold text-gray-800">
                  Email us
                </h3>
                <p class="text-sm text-gray-500">
                  Reach us at <span
                    class="text-blue-600 decoration-2 group-hover:underline font-medium">info@site.com</span>
                </p>
              </div>
            </div>
          </div>
        </a>
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