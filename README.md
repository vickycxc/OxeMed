# OxeMed - Platform Pemantauan Kesehatan Pernapasan dan Konsultasi

OxeMed adalah platform web interaktif yang dirancang untuk pemantauan kesehatan pernapasan secara *real-time* dan konsultasi langsung dengan tenaga medis profesional.

## 📜 Deskripsi Singkat

Platform ini bertujuan untuk memberikan akses mudah bagi pengguna untuk memantau tanda-tanda vital esensial seperti saturasi oksigen (SpO2) dan detak jantung. Selain itu, OxeMed menyediakan jembatan komunikasi yang aman antara pengguna dan dokter melalui fitur konsultasi daring, didukung oleh analisis awal berbasis AI untuk wawasan yang lebih cepat.

## ✨ Fitur Utama

- **Tes & Pemantauan Kesehatan:** Melakukan tes mandiri untuk saturasi oksigen (SpO2) dan detak jantung dengan panduan interaktif.
- **Konsultasi Dokter Langsung:** Fitur obrolan (*chat*) *real-time* yang aman untuk terhubung langsung dengan dokter profesional.
- **Wawasan Awal Berbasis AI:** Integrasi dengan Google GenAI (Gemini) untuk memberikan analisis pendahuluan selama sesi konsultasi.
- **Riwayat Medis Digital:** Penyimpanan riwayat hasil tes dan transkrip konsultasi secara otomatis yang dapat diakses pengguna setelah *login*.
- **Antarmuka Responsif:** Dibangun dengan React untuk pengalaman pengguna yang optimal di berbagai perangkat, termasuk *desktop* dan *mobile*.

## 🏗️ Arsitektur Proyek

```
Struktur proyek ini diorganisir untuk memisahkan antara logika frontend, backend, dan aset lainnya.
OxeMed/
├── backend/          # Kode sumber sisi server (Node.js, Express)
├── frontend/         # Kode sumber sisi klien (React.js, Vite)
├── .gitignore        # Konfigurasi file yang diabaikan oleh Git
├── LICENSE           # File lisensi proyek
├── package.json      # Manifes proyek, berisi daftar skrip dan dependensi
└── README.md         # File dokumentasi yang sedang Anda baca
```

## 🚀 Teknologi yang Digunakan

### Frontend
- **Framework**: React.js (Vite)
- **State Management**: Zustand
- **Komunikasi Real-time**: Socket.io Client
- **HTTP Client**: Axios

### Backend
- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **AI**: Google GenAI (Gemini)
- **Komunikasi Real-time**: Socket.io
- **Cloud Storage**: Cloudinary

### Database
- MySQL

## ⚙️ Cara Instalasi atau Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda.

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/vickycxc/OxeMed.git](https://github.com/vickycxc/OxeMed.git)
    cd OxeMed
    ```

2.  **Setup Database**
    - Nyalakan layanan Apache dan MySQL di XAMPP.
    - Buka phpMyAdmin (`http://localhost/phpmyadmin`) dan buat database baru dengan nama `oxemed`.

3.  **Konfigurasi Backend**
    - Pindah ke direktori backend.
    ```bash
    cd backend
    ```
    - Instal semua dependensi yang dibutuhkan.
    ```bash
    npm install
    ```
    - Jalankan server backend.
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:3000`.

4.  **Konfigurasi Frontend**
    - Buka terminal baru dan arahkan ke direktori root proyek (`OxeMed`).
    - Pindah ke direktori frontend.
    ```bash
    cd frontend
    ```
    - Instal semua dependensi yang dibutuhkan.
    ```bash
    npm install
    ```

5.  **Konfigurasi Environment Frontend**
    - Buka file `src/lib/axios.js` dan `src/store/useAuthStore.js`.
    - Cari URL `https://api.oxemed.live/api` dan ganti dengan alamat API lokal Anda: `http://localhost:3000/api`.

6.  **Jalankan Frontend**
    - Jalankan server development frontend.
    ```bash
    npm run dev
    ```
    - Buka browser dan akses alamat yang muncul di terminal (biasanya `http://localhost:5173`).

7.  Platform OxeMed siap digunakan di lingkungan lokal Anda.

## 🌐 Cara Deploy

Proyek ini telah di-deploy dan dapat diakses melalui URL berikut:

-   **Live Demo**: [https://app.oxemed.live](https://app.oxemed.live) / http://localhost:5173
-   **API Endpoint**: `https://api.oxemed.live/api` / http://localhost:3000/api

## 📸 Screenshot / Demo

*(Disarankan untuk menambahkan beberapa screenshot di sini untuk menampilkan antarmuka pengguna)*

**Contoh Screenshot yang bisa ditambahkan:**
-   Halaman Utama (Landing Page)
-   Halaman Tes Kesehatan (SpO2 & Detak Jantung)
-   Tampilan Antarmuka Konsultasi Chat dengan Dokter
-   Halaman Riwayat Kesehatan Pengguna

## 🤝 Kontribusi

Kontribusi untuk pengembangan OxeMed sangat diharapkan. Jika Anda ingin berkontribusi, silakan lakukan *fork* pada repositori ini dan buat *pull request* dengan penjelasan detail mengenai perubahan atau penambahan fitur yang Anda ajukan.

1.  Fork repositori ini.
2.  Buat branch fitur baru (`git checkout -b fitur/NamaFiturBaru`).
3.  Commit perubahan Anda (`git commit -m 'Menambahkan fitur X'`).
4.  Push ke branch Anda (`git push origin fitur/NamaFiturBaru`).
5.  Buka *Pull Request*.

## 📜 Lisensi

Hak cipta dilindungi dan dimiliki oleh pengembang. Proyek ini menggunakan lisensi [MIT](https://opensource.org/licenses/MIT), kecuali jika disebutkan lain.

## 📧 Kontak

Jika Anda memiliki pertanyaan, saran, atau ingin berdiskusi lebih lanjut, jangan ragu untuk menghubungi pengembang utama.

-   **GitHub**: [vickycxc](https://github.com/vickycxc)