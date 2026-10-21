# Sistem Informasi Berbasis Web

Sistem informasi berbasis web yang dirancang untuk mendukung pengelolaan data, autentikasi aman, dan akses yang terkontrol dengan pendekatan modern. Proyek ini dikembangkan dengan prinsip Clean Architecture, Zero Trust, dan Decoupled Architecture agar sistem lebih mudah dikembangkan, diuji, dan dipelihara.

## Deskripsi Proyek

Proyek ini bertujuan untuk membangun platform sistem informasi yang dapat digunakan untuk mengelola kebutuhan operasional dan bisnis secara terintegrasi. Aplikasi ini dirancang agar:

- Struktur kode terpisah berdasarkan domain dan tanggung jawab
- Keamanan tidak bergantung pada satu lapisan saja
- Frontend dan backend dapat berkembang secara independen
- Setiap komponen mudah diuji dan dipelihara

## Prinsip Arsitektur

### 1. Clean Architecture

Arsitektur dibangun dengan pemisahan yang jelas antara:

- Presentation Layer
- Application Layer
- Domain Layer
- Infrastructure Layer

Tujuannya agar bisnis logic tidak terikat pada framework atau teknologi tertentu. Perubahan pada UI atau database tidak akan mengganggu inti aplikasi.

### 2. Zero Trust

Semua request dianggap tidak aman sebelum diverifikasi. Konsep ini diterapkan melalui:

- Autentikasi dan otorisasi yang jelas
- Validasi token atau session pada setiap request
- Pembatasan akses berdasarkan role dan permission
- Penggunaan HTTPS, cookies aman, dan konfigurasi keamanan yang ketat

### 3. Decoupled Architecture

Frontend dan backend dipisahkan secara jelas agar:

- UI dapat dikembangkan tanpa mengganggu service backend
- API dapat digunakan oleh berbagai client
- Skalabilitas sistem meningkat
- Integrasi ke layanan lain menjadi lebih mudah

## Teknologi yang Digunakan

### Frontend
- Vue 3
- Vite
- TypeScript
- Vue Router

### Backend
- Node.js
- TypeScript
- Express.js
- PostgreSQL
- JWT
- bcrypt

## Struktur Proyek

```bash
project-akhir-lms/
├── backend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── README.md
├── generate_jwt_secret.py
└── backup/
```

## Fitur Utama

- Login dan autentikasi pengguna
- Role-based access control
- Dashboard sistem informasi
- Manajemen data pengguna
- Pemisahan frontend dan backend
- API yang aman dan terdokumentasi dengan jelas
- Struktur kode yang modular dan mudah dikembangkan

## Alur Keamanan (Zero Trust)

1. Pengguna melakukan login
2. Sistem memvalidasi kredensial pengguna
3. Token atau session dibuat secara aman
4. Setiap request memeriksa otorisasi user
5. Akses dibatasi sesuai role/permission
6. Data sensitif tidak dibagikan tanpa validasi lanjutan

## Cara Menjalankan Proyek

### 1. Clone repository

```bash
git clone <url-repository>
cd project-akhir-lms
```

### 2. Menjalankan frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Menjalankan backend

```bash
cd backend
npm install
npm run dev
```

### 4. Build proyek

```bash
cd frontend
npm run build

cd ../backend
npm run build
```

## Environment Variables

Backend memerlukan konfigurasi environment seperti:

```env
PORT=3000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=your_database
```

## Roadmap Pengembangan

- [ ] Setup base project dan struktur folder
- [ ] Implementasi autentikasi aman
- [ ] Penerapan role dan permission
- [ ] Integrasi database PostgreSQL
- [ ] Pengembangan dashboard admin
- [ ] Validasi akses Zero Trust
- [ ] Testing API dan frontend
- [ ] Deployment dan monitoring

## Catatan Pengembangan

Proyek ini dibuat dengan fokus pada kualitas arsitektur, keamanan, dan skalabilitas. Ke depannya, aplikasi ini diharapkan dapat berkembang menjadi sistem informasi yang terstruktur, aman, dan siap digunakan dalam lingkungan nyata.

## Kontribusi

Kontribusi sangat terbuka untuk pengembangan lebih lanjut. Silakan buat branch baru, lakukan perubahan, lalu ajukan pull request dengan penjelasan yang jelas.

## Lisensi

Proyek ini menggunakan lisensi yang dapat disesuaikan dengan kebutuhan tim atau organisasi.
