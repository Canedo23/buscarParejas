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

      function verificarPareja() {
        intentos++;
        intentosElem.textContent = `Intentos: ${intentos}`;
    
        const [primera, segunda] = seleccionadas;
    
        if (primera.dataset.valor === segunda.dataset.valor) {
          primera.classList.add("correcta");
          segunda.classList.add("correcta");
          parejasRestantes--;
          parejasRestantesElem.textContent = `Parejas restantes: ${parejasRestantes}`;
    
          
          if (parejasRestantes === 0) {
            setTimeout(() => {
              alert("¡Has ganado!");
              intentos = 0; 
              intentosElem.textContent = `Intentos: ${intentos}`; 
            }, 500);
          }
        } else {
          setTimeout(() => {
            primera.classList.add("oculta");
            segunda.classList.add("oculta");
            primera.textContent = "";
            segunda.textContent = "";
          }, 1000);
        }
        seleccionadas = [];
      }

      botonesDificultad.forEach((boton) => {
        boton.addEventListener("click", (e) => {
          botonesDificultad.forEach(b => b.classList.remove('active'));
          
          if (e.target.id === "personalizado-btn") {
            formPersonalizado.classList.toggle("visible");
            errorMessage.style.display = 'none'; 
          } else {
            const filas = parseInt(e.target.dataset.filas);
            const columnas = parseInt(e.target.dataset.columnas);
            generarTablero(filas, columnas);
            formPersonalizado.classList.remove('visible');
          }
        });
      });

      generarPersonalizadoBtn.addEventListener('click', () => {
        const filas = parseInt(filasInput.value);
        const columnas = parseInt(columnasInput.value);
    
        
        if (filas < 2 || columnas < 2) {
          errorMessage.textContent = "Por favor, ingresa al menos 2 filas y 2 columnas.";
          errorMessage.style.display = 'block'; 
          return;
        }
    
        
        if (filas % 2 !== 0 || columnas % 2 !== 0) {
          errorMessage.textContent = "El número de filas y columnas debe ser par. Intenta nuevamente.";
          errorMessage.style.display = 'block'; 
          return;
        }
        
        errorMessage.style.display = 'none'; 
        generarTablero(filas, columnas);
        formPersonalizado.classList.remove('visible');
      });
    
      
      generarTablero(3, 4);

});