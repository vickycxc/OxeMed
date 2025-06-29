# OxeMed - Respiratory Health Monitoring and Consultation Platform

OxeMed adalah platform web interaktif yang dirancang untuk pemantauan kesehatan pernapasan secara real-time dan konsultasi langsung dengan tenaga medis profesional. Sistem ini memungkinkan pengguna untuk melacak tanda-tanda vital seperti saturasi oksigen (SpO2) dan detak jantung, serta terhubung secara aman dengan dokter untuk mendapatkan saran medis yang tepat waktu.

# Key Features
1. Health Test & Monitoring: Memungkinkan pengguna melakukan tes mandiri untuk saturasi oksigen (SpO2) dan detak jantung dengan panduan yang jelas.
2. Live Doctor Consultation: Menghubungkan pengguna dengan dokter melalui fitur obrolan (chat) yang aman dan real-time untuk mendapatkan nasihat profesional.
3. AI-Powered Preliminary Insights: Memanfaatkan Google GenAI (Gemini) untuk memberikan analisis dan wawasan awal selama sesi konsultasi berlangsung.
4. Digital Medical History (Login Required): Secara otomatis menyimpan riwayat hasil tes dan catatan konsultasi, yang dapat diakses oleh pengguna setelah masuk ke akun.
5. Responsive Interface: Menampilkan antarmuka ramah pengguna yang dibangun dengan React untuk pengalaman optimal di berbagai perangkat.

# Tech Stack:
- Frontend: React.js (Vite), Zustand, Socket.io Client, Axios
- Backend: Node.js, Express.js, Sequelize ORM, Google GenAI (Gemini), Socket.io
- Database: MySQL

## Cara Instalasi:

1. Nyalakan XAMPP, buat database baru bernama oxemed
2. Buka terminal, pastikan direktori sudah di OxeMed (cd OxeMed)
3. Pindah direktori ke backend dengan menjalankan 'cd backend/'
4. Jalankan 'npm install'
5. Jalankan 'npm run dev'
6. Buka terminal baru, kali ini arahkan ke direktori frontend
7. Jalankan 'npm install'
8. Jalankan 'npm run dev'
9. Buka browser, ketik 'http://localhost:5173' (localhost yang muncul ketika menjalankan frontend)
10. Apabila Menggunakan di localhost, cari url "https://api.oxemed.live/api" di file axios.js dan useAuthStore.js dan ganti menjadi "http:localhost:3000/api"
11. OxeMed siap digunakan

repository juga tersedia di: https://github.com/vickycxc/OxeMed
