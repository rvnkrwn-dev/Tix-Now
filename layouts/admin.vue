<template>
  <div>
    <header
        class="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px]">
      <nav class="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div class="me-5 lg:me-0 lg:hidden">
          <!-- Logo -->
          <NuxtLink to="/" aria-label="Tix Now">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 320 80" width="180" height="60">
              <!-- Background Circle for the Symbol -->
              <circle cx="50" cy="50" r="35" fill="#FF5733" stroke="white" stroke-width="2"/>

              <!-- Symbol: Ticket Icon -->
              <path d="M45,45 L55,35 L75,35 L85,45 L75,55 L55,55 L45,45 Z"
                    fill="white"/>

              <!-- Text: TIX NOW -->
              <text x="100" y="52" font-family="'Gloria Hallelujah', cursive" font-size="30" fill="#FF5733"
                    font-weight="bold">
                TIX NOW
              </text>

              <!-- Tagline: Pembelian Tiket Online -->
              <text x="100" y="72" font-family="Arial, sans-serif" font-size="14" fill="#333" font-weight="normal">
                Pembelian Tiket Online
              </text>
            </svg>
          </NuxtLink>
          <!-- End Logo -->
        </div>

        <div class="w-full flex items-center justify-end ms-auto lg:justify-between gap-x-1 md:gap-x-3">
          <div class="hidden lg:block">
            <!-- Search Input -->
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                <svg class="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
              <input type="text"
                     class="py-2 ps-10 pe-16 block w-full bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                     placeholder="Search">
              <div class="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400">
                <svg class="shrink-0 size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
                </svg>
                <span class="mx-1">
                <svg class="shrink-0 size-3 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round">
                  <path d="M5 12h14"/>
                  <path d="M12 5v14"/>
                </svg>
              </span>
                <span class="text-xs">/</span>
              </div>
            </div>
            <!-- End Search Input -->
          </div>

          <div class="flex flex-row items-center justify-end gap-1">
            <button type="button"
                    class="lg:hidden size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              <span class="sr-only">Search</span>
            </button>
            <button type="button"
                    class="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                  <path
                      d="M11.962 17.986h6.81a1.555 1.555 0 0 0 1.512-2.175c-.36-1.088-1.795-2.393-1.795-3.677c0-2.85 0-3.6-1.404-5.276a5 5 0 0 0-1.653-1.283l-.783-.38a1.1 1.1 0 0 1-.511-.73a2.023 2.023 0 0 0-2.176-1.707a2.023 2.023 0 0 0-2.12 1.707a1.09 1.09 0 0 1-.567.73l-.783.38A5 5 0 0 0 6.84 6.858c-1.403 1.676-1.403 2.426-1.403 5.276c0 1.284-1.37 2.458-1.73 3.611c-.217.697-.337 2.241 1.48 2.241z"/>
                  <path d="M15.225 17.986a3.2 3.2 0 0 1-3.263 3.263A3.195 3.195 0 0 1 8.7 17.986"/>
                </g>
              </svg>
              <span class="sr-only">Notifications</span>
            </button>

            <button type="button"
                    class="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
              <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
              <span class="sr-only">Activity</span>
            </button>

            <!-- Dropdown -->
            <div class="hs-dropdown [--placement:bottom-right] relative inline-flex ml-2">
              <button id="hs-dropdown-account" type="button"
                      class="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                      aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <img class="shrink-0 size-[38px] rounded-full"
                     src="https://res.cloudinary.com/dmjb33clr/image/upload/v1733470093/puson_app/profile/avatar.png"
                     alt="Avatar">
              </button>

              <div
                  class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                  role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-account">
                <div class="py-3 px-5 bg-gray-100 rounded-t-lg">
                  <p class="text-sm text-gray-500">Masuk sebagai</p>
                  <p class="text-sm font-medium text-gray-800">{{ user?.full_name }}</p>
                </div>
                <div class="p-1.5 space-y-0.5">
                  <NuxtLink
                      class="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      @click="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="lucide lucide-settings">
                      <path
                          d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Pengaturan
                  </NuxtLink>
                </div>
                <div class="p-1.5 space-y-0.5">
                  <NuxtLink
                      class="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      @click="handleLogout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         class="lucide lucide-log-out">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" x2="9" y1="12" y2="12"/>
                    </svg>
                    Keluar
                  </NuxtLink>
                </div>
              </div>
            </div>
            <!-- End Dropdown -->
          </div>
        </div>
      </nav>
    </header>
    <!-- Sidebar -->
    <div id="hs-application-sidebar" class="hs-overlay  [--auto-close:lg]
    hs-overlay-open:translate-x-0
    -translate-x-full transition-all duration-300 transform
    w-[260px] h-full
    hidden
    fixed inset-y-0 start-0 z-[60]
    bg-white border-e border-gray-200
    lg:block lg:translate-x-0 lg:end-auto lg:bottom-0" role="dialog" tabindex="-1" aria-label="Sidebar">
      <div class="relative flex flex-col h-full max-h-full">
        <div class="px-6 pt-4">
          <!-- Logo -->
          <NuxtLink to="/" aria-label="Tix Now">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 10 320 100" width="180" height="60">
              <!-- Background Circle for the Symbol -->
              <circle cx="50" cy="50" r="35" fill="#FF5733" stroke="white" stroke-width="2"/>

              <!-- Symbol: Ticket Icon -->
              <path d="M45,45 L55,35 L75,35 L85,45 L75,55 L55,55 L45,45 Z"
                    fill="white"/>

              <!-- Text: TIX NOW -->
              <text x="100" y="52" font-family="'Gloria Hallelujah', cursive" font-size="30" fill="#FF5733"
                    font-weight="bold">
                TIX NOW
              </text>

              <!-- Tagline: Pembelian Tiket Online -->
              <text x="100" y="72" font-family="Arial, sans-serif" font-size="14" fill="#333" font-weight="normal">
                Pembelian Tiket Online
              </text>
            </svg>
          </NuxtLink>
          <!-- End Logo -->
        </div>

        <!-- Content -->
        <div
            class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <nav class="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
            <ul class="flex flex-col space-y-1">
              <li>
                <NuxtLink
                    class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    to="/admin" active-class="bg-gray-100">
                  <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                       stroke-linejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  Dashboard
                </NuxtLink>
              </li>

              <li class="hs-accordion" id="categories-accordion">
                <button type="button"
                        class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        aria-expanded="true" aria-controls="categories-accordion-child">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list"><path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/></svg>
                  Kategori

                  <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>

                  <svg class="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>

                <div id="categories-accordion-child"
                     class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                     role="region" aria-labelledby="categories-accordion">
                  <ul class="ps-4 pt-1 mt-2 space-y-1 border-l-2 ml-4">
                    <li>
                      <NuxtLink
                          class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          to="/admin/categories" active-class="bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-list">
                          <path d="M3 12h.01"/>
                          <path d="M3 18h.01"/>
                          <path d="M3 6h.01"/>
                          <path d="M8 12h13"/>
                          <path d="M8 18h13"/>
                          <path d="M8 6h13"/>
                        </svg>
                        Daftar
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                          class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          to="/admin/categories/add" active-class="bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-circle-plus">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M8 12h8"/>
                          <path d="M12 8v8"/>
                        </svg>
                        Tambah
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="hs-accordion" id="tickets-accordion">
                <button type="button"
                        class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        aria-expanded="true" aria-controls="tickets-accordion-child">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
                  Tiket dan Acara

                  <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>

                  <svg class="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>

                <div id="tickets-accordion-child"
                     class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                     role="region" aria-labelledby="tickets-accordion">
                  <ul class="ps-4 pt-1 mt-2 space-y-1 border-l-2 ml-4">
                    <li>
                      <NuxtLink
                          class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          to="/admin/tickets" active-class="bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-list">
                          <path d="M3 12h.01"/>
                          <path d="M3 18h.01"/>
                          <path d="M3 6h.01"/>
                          <path d="M8 12h13"/>
                          <path d="M8 18h13"/>
                          <path d="M8 6h13"/>
                        </svg>
                        Daftar
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                          class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          to="/admin/tickets/add" active-class="bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-circle-plus">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M8 12h8"/>
                          <path d="M12 8v8"/>
                        </svg>
                        Tambah
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                          class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          to="/admin/tickets/edit" active-class="bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-pencil">
                          <path
                              d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                          <path d="m15 5 4 4"/>
                        </svg>
                        Ubah
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="hs-accordion" id="transactions-accordion">
                <button type="button"
                        class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        aria-expanded="true" aria-controls="transactions-accordion-child">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-right"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
                  Transaksi

                  <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>

                  <svg class="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>

                <div id="transactions-accordion-child"
                     class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                     role="region" aria-labelledby="transactions-accordion">
                  <ul class="ps-4 pt-1 mt-2 space-y-1 border-l-2 ml-4">
                    <li>
                      <NuxtLink
                          class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          to="/admin/transactions" active-class="bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-list">
                          <path d="M3 12h.01"/>
                          <path d="M3 18h.01"/>
                          <path d="M3 6h.01"/>
                          <path d="M8 12h13"/>
                          <path d="M8 18h13"/>
                          <path d="M8 6h13"/>
                        </svg>
                        Daftar
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                          class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          to="/admin/transactions/edit" active-class="bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-pencil">
                          <path
                              d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                          <path d="m15 5 4 4"/>
                        </svg>
                        Ubah
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li class="hs-accordion" id="pengguna-accordion">
                <button type="button"
                        class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        aria-expanded="true" aria-controls="pengguna-accordion-child">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-users">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Pengguna

                  <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>

                  <svg class="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg"
                       width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>

                <div id="pengguna-accordion-child"
                     class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                     role="region" aria-labelledby="pengguna-accordion">
                  <ul class="ps-4 pt-1 mt-2 space-y-1 border-l-2 ml-4">
                    <li>
                      <NuxtLink
                          class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          to="/admin/users" active-class="bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-list">
                          <path d="M3 12h.01"/>
                          <path d="M3 18h.01"/>
                          <path d="M3 6h.01"/>
                          <path d="M8 12h13"/>
                          <path d="M8 18h13"/>
                          <path d="M8 6h13"/>
                        </svg>
                        Daftar
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                          class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          to="/admin/users/add" active-class="bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-circle-plus">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M8 12h8"/>
                          <path d="M12 8v8"/>
                        </svg>
                        Tambah
                      </NuxtLink>
                    </li>
                    <li>
                      <NuxtLink
                          class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                          to="/admin/users/edit" active-class="bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-pencil">
                          <path
                              d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                          <path d="m15 5 4 4"/>
                        </svg>
                        Ubah
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <NuxtLink
                    class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    to="/report" active-class="bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       class="lucide lucide-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" x2="9" y1="12" y2="12"/>
                  </svg>
                  Keluar
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <!-- End Content -->
      </div>
    </div>
    <!-- End Sidebar -->
    <slot/>
  </div>
</template>

<script setup lang="ts">
import type {User} from "@prisma/client";

const {useAuthUser, logout} = useAuth()
const user = computed(() => useAuthUser().value as User)
const {$toast} = useNuxtApp();
const handleLogout = async () => {
  try {
    await logout()
  } catch (error: any) {
    return
  } finally {
    $toast('Berhasil menghapus sesi masuk.', 'success'); // Menampilkan pesan kesalahan menggunakan toast
    navigateTo('/login'); // Setelah logout berhasil, arahkan ke halaman login
  }
}
</script>

<style scoped>

</style>