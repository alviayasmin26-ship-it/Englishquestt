const STORAGE_KEYS = { // Objek berisi nama kunci penyimpanan di browser
    player: "englishQuestPlayer", // Kunci untuk menyimpan nama pemain
    xp: "englishQuestXP", // Kunci untuk menyimpan total XP
    completed: "englishQuestCompleted" // Kunci untuk menyimpan level yang sudah selesai
}; // Menutup objek STORAGE_KEYS

const levels = [ // Array data semua level permainan
    { // Objek level 1
        name: "VOCABULARY", // Nama topik level 1
        icon: "📚", // Ikon buku untuk level 1
        questions: [ // Daftar soal level 1
            { question: "Which word means 'rumah'?", emoji: "🏠", answers: ["House", "School", "Market", "Garden"], correct: 0 }, // Soal 1, jawaban benar index 0
            { question: "Which one is a color?", emoji: "🎨", answers: ["Blue", "Chair", "Tiger", "Bread"], correct: 0 }, // Soal 2, jawaban benar index 0
            { question: "Which word means 'buku'?", emoji: "📖", answers: ["Book", "Bag", "Door", "Table"], correct: 0 }, // Soal 3, jawaban benar index 0
            { question: "Which word means 'sekolah'?", emoji: "🏫", answers: ["School", "Kitchen", "River", "Cloud"], correct: 0 }, // Soal 4, jawaban benar index 0
            { question: "Which one is a greeting?", emoji: "👋", answers: ["Hello", "Pencil", "Window", "Apple"], correct: 0 } // Soal 5, jawaban benar index 0
        ] // Menutup daftar soal level 1
    }, // Menutup objek level 1
    { // Objek level 2
        name: "ANIMALS", // Nama topik level 2
        icon: "🐯", // Ikon harimau untuk level 2
        questions: [ // Daftar soal level 2
            { question: "Which animal says 'meow'?", emoji: "🐱", answers: ["Dog", "Cat", "Cow", "Lion"], correct: 1 }, // Soal 1, jawaban benar Cat
            { question: "Who is the king of the jungle?", emoji: "🦁", answers: ["Lion", "Rabbit", "Fish", "Horse"], correct: 0 }, // Soal 2, jawaban benar Lion
            { question: "Which animal can fly?", emoji: "🪽", answers: ["Bird", "Tiger", "Elephant", "Cow"], correct: 0 }, // Soal 3, jawaban benar Bird
            { question: "Which animal lives in water?", emoji: "🐟", answers: ["Fish", "Cat", "Chicken", "Monkey"], correct: 0 }, // Soal 4, jawaban benar Fish
            { question: "Which animal is the largest land animal?", emoji: "🐘", answers: ["Elephant", "Mouse", "Frog", "Duck"], correct: 0 } // Soal 5, jawaban benar Elephant
        ] // Menutup daftar soal level 2
    }, // Menutup objek level 2
    { // Objek level 3
        name: "FRUITS", // Nama topik level 3
        icon: "🍎", // Ikon apel untuk level 3
        questions: [ // Daftar soal level 3
            { question: "Which one is an apple?", emoji: "🍎", answers: ["Apple", "Car", "Cat", "Book"], correct: 0 }, // Soal 1, jawaban benar Apple
            { question: "Which fruit is yellow and long?", emoji: "🍌", answers: ["Orange", "Banana", "Grape", "Watermelon"], correct: 1 }, // Soal 2, jawaban benar Banana
            { question: "Which fruit is orange?", emoji: "🍊", answers: ["Orange", "Pear", "Kiwi", "Mango"], correct: 0 }, // Soal 3, jawaban benar Orange
            { question: "Which fruit is red and small?", emoji: "🍓", answers: ["Strawberry", "Coconut", "Pineapple", "Avocado"], correct: 0 }, // Soal 4, jawaban benar Strawberry
            { question: "Which fruit is green outside and red inside?", emoji: "🍉", answers: ["Watermelon", "Lemon", "Cherry", "Peach"], correct: 0 } // Soal 5, jawaban benar Watermelon
        ] // Menutup daftar soal level 3
    }, // Menutup objek level 3
    { // Objek level 4
        name: "VEHICLES", // Nama topik level 4
        icon: "🚗", // Ikon mobil untuk level 4
        questions: [ // Daftar soal level 4
            { question: "Which vehicle has two wheels?", emoji: "🏍️", answers: ["Motorcycle", "Bus", "Train", "Boat"], correct: 0 }, // Soal 1, jawaban benar Motorcycle
            { question: "Which vehicle travels on rails?", emoji: "🚆", answers: ["Train", "Car", "Plane", "Bicycle"], correct: 0 }, // Soal 2, jawaban benar Train
            { question: "Which vehicle flies?", emoji: "✈️", answers: ["Airplane", "Bus", "Ship", "Taxi"], correct: 0 }, // Soal 3, jawaban benar Airplane
            { question: "Which vehicle sails on water?", emoji: "🚢", answers: ["Ship", "Truck", "Helicopter", "Scooter"], correct: 0 }, // Soal 4, jawaban benar Ship
            { question: "Which vehicle has four wheels and is used by families?", emoji: "🚙", answers: ["Car", "Rocket", "Submarine", "Hot air balloon"], correct: 0 } // Soal 5, jawaban benar Car
        ] // Menutup daftar soal level 4
    } // Menutup objek level 4
]; // Menutup array levels

let currentLevel = 0; // Menyimpan nomor level yang sedang dimainkan
let currentQuestion = 0; // Menyimpan nomor soal yang sedang tampil
let score = 0; // Menyimpan skor level saat ini
let totalXP = Number(localStorage.getItem(STORAGE_KEYS.xp) || 0); // Mengambil XP tersimpan, jika kosong jadi 0
let completedLevels = JSON.parse(localStorage.getItem(STORAGE_KEYS.completed) || "[]"); // Mengambil daftar level selesai dari browser

function showPage(id) { // Fungsi untuk menampilkan satu halaman dan menyembunyikan yang lain
    document.querySelectorAll(".page").forEach((page) => { // Mengambil semua elemen berkelas page
        page.classList.remove("active"); // Menghapus class active agar halaman tersembunyi
    }); // Menutup perulangan halaman
    document.getElementById(id).classList.add("active"); // Menambah class active ke halaman yang diminta
} // Menutup fungsi showPage

function renderMap() { // Fungsi untuk menggambar tombol level di peta
    const container = document.getElementById("levels"); // Mengambil wadah tombol level
    container.innerHTML = ""; // Mengosongkan isi wadah sebelum diisi ulang

    levels.forEach((level, index) => { // Mengulang setiap level beserta nomor urutnya
        const unlocked = index === 0 || completedLevels.includes(index - 1); // Level 1 selalu terbuka, lainnya terbuka jika level sebelumnya selesai
        const done = completedLevels.includes(index); // Mengecek apakah level ini sudah pernah diselesaikan
        const button = document.createElement("button"); // Membuat elemen tombol baru
        button.className = "level-card" + (done ? " done" : ""); // Memberi class kartu, plus done jika sudah selesai
        button.type = "button"; // Menetapkan jenis tombol biasa, bukan submit
        button.disabled = !unlocked; // Menonaktifkan tombol jika masih terkunci
        // Isi tombol: ikon atau gembok, nomor level, nama topik, dan status
        button.innerHTML = `
            <span>${unlocked ? level.icon : "🔒"}</span>
            <b>LEVEL ${index + 1}</b>
            <small>${level.name}</small>
            <em class="level-status">${done ? "★ Selesai" : unlocked ? "Siap dimainkan" : "Terkunci"}</em>
        `;
        if (unlocked) { // Jika level sudah terbuka
            button.addEventListener("click", () => startQuiz(index)); // Klik tombol akan memulai kuis level itu
        } // Menutup if unlocked
        container.appendChild(button); // Memasukkan tombol ke dalam peta
    }); // Menutup perulangan level
} // Menutup fungsi renderMap

function startGame() { // Fungsi saat pemain menekan START QUEST
    const input = document.getElementById("playerInput"); // Mengambil kotak nama
    const name = input.value.trim(); // Mengambil teks nama dan menghapus spasi ujung
    const message = document.getElementById("nameMessage"); // Mengambil tempat pesan error

    if (name === "") { // Jika nama masih kosong
        message.textContent = "⚠️ Masukkan nama kamu terlebih dahulu!"; // Tampilkan peringatan
        input.focus(); // Fokuskan kursor ke kotak nama
        return; // Hentikan fungsi, jangan masuk game
    } // Menutup if nama kosong

    localStorage.setItem(STORAGE_KEYS.player, name); // Simpan nama pemain di browser
    document.getElementById("playerName").textContent = name; // Tampilkan nama di topbar
    document.getElementById("welcomeName").textContent = name.toUpperCase(); // Tampilkan nama kapital di sapaan
    document.getElementById("xp").textContent = totalXP; // Tampilkan XP di topbar
    renderMap(); // Gambar peta level
    showPage("gamePage"); // Pindah ke halaman peta
} // Menutup fungsi startGame

function startQuiz(level) { // Fungsi memulai kuis pada level tertentu
    currentLevel = level; // Simpan level yang dipilih
    currentQuestion = 0; // Mulai dari soal pertama
    score = 0; // Reset skor level
    document.getElementById("levelTitle").textContent = levels[level].name; // Tampilkan nama level di header kuis
    document.getElementById("questionTotal").textContent = levels[level].questions.length; // Tampilkan jumlah soal
    showPage("quizPage"); // Tampilkan halaman kuis
    renderQuestion(); // Tampilkan soal pertama
} // Menutup fungsi startQuiz

function renderQuestion() { // Fungsi menampilkan satu soal
    const data = levels[currentLevel].questions[currentQuestion]; // Ambil data soal sekarang
    const total = levels[currentLevel].questions.length; // Hitung total soal di level ini

    document.getElementById("questionEmoji").textContent = data.emoji; // Tampilkan emoji soal
    document.getElementById("questionText").textContent = data.question; // Tampilkan teks pertanyaan
    document.getElementById("quizScore").textContent = score; // Perbarui skor di header
    document.getElementById("questionNumber").textContent = currentQuestion + 1; // Tampilkan nomor soal mulai 1
    document.getElementById("progressBar").style.width = ((currentQuestion + 1) / total) * 100 + "%"; // Isi batang progres

    const answers = document.getElementById("answers"); // Ambil wadah tombol jawaban
    answers.innerHTML = ""; // Kosongkan jawaban lama

    data.answers.forEach((answer, index) => { // Ulangi setiap pilihan jawaban
        const button = document.createElement("button"); // Buat tombol jawaban
        button.className = "answer"; // Beri class gaya jawaban
        button.type = "button"; // Jenis tombol biasa
        button.textContent = String.fromCharCode(65 + index) + ". " + answer; // Tulis A. B. C. D. plus teks jawaban
        button.addEventListener("click", () => checkAnswer(index, button)); // Saat diklik, cek benar atau salah
        answers.appendChild(button); // Masukkan tombol ke wadah jawaban
    }); // Menutup perulangan jawaban
} // Menutup fungsi renderQuestion

function checkAnswer(selected, clickedButton) { // Fungsi memeriksa jawaban yang dipilih
    const data = levels[currentLevel].questions[currentQuestion]; // Ambil data soal sekarang
    const buttons = document.querySelectorAll(".answer"); // Ambil semua tombol jawaban

    buttons.forEach((button) => { // Ulangi setiap tombol jawaban
        button.disabled = true; // Matikan tombol agar tidak bisa diklik lagi
    }); // Menutup perulangan menonaktifkan tombol

    if (selected === data.correct) { // Jika index yang dipilih sama dengan jawaban benar
        clickedButton.classList.add("correct"); // Warnai hijau tombol yang diklik
        score += 100; // Tambah 100 poin
    } else { // Jika jawaban salah
        clickedButton.classList.add("wrong"); // Warnai merah tombol yang diklik
        buttons[data.correct].classList.add("correct"); // Tunjukkan jawaban yang benar
    } // Menutup if jawaban

    document.getElementById("quizScore").textContent = score; // Perbarui tampilan skor

    setTimeout(() => { // Tunggu 800 milidetik lalu lanjut
        currentQuestion += 1; // Naik ke nomor soal berikutnya
        if (currentQuestion < levels[currentLevel].questions.length) { // Jika masih ada soal
            renderQuestion(); // Tampilkan soal berikutnya
        } else { // Jika soal sudah habis
            finishLevel(); // Selesaikan level
        } // Menutup if sisa soal
    }, 800); // Waktu jeda 800 milidetik
} // Menutup fungsi checkAnswer

function finishLevel() { // Fungsi menampilkan hasil setelah kuis selesai
    const maxScore = levels[currentLevel].questions.length * 100; // Skor maksimal = jumlah soal dikali 100
    const stars = score === maxScore ? 3 : score >= maxScore * 0.6 ? 2 : 1; // 3 bintang jika sempurna, 2 jika >= 60%, selain itu 1

    totalXP += score; // Tambahkan skor level ke total XP
    localStorage.setItem(STORAGE_KEYS.xp, String(totalXP)); // Simpan total XP ke browser

    if (!completedLevels.includes(currentLevel)) { // Jika level ini belum tercatat selesai
        completedLevels.push(currentLevel); // Tambahkan nomor level ke daftar selesai
        localStorage.setItem(STORAGE_KEYS.completed, JSON.stringify(completedLevels)); // Simpan daftar selesai ke browser
    } // Menutup if level baru selesai

    document.getElementById("finalScore").textContent = score; // Tampilkan skor di kartu hasil
    document.getElementById("resultStars").textContent = "⭐".repeat(stars); // Tampilkan bintang sesuai hasil
    document.getElementById("resultTitle").textContent = // Isi judul hasil
        stars === 3 ? "PERFECT QUEST!" : "LEVEL COMPLETE!"; // Sempurna atau sekadar selesai
    document.getElementById("resultMessage").textContent = // Isi pesan motivasi
        stars === 3 // Jika 3 bintang
            ? "🎉 Sempurna! Kamu menguasai level ini." // Pesan sempurna
            : stars === 2 // Jika 2 bintang
                ? "👏 Bagus! Coba lagi untuk skor sempurna." // Pesan bagus
                : "💪 Terus berlatih, petualang English Quest!"; // Pesan semangat

    showPage("resultPage"); // Tampilkan halaman hasil
} // Menutup fungsi finishLevel

function backToGame() { // Fungsi kembali ke peta
    document.getElementById("xp").textContent = totalXP; // Perbarui XP di topbar
    renderMap(); // Gambar ulang peta agar status level terbaru
    showPage("gamePage"); // Tampilkan halaman peta
} // Menutup fungsi backToGame

window.addEventListener("DOMContentLoaded", () => { // Jalankan kode ini setelah HTML selesai dimuat
    const savedName = localStorage.getItem(STORAGE_KEYS.player); // Ambil nama yang pernah disimpan
    if (savedName) { // Jika ada nama tersimpan
        document.getElementById("playerInput").value = savedName; // Isi otomatis kotak nama
    } // Menutup if nama tersimpan

    document.getElementById("startButton").addEventListener("click", startGame); // Klik START QUEST memanggil startGame
    document.getElementById("playerInput").addEventListener("keydown", (event) => { // Dengarkan tombol keyboard di kotak nama
        if (event.key === "Enter") { // Jika yang ditekan adalah Enter
            startGame(); // Mulai game
        } // Menutup if Enter
    }); // Menutup listener keyboard
    document.getElementById("backFromQuiz").addEventListener("click", backToGame); // Tombol MAP di kuis kembali ke peta
    document.getElementById("backFromResult").addEventListener("click", backToGame); // Tombol BACK TO MAP di hasil kembali ke peta
}); // Menutup listener DOMContentLoaded
