// Middleware untuk mengatur rute navigasi berdasarkan status otentikasi dan peran pengguna
export default defineNuxtRouteMiddleware(async (to, from) => {
    // Mengecek apakah pengguna sudah login dengan memeriksa cookie 'isLoggedIn'
    const isAuthenticated = useCookie('isLoggedIn').value;

    // Mengecek apakah rute yang dituju adalah halaman login atau registrasi
    const isAuthPage = to.path === '/login' || to.path === '/register';

    // Mengecek apakah rute yang dituju adalah halaman admin
    const isAdminPage = to.path.startsWith('/admin');

    // Mendapatkan data pengguna yang sedang login
    const user: any = useAuth().useAuthUser().value;

    // Mengecek apakah pengguna memiliki peran sebagai Admin
    const isAdmin = user?.role === 'Admin';

    // Jika pengguna sudah login dan mencoba mengakses halaman login/registrasi, arahkan ke halaman admin
    if (isAuthenticated && isAuthPage) {
        return navigateTo('/admin');
    }

    // Jika pengguna belum login dan mencoba mengakses halaman admin, arahkan ke halaman login
    if (!isAuthenticated && isAdminPage) {
        return navigateTo('/login');
    }

    // Jika pengguna mencoba mengakses halaman admin tanpa menjadi Admin, arahkan ke halaman utama
    if (isAdminPage && !isAdmin) {
        return navigateTo('/');
    }
});