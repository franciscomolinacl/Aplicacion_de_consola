/////////////////////////////////////////           
// REQUERIMIENTOS      🟢  🟠  🔴      //
//=====================================//
// - Operaciones matematicas     // 🟢 //
// - Condicionales (if, switch)  // 🟢 //
// - Bucles (for, while)         // 🟢 //
// - Funciones                   // 🟢 //
// - Arreglos                    // 🟢 //
// - Objetos                     // 🟢 //
// - Ejecutar en consola         // 🟢 //
// - Prompt js                   // 🟢 //
// - Validaciones                // 🟢 //
// - Codigo fuente en Github     // 🟢 //
// - Archivo README.md           // 🟢 //
// - Capturas de pantalla        // 🟢 //
// - Documentación y análisis    // 🔴 //
/////////////////////////////////////////


// Se escucha el evento 'submit' de operaciones básicas
document.addEventListener("submit", function (evento) {
    evento.preventDefault(); //Evita que se recargue la pagina
    const form = evento.target; // Se escucha el form
    //console.clear(); // Limpio la consola antes de ejecutar la operación <- La mantendre comentada para dejar el registro completo
    validar(form); // Se envia el form completo a la función validar
});

// Se escucha el clic en cualquier botón de prompt
document.addEventListener("click", function (evento) {
    if (evento.target.classList.contains("btn-prompt")) {
        const elPrompt = prompt("Ingresa números separados por comas:");
        // Si cancela o acepta sin valores, se cierra el prompt
        if (elPrompt === null || elPrompt.trim() === "") return;
        // Se busca el form que contiene el boton con closest
        const form = evento.target.closest("form");
        // Se busca el input text que contiene los numeros
        const inputNumeros = form.querySelector('input[type="text"]');
        if (inputNumeros) {
            inputNumeros.value = elPrompt;
        }
        validar(form); // Se envia el form completo a la función validar
    }
});

const consola = document.getElementById("console");

// Objeto con funciones de operaciones
const lasOper = {
    // Funcion de operaciones básicas
    funBasicas: function (laoper, ...listaNumeros) {
        switch (laoper) {
            // Cambie el reduce por un ciclo for para cumplir con parte de la tarea
            case "sum":
                let totalSuma = 0;
                // El ciclo for recorre la lista de números uno por uno
                for (let i = 0; i < listaNumeros.length; i++) {
                    totalSuma += listaNumeros[i];
                }
                return `Resultado de la suma: ${totalSuma}`;
            case "res":
                return `Resultado de la resta: ${listaNumeros.reduce((total, num) => total - num)}`;
            case "mul":
                return `Resultado de la multiplicación: ${listaNumeros.reduce((total, num) => total * num, 1)}`;
            case "div":
                if (extraVal(listaNumeros)) {
                    let resultado = listaNumeros.reduce((total, num) => total / num);
                    return `Resultado de la division: ${resultado.toFixed(2)}`;
                } else {
                    return "Operación cancelada";
                }
            default:
                return "Operación no válida";
        }
    },

    // Función de otras operaciones (potencias, raices, porcentajes, etc)
    funOtras: function (laoper, ...listaNumeros) {
        if (extraVal(listaNumeros)) {
            if (laoper === "pot") {
                return listaNumeros[0] ** listaNumeros[1];
            } else if (laoper == "raiz") {
                return (listaNumeros[0] ** (1 / listaNumeros[1])).toFixed(2);
            } else if (laoper == "mod") {
                return listaNumeros[0] % listaNumeros[1];
            } else if (laoper == "porc") {
                return ((listaNumeros[0] * listaNumeros[1]) / 100).toFixed(2);
            } else if (laoper == "qporc") {
                return ((listaNumeros[0] / listaNumeros[1]) * 100).toFixed(2) + "%";
            } else if (laoper == "porcd") {
                return ((listaNumeros[0] / listaNumeros[1]) * 100).toFixed(2);
            }
        } else {
            return "Operación cancelada";
        }
    },

    // Función de cálculos ley de ohm y watt - electricidad
    // Hice la salida en tablas para una mejor visualización
    funOhm: function (laoper, ...listaNumeros) {
        if (extraVal(listaNumeros)) {
            if (laoper === "watt") {
                let res = [
                    {
                        "Volts": listaNumeros[0],
                        "Amperes": listaNumeros[1],
                        "Watts": listaNumeros[0] * listaNumeros[1],
                        "Ohms": (listaNumeros[0] / listaNumeros[1]).toFixed(2)
                    }
                ];
                return res;
            } else if (laoper == "amp") {
                let res = [
                    {
                        "Watts": listaNumeros[0],
                        "Volts": listaNumeros[1],
                        "Amperes": (listaNumeros[0] / listaNumeros[1]).toFixed(2),
                        "Ohms": ((listaNumeros[1] ** 2) / listaNumeros[0]).toFixed(2)
                    }
                ];
                return res;
            } else if (laoper == "volt") {
                let res = [
                    {
                        "Watts": listaNumeros[0],
                        "Amperes": listaNumeros[1],
                        "Volts": (listaNumeros[0] / listaNumeros[1]).toFixed(2),
                        "Ohms": (listaNumeros[0] / (listaNumeros[1] ** 2)).toFixed(2)
                    }
                ];
                return res;
            } else if (laoper == "resi") {
                let res = [
                    {
                        "Watts": listaNumeros[0],
                        "Amperes": listaNumeros[1],
                        "Ohms": (listaNumeros[0] / (listaNumeros[1] ** 2)).toFixed(2),
                        "Volts": (listaNumeros[0] / listaNumeros[1]).toFixed(2)
                    }
                ];
                return res;
            }
        } else {
            return "Operación cancelada";
        }
    },
    // Función para mostrar secuencias usando ciclos while
    // Se usa 'async' para poder pausar el código con 'await'
    funEspeciales: async function (laoper, ...listaNumeros) {
        // Función auxiliar para pausar el código por unos milisegundos
        const esperar = ms => new Promise(res => setTimeout(res, ms));

        if (laoper === "corr") {
            let contador = listaNumeros[0];
            const maximo = listaNumeros[0] + listaNumeros[1] - 1;
            console.log(`Mostrando números del ${contador} al ${maximo}:`);
            consola.innerHTML += `Mostrando números del ${contador} al ${maximo}:` + "<br>";
            consola.scrollTop = consola.scrollHeight;

            // El ciclo while corre mientras no lleguemos al número máximo
            while (contador <= maximo) {
                console.log(contador);
                divConsola(contador);
                contador++;
                await esperar(500); // Pausa de medio segundo (500 milisegundos)
            }
        }

        else if (laoper === "fibo") {
            let a = 0, b = 1;
            let cantidad = listaNumeros[1];
            let inicio = listaNumeros[0];

            while (a < listaNumeros[0]) {
                let siguiente = a + b;
                a = b;
                b = siguiente;
            }
            console.log(`Mostrando ${cantidad} números de Fibonacci desde el ${inicio}:`);
            consola.innerHTML += `Mostrando ${cantidad} números de Fibonacci desde el ${inicio}:` + "<br>";
            consola.scrollTop = consola.scrollHeight;

            let contador = 0;
            // El ciclo while corre hasta mostrar la cantidad de números pedidos
            while (contador < cantidad) {
                // Si el número es impar, agrega un espacio. Esto para que en consola aparezca el 1 dos veces al repetirse en esta secuencia
                console.log(contador % 2 === 0 ? `${a}` : `${a} `);
                divConsola(a);
                let siguiente = a + b;
                a = b;
                b = siguiente;
                contador++;
                await esperar(500); // Pausa de medio segundo
            }
        }
    }

};

let esCero = false;
// Función extra de validación
// Use return false y true para reutilizar la función en la división de las funciones básicas y en las otras funciones de operaciones
function extraVal(lista) {
    // Si la lista tiene mas de 2 números
    if (lista.length > 2) {
        const msjError = "Ingrese sólo 2 valores";
        mostrarMsj(msjError);
        return false;
        // Si incluye un 0 como segundo número | slice(1) = segundo número - includes(0) = incluye el 0
    } else if (lista.slice(1).includes(0)) {
        const msjError = "No debe incluir el 0 en el segundo valor";
        mostrarMsj(msjError);
        esCero = true; // En las tablas del div me daba error y no se mostraba
        return false;
    } else {
        return true;
    }
}

// Valida y resuelve operación
async function validar(formRecibido) {
    // Obtengo el id del formulario recibido y lo concateno para formar el nombre de la función incluida en el objeto lasOper
    const laFuncion = `fun${formRecibido.id}`;
    const oper = formRecibido.querySelector('[name="operaciones"]');  // Se escucha el select por su name
    const operSeleccionada = oper.value; // Se obtiene el valor del select seleccionado (la operacion)

    // Se verifica que se seleccione una operación
    if (operSeleccionada === "") {
        const msjError = "Debe seleccionar una operación";
        mostrarMsj(msjError);
        return;
    }

    const nums = formRecibido.querySelector('[name="nums"]');  // Se escucha el input de los números
    const numsValores = nums.value.trim(); // Se obtiene la lista de números quitando espacios al inicio y al final

    // Se valida que el input no se envie vacio
    if (numsValores === "") {
        const msjError = "Por favor, ingresa al menos 2 números separados por coma";
        mostrarMsj(msjError);
        return;
    }

    // Corta el texto por las comas y crea un arreglo de textos (strings)
    const arregloBase = numsValores.split(",");
    // Limpia los espacios vacíos y elimina las posiciones que quedaron sin texto
    const filtroArreglo = arregloBase.filter(num => num.trim() !== "");
    if (filtroArreglo.length === 0) {
        const msjError = "Debe ingresar números, no sólo comas.";
        mostrarMsj(msjError);
        return;
    }

    // Convierte cada texto del arreglo en un número real y crea un nuevo arreglo
    const arregloNums = filtroArreglo.map(num => Number(num.trim()));

    // Valida que el arreglo tenga un mínimo de 2 elementos para operar
    if (arregloNums.length < 2) {
        const msjError = "Debe ingresar al menos 2 números separados por coma.";
        mostrarMsj(msjError);
        return;
    }

    // Verifica si existe algún valor en el arreglo que no sea un número válido (NaN)
    if (arregloNums.some(isNaN)) {
        const msjError = "Uno o más valores no son números.";
        mostrarMsj(msjError);
        return;
    }

    // Separe las funciones especiales para usar await y que se pueda usar el setTimeout interno de la funcion
    if (laFuncion === "funEspeciales") {
        await lasOper[laFuncion](operSeleccionada, ...arregloNums);
    } else {
        esCero = false;
        const resOper = lasOper[laFuncion](operSeleccionada, ...arregloNums);
        if (laFuncion !== "funOhm") {
            // Muestra en consola la salida de la función llamada
            console.log(resOper);
            divConsola(resOper);
        } else {
            // Muestra en consola la salida de la función llamada
            console.table(resOper);
            mostrarTabla(resOper);
            consola.scrollTop = consola.scrollHeight;

        }

    }
}

async function mostrarMsj(msjError) {
    //consola.innerHTML = "";
    console.error(msjError);
    consola.innerHTML += msjError + "<br>";
    consola.scrollTop = consola.scrollHeight;
}

// Crea tabla para div de funcion Ley Ohm/Watt
function mostrarTabla(data) {
    if (!esCero) {
        const tabla = document.createElement("table");
        tabla.border = "1";
        tabla.style.borderCollapse = "collapse";
        tabla.style.marginTop = "10px";
        const thead = document.createElement("thead");
        const filaHead = document.createElement("tr");

        Object.keys(data[0]).forEach(key => {
            const th = document.createElement("th");
            th.textContent = key;
            th.style.padding = "5px";
            filaHead.appendChild(th);
        });

        thead.appendChild(filaHead);
        tabla.appendChild(thead);

        const tbody = document.createElement("tbody");

        data.forEach(obj => {
            const fila = document.createElement("tr");
            Object.values(obj).forEach(valor => {
                const td = document.createElement("td");
                td.textContent = valor;
                td.style.padding = "5px";
                fila.appendChild(td);
            });
            tbody.appendChild(fila);
        });

        tabla.appendChild(tbody);
        //consola.innerHTML = "";
        consola.appendChild(tabla);
        esCero = false;
    }
}

// Se ingresa resultado al div y se agrega scroll horizontal para mostrar bien el salto de linea
function divConsola(oper) {
    consola.innerHTML += oper + "<br>";
    consola.scrollTop = consola.scrollHeight;
}

////////////////////
// VERSION PROMPT //
////////////////////

// Se escucha el boton 
document.getElementById("btnModoPrompt").addEventListener("click", async function () {
    modoPrompt();
});

// El menu de las operaciones
function mostrarMenu() {
    return prompt(
        `Por favor elija una opción:
1. Sumar
2. Restar
3. Multiplicar
4. Dividir
5. Fibonacci / Correlativos
6. Porcentajes
7. Salir`
    );
}

async function modoPrompt() {
    let continuar = true;

    while (continuar) {
        const opcion = mostrarMenu();

        // Si presiona cancelar o elige la opción salir
        if (opcion === null || opcion === "7") {
            alert("Saliendo de Modo Prompt. ¡Adiós!");
            continuar = false;
            break;
        }

        // Opciones del menu, se revisa si estan incluidas
        if (["1", "2", "3", "4", "5", "6"].includes(opcion)) {
            const ingreso = prompt("Ingresa números separados por comas.\nPara suma, resta y multiplicación puede ser desde 2 o más\npara el resto sólo 2 números");
            if (ingreso === null) continue; // Si cancela, vuelve al menú

            // Validaciones adaptadas
            const arregloBase = ingreso.split(",");
            const filtroArreglo = arregloBase.filter(num => num.trim() !== "");

            const arregloNums = filtroArreglo.map(num => Number(num.trim()));
            if (arregloNums.length < 2 && opcion !== "5" && opcion !== "6") {
                alert("Debe ingresar al menos 2 números.");
                continue;
            }
            if (arregloNums.some(isNaN)) {
                alert("Uno o más valores no son números.");
                continue;
            }

            // Resultados para operaciones
            switch (opcion) {
                case "1":
                    const rSuma = lasOper.funBasicas("sum", ...arregloNums);
                    alert(`Resultado de la Suma: ${rSuma}`);
                    console.log(`Suma: ${rSuma}`);
                    divConsola(rSuma);
                    break;
                case "2":
                    const rRes = lasOper.funBasicas("res", ...arregloNums);
                    alert(`Resultado de la Resta: ${rRes}`);
                    console.log(`Resta: ${rRes}`);
                    divConsola(rRes);
                    break;
                case "3":
                    const rMul = lasOper.funBasicas("mul", ...arregloNums);
                    alert(`Resultado de la Multiplicación: ${rMul}`);
                    console.log(`Multiplicación: ${rMul}`);
                    divConsola(rMul);
                    break;
                case "4":
                    const rDiv = lasOper.funBasicas("div", ...arregloNums);
                    alert(`Resultado de la División: ${rDiv}`);
                    console.log(`División: ${rDiv}`);
                    divConsola(rDiv);
                    break;
                case "5":
                    const tipoEspecial = prompt("Escriba 'fibo' para Fibonacci o 'corr' para correlativos:");
                    await lasOper.funEspeciales(tipoEspecial, ...arregloNums);
                    break;
                case "6":
                    const tipoPorc = prompt("Escriba: 'porc' para obtener el porcentaje de un numero\n'qporc' para saber el % de la cantidad\n'porcd' para saber cantidad donde se obtuvo el porcentaje");
                    const rPorc = lasOper.funOtras(tipoPorc, ...arregloNums);
                    alert(`Resultado del porcentaje: ${rPorc}`);
                    console.log(rPorc);
                    divConsola(rPorc);
                    break;
            }
        } else {
            alert("Opción no válida. Intente de nuevo.");
        }
    }
}
