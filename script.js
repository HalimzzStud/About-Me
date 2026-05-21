const container = document.getElementById("portofolio-container");

async function loadPortfolio() {
    try {
        const response = await fetch("porto.json");
        const data = await response.json();

        const designData = data.filter(item => item.type === "design");

        designData.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";

            // Menggunakan (item.style || []) untuk jaga-jaga jika "style" tidak ada di JSON
            const tagsHTML = (item.style || [])
                .map(tag => `<span>${tag}</span>`)
                .join("");

            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="content">
                    <h2>${item.title}</h2>
                    <div class="tags">
                        ${tagsHTML}
                    </div>
                    <p>${item.description}</p>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Gagal memuat data portfolio:", error);
    }
}

loadPortfolio();


const container2 = document.getElementById("portofolio-container-web")

async function loadPortfolioWeb() {
    try {
        const response = await fetch("porto.json");
        const data = await response.json();

        const designData = data.filter(item => item.type === "web");

        designData.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";

            // Menggunakan (item.style || []) untuk jaga-jaga jika "style" tidak ada di JSON
            const tagsHTML = (item.tags || [])
                .map(tag => `<span>${tag}</span>`)
                .join("");

            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="content">
                    <h2>${item.title}</h2>
                    <div class="tags">
                        ${tagsHTML}
                    </div>
                    <p>${item.description}</p>
                </div>
            `;

            container2.appendChild(card);
        });
    } catch (error) {
        console.error("Gagal memuat data portfolio:", error);
    }
}

loadPortfolioWeb();