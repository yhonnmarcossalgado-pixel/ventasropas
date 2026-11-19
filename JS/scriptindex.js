// ---------- Protección de la página ----------
const sesion = JSON.parse(sessionStorage.getItem("sesionTrama"));
if (!sesion) {
  window.location.href = "../index.html";
}

// ---------- Datos (array de objetos) ----------
const productos = [
  { id: 1, nombre: "Camiseta básica",  categoria: "camisetas",  precio: 85,  talla: "S - XL", emoji: "👕", color: "#DCE6F2" },
  { id: 2, nombre: "Camiseta rayada",  categoria: "camisetas",  precio: 95,  talla: "S - L",  emoji: "👚", color: "#F6E3B4" },
  { id: 3, nombre: "Jean recto",       categoria: "pantalones", precio: 220, talla: "28 - 38", emoji: "👖", color: "#C9D3E6" },
  { id: 4, nombre: "Pantalón cargo",   categoria: "pantalones", precio: 240, talla: "30 - 40", emoji: "👖", color: "#D8DDD0" },
  { id: 5, nombre: "Chaqueta de lana", categoria: "abrigos",    precio: 380, talla: "M - XL", emoji: "🧥", color: "#E6D5CF" },
  { id: 6, nombre: "Abrigo largo",     categoria: "abrigos",    precio: 450, talla: "S - L",  emoji: "🧥", color: "#D5D9E3" },
  { id: 7, nombre: "Bufanda tejida",   categoria: "accesorios", precio: 70,  talla: "Única",  emoji: "🧣", color: "#F2D4CF" },
  { id: 8, nombre: "Gorro de lana",    categoria: "accesorios", precio: 55,  talla: "Única",  emoji: "🧢", color: "#DDE8D8" }
];

const titulos = {
  todos: "Todo el catálogo", camisetas: "Camisetas", pantalones: "Pantalones",
  abrigos: "Abrigos", accesorios: "Accesorios"
};

let carrito = [];

// ---------- Elementos ----------
const contProductos = document.getElementById("productos");
const listaCarrito = document.getElementById("listaCarrito");
const totalEl = document.getElementById("total");
const tituloEl = document.getElementById("tituloCategoria");
const contadorEl = document.getElementById("contador");
const menu = document.getElementById("menuLateral");
const fondo = document.getElementById("fondo");
const btnMenu = document.getElementById("btnMenu");

document.getElementById("saludo").textContent = "Hola, " + sesion.nombre;

// ---------- Menú desplegable ----------
function abrirMenu() {
  menu.classList.add("abierto");
  fondo.hidden = false;
  btnMenu.setAttribute("aria-expanded", "true");
}
function cerrarMenu() {
  menu.classList.remove("abierto");
  fondo.hidden = true;
  btnMenu.setAttribute("aria-expanded", "false");
}
btnMenu.addEventListener("click", abrirMenu);
document.getElementById("btnCerrar").addEventListener("click", cerrarMenu);
fondo.addEventListener("click", cerrarMenu);
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarMenu(); });

// ---------- Catálogo ----------
function mostrarProductos(filtro = "todos") {
  const lista = filtro === "todos" ? productos : productos.filter(p => p.categoria === filtro);
  tituloEl.textContent = titulos[filtro];
  contadorEl.textContent = lista.length + " productos";

  contProductos.innerHTML = lista.map(p => `
    <article class="producto">
      <div class="producto__img" style="background:${p.color}" aria-hidden="true">${p.emoji}</div>
      <div class="producto__info">
        <h3>${p.nombre}</h3>
        <span class="talla">Tallas: ${p.talla}</span>
        <span class="precio">Bs ${p.precio}</span>
        <button data-id="${p.id}">Agregar al carrito</button>
      </div>
    </article>
  `).join("");
}

document.querySelectorAll(".nav a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    document.querySelector(".nav a.activo").classList.remove("activo");
    enlace.classList.add("activo");
    mostrarProductos(enlace.dataset.filtro);
    cerrarMenu();
  });
});

// ---------- Carrito ----------
contProductos.addEventListener("click", e => {
  const boton = e.target.closest("button[data-id]");
  if (!boton) return;
  const producto = productos.find(p => p.id === Number(boton.dataset.id));
  const existente = carrito.find(item => item.id === producto.id);
  if (existente) existente.cantidad++;
  else carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
  mostrarCarrito();
});

function mostrarCarrito() {
  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<li class="vacio">Aún no agregaste prendas.</li>';
    totalEl.textContent = "Bs 0";
    return;
  }
  listaCarrito.innerHTML = carrito.map(i =>
    `<li><span>${i.cantidad} × ${i.nombre}</span><span>Bs ${i.cantidad * i.precio}</span></li>`
  ).join("");
  const total = carrito.reduce((suma, i) => suma + i.cantidad * i.precio, 0);
  totalEl.textContent = "Bs " + total;
}

document.getElementById("btnVaciar").addEventListener("click", () => {
  carrito = [];
  mostrarCarrito();
});

// ---------- Cerrar sesión ----------
document.getElementById("btnSalir").addEventListener("click", () => {
  sessionStorage.removeItem("sesionTrama");
  window.location.href = "../index.html";
});

// ---------- Inicio ----------
mostrarProductos();
mostrarCarrito();