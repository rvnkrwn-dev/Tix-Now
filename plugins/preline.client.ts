import "preline/preline";
import { type IStaticMethods } from "preline/preline";
import HSComboBox from "@preline/combobox";
import HSInputNumber from "@preline/input-number"; // Impor HSInputNumber

declare global {
    interface Window {
        HSComboBox: typeof HSComboBox; // Menambahkan HSComboBox ke dalam window global
        HSInputNumber: typeof HSInputNumber; // Menambahkan HSInputNumber ke dalam window global
        HSStaticMethods: IStaticMethods; // Menambahkan HSStaticMethods ke dalam window global
    }
}

// Memastikan bahwa kode hanya dijalankan di lingkungan browser
if (typeof window !== 'undefined') {
    window.HSComboBox = HSComboBox; // Menambahkan HSComboBox ke window secara eksplisit
    window.HSInputNumber = HSInputNumber; // Menambahkan HSInputNumber ke window secara eksplisit
}

// Mendefinisikan plugin Nuxt
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:finish", () => {
        // Memastikan HSStaticMethods, HSComboBox, dan HSInputNumber ada sebelum memanggilnya
        if (window.HSStaticMethods?.autoInit) {
            window.HSComboBox.autoInit(); // Memanggil autoInit dari HSComboBox
            window.HSInputNumber.autoInit(); // Memanggil autoInit dari HSInputNumber
            window.HSStaticMethods.autoInit(); // Memanggil autoInit dari HSStaticMethods
        }
    });
});
