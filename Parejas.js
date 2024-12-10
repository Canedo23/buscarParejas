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

    function generarValoresParejas(filas, columnas) {
        let total = filas * columnas;
        let valores = [];
        for (let i = 1; i <= total / 2; i++) {
          valores.push(i);
          valores.push(i);
        }
        return valores;
      }
    
      function mezclarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    
      function manejarClickCasilla(e) {
        const casilla = e.target;
    
        if (!casilla.classList.contains("oculta") || seleccionadas.length >= 2) {
          return;
        }
    
        casilla.classList.remove("oculta");
        casilla.textContent = casilla.dataset.valor;
        seleccionadas.push(casilla);
    
        if (seleccionadas.length === 2) {
          verificarPareja();
        }
      }

});