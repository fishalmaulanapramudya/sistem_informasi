# Sistem Informasi Berbasis Web

Proyek sistem informasi berbasis web yang terdiri dari frontend Vue dan backend Express, dengan PostgreSQL sebagai database. Struktur aplikasi sudah dipisahkan untuk memudahkan pengembangan, deployment, dan integrasi API.

## Deskripsi

Aplikasi ini dibangun untuk mendukung:

- autentikasi pengguna
- akses dashboard
- manajemen data dasar
- pemisahan frontend dan backend secara independent
- integrasi API yang lebih terstruktur dan mudah dikembangkan

## Stack Teknologi

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

### Infra & Dev
- Docker Compose
- PostgreSQL container

## Struktur Proyek

```bash
sistem_informasi/
├── backend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── dockerfile
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── dockerfile
├── compose.yaml
├── README.md
├── generate_jwt_secret.py
├── backup/
└── bahan/
```

## Integrasi Frontend dan Backend

Frontend sudah dikonfigurasi untuk memanggil backend melalui `fetch` dengan base URL:

```env
VITE_API_URL=http://localhost:3000
```

Backend menyediakan endpoint health untuk pengecekan koneksi:

```bash
http://localhost:3000/api/health
```

Respons yang berhasil:

```json
{
  "success": true,
  "message": "Backend LMS berjalan.",
  "environment": "development"
}
```

## Menjalankan Aplikasi

### Opsi 1: Pakai Docker Compose (direkomendasikan)

```bash
cd /home/fishal/project/sistem_informasi
docker compose up --build -d
```

Akses:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- PostgreSQL: localhost:5433

### Opsi 2: Jalankan lokal tanpa Docker

#### Frontend

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

#### Backend

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Backend menggunakan variabel berikut secara default bila tidak didefinisikan:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=dev-secret-change-me
FRONTEND_URL=http://localhost:5173
```

Pada konfigurasi Docker, variabel tersebut sudah diisi untuk service database dan backend.

## Catatan Perangkat

Saat menjalankan Docker, port 3000 harus bebas. Jika port tersebut masih dipakai oleh proses lain, maka `docker compose up` akan gagal. Solusi yang umum:

```bash
sudo lsof -i :3000
kill <PID>
```

## Roadmap

- [x] Setup frontend dan backend
- [x] Integrasi API dasar
- [x] Setup Docker Compose
- [ ] Autentikasi login dengan JWT
- [ ] CRUD data pengguna
- [ ] Role-based access control
- [ ] Dashboard admin dan user
- [ ] Deployment production

## Catatan Pengembangan

Proyek ini dibuat dengan prinsip modular dan decoupled architecture agar frontend dan backend bisa berkembang secara terpisah, tetap terhubung melalui API, dan lebih mudah dipelihara di masa depan.
