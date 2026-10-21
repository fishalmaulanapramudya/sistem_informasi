# Alur Routing di Frontend Vue

Dokumen ini menjelaskan bagaimana routing bekerja di aplikasi frontend ini, khususnya untuk login dan dashboard.

## 1. Tujuan routing

Routing digunakan untuk mengatur tampilan berdasarkan URL yang sedang dibuka. Contoh:

- `/` -> halaman login
- `/dashboard` -> halaman dashboard

Dengan routing, aplikasi tidak perlu menampilkan semua halaman dalam satu file. Setiap halaman dipisah ke komponen sendiri.

---

## 2. Struktur utama yang terlibat

Pada aplikasi ini ada 3 bagian penting:

1. `main.ts`  
   File ini memulai aplikasi Vue dan menghubungkan router.

2. `App.vue`  
   Komponen utama yang menampilkan halaman sesuai route aktif.

3. `src/router/index.ts`  
   File tempat semua definisi route dibuat.

---

## 3. File `main.ts`

Berikut syntax yang dipakai:

```ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

Penjelasan:

- `createApp(App)` membuat instance Vue
- `.use(router)` mengaktifkan router di aplikasi
- `.mount('#app')` menempelkan aplikasi ke elemen HTML dengan id `app`

Artinya, semua halaman akan dirender lewat router.

---

## 4. File `App.vue`

Syntaxnya seperti ini:

```vue
<template>
  <router-view />
</template>
```

`router-view` adalah tempat di mana komponen halaman yang sesuai URL akan ditampilkan.

Contohnya:

- jika URL `/` maka tampilkan halaman login
- jika URL `/dashboard` maka tampilkan halaman dashboard

---

## 5. File router `src/router/index.ts`

Berikut syntax lengkapnya:

```ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import HalamanLogin from '../halaman_login/template/HalamanLogin.vue'
import DashboardPage from '../dashboard/template/DashboardPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: HalamanLogin,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

### Penjelasan per bagian:

#### Import router
```ts
import { createRouter, createWebHistory } from 'vue-router'
```

- `createRouter` membuat router
- `createWebHistory` menggunakan history URL browser, bukan hash URL

#### Definisi route
```ts
const routes: RouteRecordRaw[] = [
```

`routes` adalah array yang berisi daftar halaman. Setiap halaman memiliki:

- `path`: URL yang dipanggil
- `name`: nama route
- `component`: komponen Vue yang ditampilkan

#### Contoh route login
```ts
{
  path: '/',
  name: 'login',
  component: HalamanLogin,
}
```

Artinya:

- saat URL adalah `/`, tampilkan `HalamanLogin`

#### Contoh route dashboard
```ts
{
  path: '/dashboard',
  name: 'dashboard',
  component: DashboardPage,
}
```

Artinya:

- saat URL adalah `/dashboard`, tampilkan `DashboardPage`

#### Membuat router
```ts
const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

- `history` menggunakan URL murni seperti `/dashboard`
- `routes` dihubungkan ke router

---

## 6. Cara navigasi antara halaman

Untuk pindah halaman dari komponen, gunakan `useRouter()` dan `router.push()`.

Contoh syntax:

```ts
import { useRouter } from 'vue-router'

const router = useRouter()
router.push('/dashboard')
```

Contoh ini dipakai saat login berhasil. Setelah submit form, program memanggil:

```ts
router.push('/dashboard')
```

Maka browser akan berpindah ke halaman dashboard.

---

## 7. Contoh alur login ke dashboard

Urutan alurnya seperti ini:

1. User membuka URL `/`
2. Router menampilkan komponen `HalamanLogin`
3. User mengisi username dan password
4. Form di-submit
5. Kode login memanggil `router.push('/dashboard')`
6. Router menangkap URL `/dashboard`
7. Router menampilkan komponen `DashboardPage`

Flow singkat:

```text
URL / -> HalamanLogin -> submit -> router.push('/dashboard') -> DashboardPage
```

---

## 8. Konsep penting dalam Vue Router

Beberapa konsep utama:

- `path` = alamat URL
- `name` = nama route untuk memudahkan referensi
- `component` = file Vue yang tampil
- `router-view` = area render konten halaman
- `router.push()` = pindah ke route tertentu

---

## 9. Kesimpulan

Aplikasi ini memakai routing berbasis Vue Router dengan pola yang sederhana:

- login di `/`
- dashboard di `/dashboard`
- semua halaman di-render lewat `router-view`
- semua route didefinisikan di `src/router/index.ts`

Dengan pola ini, project tetap rapi dan mudah dikembangkan jika nanti ditambah halaman lain seperti siswa, kelas, atau profil.
