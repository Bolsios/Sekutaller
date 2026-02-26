// -----------------------------------------------
// Cargar JSON local
// -----------------------------------------------
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        cargarConfiguracion(data.config);
        cargarMenu(data.brands);
        cargarSecciones(data.brands);
    })
    .catch(err => console.error("Error cargando data.json:", err));


// -----------------------------------------------
// APLICAR CONFIGURACIÓN GENERAL
// -----------------------------------------------
function cargarConfiguracion(config) {

    // Título y subtítulo
    document.querySelector(".main-box h1").textContent = config.siteTitle;
    document.querySelector(".main-box p").textContent = config.siteSubtitle;

    // Logo
    document.querySelector(".logo").src = config.logo.image;
    document.querySelector(".logo-text .title").textContent = config.logo.title;
    document.querySelector(".logo-text .subtitle").textContent = config.logo.subtitle;

    // Fondo
    const bgImage = document.querySelector(".bg-image");
    bgImage.src = config.background.image;
    bgImage.style.opacity = config.background.opacity;

    // WhatsApp
    const wa = document.querySelector(".whatsapp-btn");
    const waImg = document.querySelector(".whatsapp-btn img");

    wa.href = `https://wa.me/${config.whatsapp.number}`;
    waImg.src = config.whatsapp.icon;
    wa.querySelector("span").textContent = config.whatsapp.message;
}


// -----------------------------------------------
// CARGAR MENÚ SUPERIOR DE MARCAS
// -----------------------------------------------
function cargarMenu(brands) {
    const menu = document.querySelector(".menu");

    brands.forEach(brand => {
        const link = document.createElement("a");
        link.href = `#${brand.slug}`;
        link.textContent = brand.name;

        menu.appendChild(link);
    });
}


// -----------------------------------------------
// GENERAR SECCIONES DE MANUALES POR MARCA
// -----------------------------------------------
function cargarSecciones(brands) {
    const contenedor = document.createElement("div");
    contenedor.classList.add("secciones-container");

    brands.forEach(brand => {
        
        // Crear sección
        const section = document.createElement("section");
        section.id = brand.slug;
        section.classList.add("brand-section");

        // Título de la marca
        const title = document.createElement("h2");
        title.textContent = brand.name;
        section.appendChild(title);

        // Si no hay manuales
        if (brand.guides.length === 0) {
            const msg = document.createElement("p");
            msg.textContent = "No hay manuales disponibles por el momento.";
            msg.classList.add("no-guides");
            section.appendChild(msg);
        }

        // Crear tarjetas de manuales
        const grid = document.createElement("div");
        grid.classList.add("guide-grid");

        brand.guides.forEach(guide => {

            const card = document.createElement("div");
            card.classList.add("guide-card");

            const guideTitle = document.createElement("h3");
            guideTitle.textContent = guide.title;

            const btn = document.createElement("a");
            btn.href = guide.file;
            btn.textContent = "Abrir";
            btn.classList.add("btn-open");
            btn.target = "_blank";

            card.appendChild(guideTitle);
            card.appendChild(btn);
            grid.appendChild(card);
        });

        section.appendChild(grid);
        contenedor.appendChild(section);
    });

    document.body.appendChild(contenedor);
}
