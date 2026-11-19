// Usuarios permitidos (sin base de datos)
const usuarios = [
  { usuario: "admin",   clave: "admin123", nombre: "Administrador", rol: "admin" },
  { usuario: "cliente", clave: "1234",     nombre: "Camila Rojas",  rol: "cliente" },
  { usuario: "maria",   clave: "maria2026",nombre: "María Quispe",  rol: "cliente" },
  { usuario: "even",   clave: "even2026",  nombre: "Even Mayta",    rol: "cliente" },
];

const form = document.getElementById("formLogin");
const inputUsuario = document.getElementById("usuario");
const inputClave = document.getElementById("clave");
const mensaje = document.getElementById("mensaje");
const botonVer = document.getElementById("verClave");

// Si ya hay sesión, ir directo a la tienda
if (sessionStorage.getItem("sesionTrama")) {
  window.location.href = "pages/catalogo.html";
}

botonVer.addEventListener("click", () => {
  const oculto = inputClave.type === "password";
  inputClave.type = oculto ? "text" : "password";
  botonVer.textContent = oculto ? "Ocultar" : "Ver";
  botonVer.setAttribute("aria-label", oculto ? "Ocultar contraseña" : "Mostrar contraseña");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mensaje.classList.remove("ok");

  const usuario = inputUsuario.value.trim().toLowerCase();
  const clave = inputClave.value;

  if (!usuario || !clave) {
    mensaje.textContent = "Escribe tu usuario y tu contraseña.";
    return;
  }

  const encontrado = usuarios.find(u => u.usuario === usuario && u.clave === clave);

  if (!encontrado) {
    mensaje.textContent = "Usuario o contraseña incorrectos. Revisa los datos e inténtalo de nuevo.";
    inputClave.value = "";
    inputClave.focus();
    return;
  }

  sessionStorage.setItem("sesionTrama", JSON.stringify({ nombre: encontrado.nombre, rol: encontrado.rol }));
  mensaje.classList.add("ok");
  mensaje.textContent = "Ingreso correcto. Entrando a la tienda…";
  setTimeout(() => { window.location.href = "pages/catalogo.html"; }, 600);
});