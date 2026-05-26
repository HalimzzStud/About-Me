// Ambil elemen DOM kontainer utama
const designContainer = document.getElementById("portofolio-container");
const webContainer = document.getElementById("portofolio-container-web");

// Ambil elemen DOM komponen Pop-Up
const popUpBox = document.getElementById("cardPopUp");
const popJudul = document.getElementById("popJudul");
const popTags = document.getElementById("popTags");
const popDesc = document.getElementById("popDesc");
const popGambar = document.getElementById("targetGambar");
const closeBtn = document.getElementById("closePopUp");
const panContainer = document.getElementById("left-design");

// --- 1. FUNGSI UTAMA LOAD DATA PORTFOLIO ---
async function initPortfolio() {
    try {
        // Cukup fetch 1 kali untuk efisiensi data
        const response = await fetch("porto.json");
        const data = await response.json();

        // Olah data Design
        const designData = data.filter(item => item.type === "design");
        renderCards(designData, designContainer, "design");

        // Olah data Web
        const webData = data.filter(item => item.type === "web");
        renderCards(webData, webContainer, "web");

    } catch (error) {
        console.error("Gagal memuat data portfolio:", error);
    }
}

// --- 2. FUNGSI UNTUK GENERATE CARD HTML ---
function renderCards(dataArray, targetContainer, type) {
    if (!targetContainer) return;

    dataArray.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.cursor = "pointer"; // Indikator bahwa card bisa diklik

        const kata = item.title.split(' ');
        const judulDipotong = kata.length > 5 
            ? kata.slice(0, 5).join(' ') + '...' 
            : item.title;

        // Tentukan sumber tag (style untuk design, tags untuk web)
        const rawTags = type === "design" ? item.style : item.tags;
        const tagsHTML = (rawTags || [])
        .slice(0, 3)                     // Mengambil hanya 3 elemen pertama
        .map(tag => `<span>${tag}</span>`)
        .join("");

        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="content">
                <h2>${judulDipotong}</h2>
                <div class="tags">${tagsHTML}</div>
                <p>${item.description}</p>
            </div>
        `;

        // EVENT CLICK: Saat card diklik, jalankan fungsi pop-up sambil membawa data item ini
        card.addEventListener("click", () => {
            openPopUp(item, type);
        });

        targetContainer.appendChild(card);
    });
}

// --- 3. FUNGSI MEMBUKA & INJECT DATA POPUP ---
function openPopUp(item, type) {
    // Tembakkan data tulisan ke Pop-up
    popJudul.innerText = item.title;
    popDesc.innerHTML = item.completeDesc || item.description; // Fallback jika completeDesc kosong

    // Tembakkan data tags
    const rawTags = type === "design" ? item.style : item.tags;
    popTags.innerHTML = (rawTags || [])
        .map(tag => `<span>${tag}</span>`)
        .join("");

    // Tembakkan gambar
    popGambar.src = item.image;
    popGambar.alt = item.title;

    // Reset posisi gambar zoom ke tengah dulu sebelum pop-up tampil
    popGambar.style.transform = "translate(0px, 0px)";

    // Tampilkan Pop-Up (Sesuaikan dengan animasi CSS kamu, misal menambah class active)
    popUpBox.style.display = "flex"; 
}

// --- 4. EVENT CLOSE POPUP ---
closeBtn.addEventListener("click", () => {
    popUpBox.style.display = "none";
});

// Tutup pop-up jika user klik area luar card-nya
popUpBox.addEventListener("click", (e) => {
    if (e.target === popUpBox) {
        popUpBox.style.display = "none";
    }
});


// --- 5. LOGIKA ZOOM & PAN MENGIKUTI KURSOR (Hanya berjalan di dalam Pop-up) ---
if (panContainer && popGambar) {
    panContainer.addEventListener('mousemove', (e) => {
        const rect = panContainer.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  

        const xPersen = x / rect.width;
        const yPersen = y / rect.height;

        const sisaLebar = popGambar.offsetWidth - rect.width;
        const sisaTinggi = popGambar.offsetHeight - rect.height;

        const geserX = -(xPersen * sisaLebar);
        const geserY = -(yPersen * sisaTinggi);

        popGambar.style.transform = `translate(${geserX}px, ${geserY}px)`;
    });

    panContainer.addEventListener('mouseleave', () => {
        const rect = panContainer.getBoundingClientRect();
        const sisaLebar = popGambar.offsetWidth - rect.width;
        const sisaTinggi = popGambar.offsetHeight - rect.height;
        
        popGambar.style.transform = `translate(${-sisaLebar / 2}px, ${-sisaTinggi / 2}px)`;
    });
}

// Jalankan inisialisasi aplikasi saat file script.js dimuat
initPortfolio();


const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});