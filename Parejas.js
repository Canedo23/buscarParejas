document.addEventListener("DOMContentLoaded", () => {
    const tablero = document.getElementById("tablero");
    const intentosElem = document.getElementById("intentos");
    const parejasRestantesElem = document.getElementById("parejas-restantes");
    const botonesDificultad = document.querySelectorAll(".btn-dificultad");
    const formPersonalizado = document.getElementById("form-personalizado");
    const generarPersonalizadoBtn = document.getElementById("generar-personalizado");
    const filasInput = document.getElementById("filas-input");
    const columnasInput = document.getElementById("columnas-input");
    const errorMessage = document.getElementById("error-message");
  
    let intentos = 0;
    let parejasRestantes = 6;
    let seleccionadas = [];
    let valores = [];
  
    function generarTablero(filas, columnas) {
      tablero.innerHTML = "";
      parejasRestantes = (filas * columnas) / 2;
      parejasRestantesElem.textContent = `Parejas restantes: ${parejasRestantes}`;
      tablero.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
      valores = generarValoresParejas(filas, columnas);
      valores = mezclarArray(valores);
  
      for (let i = 0; i < filas * columnas; i++) {
        let casilla = document.createElement("div");
        casilla.classList.add("casilla", "oculta");
        casilla.dataset.valor = valores[i];
        casilla.addEventListener("click", manejarClickCasilla);
        tablero.appendChild(casilla);
      }
    }
});