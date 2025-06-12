// Datos de productos
const products = [
    { id: 1, name: "Alimento Royal Canin Perro", img: "assets/2.png", pet: "Perros", brand: "Royal Canin", ofert: "-20%", price: 120, age: 3, grainFree: true, hypoallergenic: false, weightControl: true, freeShipping: true },
    { id: 2, name: "Alimento Pedigree Gato", img: "assets/2.png", pet: "Gatos", brand: "Pedigree", ofert: "-10%", price: 90, age: 1, grainFree: false, hypoallergenic: true, weightControl: false, freeShipping: false },
    { id: 3, name: "Purina para Hamster", img: "assets/2.png", pet: "Hamsters", brand: "Purina", ofert: "", price: 30, age: 2, grainFree: true, hypoallergenic: true, weightControl: false, freeShipping: true },
    { id: 4, name: "Canbo Senior Perro", img: "assets/2.png", pet: "Perros", brand: "Canbo", ofert: "Nuevo", price: 110, age: 7, grainFree: false, hypoallergenic: false, weightControl: true, freeShipping: true },
    { id: 5, name: "Ricocan Junior", img: "assets/2.png", pet: "Perros", brand: "Ricocan", ofert: "", price: 85, age: 1, grainFree: false, hypoallergenic: false, weightControl: false, freeShipping: false },
    { id: 6, name: "Hill's Diet Gato", img: "assets/2.png", pet: "Gatos", brand: "Hill's Science", ofert: "", price: 140, age: 4, grainFree: true, hypoallergenic: true, weightControl: true, freeShipping: true },
    { id: 7, name: "Alimento Premium Royal Canin Gato", img: "assets/2.png", pet: "Gatos", brand: "Royal Canin", ofert: "", price: 130, age: 5, grainFree: false, hypoallergenic: true, weightControl: true, freeShipping: false },
    { id: 8, name: "Purina Puppy", img: "assets/2.png", pet: "Perros", brand: "Purina", ofert: "-10%", price: 95, age: 0.5, grainFree: false, hypoallergenic: false, weightControl: false, freeShipping: true },
    { id: 9, name: "Hill's Small Breed Perro", img: "assets/2.png", pet: "Perros", brand: "Hill's Science", ofert: "", price: 150, age: 6, grainFree: true, hypoallergenic: false, weightControl: true, freeShipping: true },
    { id: 10, name: "Canbo Fit Gato", img: "assets/2.png", pet: "Gatos", brand: "Canbo", ofert: "Nuevo", price: 100, age: 2, grainFree: false, hypoallergenic: true, weightControl: false, freeShipping: false }
];

// Variables globales
let currentSort = "relevancia"; // valor por defecto

// Elementos del DOM
const rangeInput = document.getElementById("customRange1");
const rangeValue = document.getElementById("rangeValue");
const offcanvasRangeInput = document.getElementById("offcanvas-customRange1");
const offcanvasRangeValue = document.getElementById("offcanvas-rangeValue");

// Función para mostrar productos
function displayProducts(filtered) {
    const container = document.getElementById("productList");
    container.innerHTML = "";
    if (filtered.length === 0) {
        container.innerHTML = "<p class='text-center'>No se encontraron productos.</p>";
        return;
    }

    filtered.forEach(product => {
        const div = document.createElement("div");
        div.className = "col-md-4 col-sm-6 mb-4";
        div.innerHTML = `
            <a href="canbo-pate.html" class="text-decoration-none text-black">
                <div class="product-card">
                    <div class="${product.ofert ? "product-badge" : ""}">${product.ofert}</div>
                    <img src="${product.img}" alt="Croquetas Premium" class="img-fluid">
                    <div class="product-body">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-brand">${product.brand}</p>
                        <div class="d-flex align-items-center mb-2">
                            <span class="product-price">s/${product.price}</span>
                            <span class="product-old-price ms-2">s/99.90</span>
                        </div>
                        <div class="rating mb-2">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span class="small ms-1">(42)</span>
                        </div>
                        <div class="d-flex flex-wrap mb-2">
                            <span class="badge bg-light text-dark me-1 mb-1">${product.pet}</span>
                            <span class="badge bg-light text-dark me-1 mb-1">${product.age}</span>
                            <span class="badge bg-light text-dark me-1 mb-1">${product.freeShipping ? "Gratis" : "No disponible"}</span>
                        </div>
                        <button class="btn btn-add-to-cart">
                            <i class="fas fa-shopping-cart me-1"></i> Añadir
                        </button>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(div);
    });
}

// Función para obtener valores seleccionados (compatible con offcanvas)
function getCheckedValues(baseIds) {
    const values = new Set();
    
    baseIds.forEach(id => {
        // Buscar en el accordion principal
        const mainCheckbox = document.getElementById(id);
        if (mainCheckbox?.checked) {
            values.add(mainCheckbox.labels[0]?.textContent.trim());
        }
        
        // Buscar en el offcanvas
        const offcanvasCheckbox = document.getElementById(`offcanvas-${id}`);
        if (offcanvasCheckbox?.checked) {
            values.add(offcanvasCheckbox.labels[0]?.textContent.trim());
        }
    });
    
    return Array.from(values);
}

// Función para aplicar filtros
function applyFilters() {
    // Obtener valores seleccionados
    const selectedPets = getCheckedValues(["mascotaPerro", "mascotaGato", "mascotaHamster"]);
    const selectedBrands = getCheckedValues(["marcaRoyal", "marcaPedigree", "marcaPurina", "marcaCanbo", "marcaRicocan", "marcaHills"]);
    
    // Obtener rango de precios (de ambos lugares)
    const minPriceMain = parseFloat(document.getElementById("precioMin")?.value) || 0;
    const maxPriceMain = parseFloat(document.getElementById("precioMax")?.value) || Infinity;
    const minPriceOffcanvas = parseFloat(document.getElementById("offcanvas-precioMin")?.value) || 0;
    const maxPriceOffcanvas = parseFloat(document.getElementById("offcanvas-precioMax")?.value) || Infinity;
    
    // Usar el valor más restrictivo de ambos
    const minPrice = Math.max(minPriceMain, minPriceOffcanvas);
    const maxPrice = Math.min(maxPriceMain, maxPriceOffcanvas);
    
    // Obtener edad (de ambos lugares)
    const ageMain = parseFloat(rangeInput?.value) || 100;
    const ageOffcanvas = parseFloat(offcanvasRangeInput?.value) || 100;
    const age = Math.min(ageMain, ageOffcanvas);
    
    // Obtener otras opciones (de ambos lugares)
    const envioGratis = document.getElementById("envioGratis")?.checked || document.getElementById("offcanvas-envioGratis")?.checked;
    const grainFree = document.getElementById("caracteristicaGrano")?.checked || document.getElementById("offcanvas-caracteristicaGrano")?.checked;
    const hypo = document.getElementById("caracteristicaHipo")?.checked || document.getElementById("offcanvas-caracteristicaHipo")?.checked;
    const weight = document.getElementById("caracteristicaPeso")?.checked || document.getElementById("offcanvas-caracteristicaPeso")?.checked;

    // Filtrar productos
    const filtered = products.filter(p => {
        return (
            (selectedPets.length === 0 || selectedPets.includes(p.pet)) &&
            (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
            p.price >= minPrice &&
            p.price <= maxPrice &&
            p.age <= age &&
            (!envioGratis || p.freeShipping) &&
            (!grainFree || p.grainFree) &&
            (!hypo || p.hypoallergenic) &&
            (!weight || p.weightControl)
        );
    });

    // Ordenar según opción seleccionada
    switch (currentSort) {
        case "precio-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
        case "precio-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
        case "valorados":
            // Simulado con id descendente, cámbialo si tienes valoraciones reales
            filtered.sort((a, b) => b.id - a.id);
            break;
        case "novedades":
            // Los productos con ofert "Nuevo" primero
            filtered.sort((a, b) => (b.ofert === "Nuevo") - (a.ofert === "Nuevo"));
            break;
        default:
            break; // relevancia = sin ordenamiento
    }

    // Mostrar resultados
    displayProducts(filtered);
}

// Función para sincronizar los controles de rango
function syncRangeInputs(from = "main") {
    if (rangeInput && offcanvasRangeInput) {
        if (from === "main") {
            offcanvasRangeInput.value = rangeInput.value;
            if (rangeValue) rangeValue.textContent = rangeInput.value;
            if (offcanvasRangeValue) offcanvasRangeValue.textContent = rangeInput.value;
        } else if (from === "offcanvas") {
            rangeInput.value = offcanvasRangeInput.value;
            if (offcanvasRangeValue) offcanvasRangeValue.textContent = offcanvasRangeInput.value;
            if (rangeValue) rangeValue.textContent = offcanvasRangeInput.value;
        }
    }
}


// Función para inicializar eventos
function initEventListeners() {
    // Eventos para el accordion principal
    const mainFilterInputs = document.querySelectorAll("input[type='checkbox'], input[type='radio'], input[type='range'], input[type='number']");
    mainFilterInputs.forEach(input => {
        input.addEventListener("change", applyFilters);
    });

    // Eventos para el offcanvas (se asignan cuando se abre)
    document.getElementById('filtros')?.addEventListener('shown.bs.offcanvas', function() {
        const offcanvasInputs = document.querySelectorAll('#filtros input[type="checkbox"], #filtros input[type="range"], #filtros input[type="number"]');
        offcanvasInputs.forEach(input => {
            input.addEventListener("change", applyFilters);
        });
    });

    // Evento para el rango principal
   // Rango principal
if (rangeInput) {
    rangeInput.addEventListener("input", function() {
        rangeValue.textContent = this.value;
        syncRangeInputs("main");
        applyFilters();
    });
}

// Rango del offcanvas
if (offcanvasRangeInput) {
    offcanvasRangeInput.addEventListener("input", function() {
        offcanvasRangeValue.textContent = this.value;
        syncRangeInputs("offcanvas");
        applyFilters();
    });
}


    // Manejar selección del dropdown de orden
    document.querySelectorAll("#sortDropdownMenu a").forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            currentSort = this.getAttribute("data-sort");
            document.getElementById("sortDropdownBtn").textContent = "Ordenar por: " + this.textContent;
            applyFilters();
        });
    });
}

// Inicialización
document.addEventListener("DOMContentLoaded", function() {
    // Mostrar todos los productos al cargar
    displayProducts(products);
    
    // Inicializar event listeners
    initEventListeners();
    
    // Sincronizar controles de rango al inicio
    syncRangeInputs();
});