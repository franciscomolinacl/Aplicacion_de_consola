///////////////////////////////////////////////  🟢  🟠  🔴
// OBJETIVOS                                 //
//===========================================//
// Realizar operaciones matematicas básicas  //  🟢
// Implementar condicionales y bucles        //  🟢
// Usar funciones para modularizar           //  🟢
// Trabajar con arreglos y objetos           //  🟢
///////////////////////////////////////////////  

//////////////////////////////////////////////////////////////////
// REQUERIMIENTOS                                               //
//==============================================================//
// Se debe ejecutar en consola                                  //  🟢
// Usuario ingresa datos por prompt o variables predefinidas    //  🟠 <- Lo tengo por input de formulario por ahora
// Al menos 3 operaciones diferentes con funciones              //  🟢
// Utilizar condicionales y estructuras de repetición           //  🟢
// Incluir arreglos y objetos para almacenar y manipular datos  //  🟢
//////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// REQUERIMIENTOS TECNICOS                                                   //
//===========================================================================//
// Funciones y modularización: separación código en funciones reutilizables  //  🟢
// Estructuras de control: implementación de if, switch, for, while          //  🟢
// Uso de arreglos y objetos: para manipular los datos                       //  🟢
// Validaciones: control de entradas del usuario para evitar errores         //  🟢
///////////////////////////////////////////////////////////////////////////////

// Se escucha el evento 'submit' de operaciones básicas
document.addEventListener("submit", function (evento) {
    evento.preventDefault(); //Evita que se recargue la pagina
    const form = evento.target; // Se escucha el form
    console.clear(); // Limpio la consola antes de ejecutar la operación
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
                return totalSuma;
            case "res":
                return listaNumeros.reduce((total, num) => total - num);
            case "mul":
                return listaNumeros.reduce((total, num) => total * num, 1);
            case "div":
                if (extraVal(listaNumeros)) {
                    let resultado = listaNumeros.reduce((total, num) => total / num);
                    return resultado.toFixed(2);
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
                console.table(res);
            } else if (laoper == "amp") {
                let res = [
                    {
                        "Watts": listaNumeros[0],
                        "Volts": listaNumeros[1],
                        "Amperes": (listaNumeros[0] / listaNumeros[1]).toFixed(2),
                        "Ohms": ((listaNumeros[1] ** 2) / listaNumeros[0]).toFixed(2)
                    }
                ];
                console.table(res);
            } else if (laoper == "volt") {
                let res = [
                    {
                        "Watts": listaNumeros[0],
                        "Amperes": listaNumeros[1],
                        "Volts": (listaNumeros[0] / listaNumeros[1]).toFixed(2),
                        "Ohms": (listaNumeros[0] / (listaNumeros[1] ** 2)).toFixed(2)
                    }
                ];
                console.table(res);
            } else if (laoper == "resi") {
                let res = [
                    {
                        "Watts": listaNumeros[0],
                        "Amperes": listaNumeros[1],
                        "Ohms": (listaNumeros[0] / (listaNumeros[1] ** 2)).toFixed(2),
                        "Volts": (listaNumeros[0] / listaNumeros[1]).toFixed(2)
                    }
                ];
                console.table(res);
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

            // El ciclo while corre mientras no lleguemos al número máximo
            while (contador <= maximo) {
                console.log(contador);
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

            let contador = 0;
            // El ciclo while corre hasta mostrar la cantidad de números pedidos
            while (contador < cantidad) {
                // Si el número es impar, agrega un espacio. Esto para que en consola aparezca el 1 dos veces al repetirse en esta secuencia
                console.log(contador % 2 === 0 ? `${a}` : `${a} `);
                let siguiente = a + b;
                a = b;
                b = siguiente;
                contador++;
                await esperar(500); // Pausa de medio segundo
            }
        }
    }

};

// Función extra de validación
// Use return false y true para reutilizar la función en la división de las funciones básicas y en las otras funciones de operaciones
function extraVal(lista) {
    // Si la lista tiene mas de 2 números
    if (lista.length > 2) {
        console.warn("Ingrese sólo 2 valores");
        return false;
        // Si incluye un 0 como segundo número | slice(1) = segundo número - includes(0) = incluye el 0
    } else if (lista.slice(1).includes(0)) {
        console.error("No debe incluir el 0 en el segundo valor");
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
        console.warn("Debe seleccionar una operación");
        return;
    }

    const nums = formRecibido.querySelector('[name="nums"]');  // Se escucha el input de los números
    const numsValores = nums.value.trim(); // Se obtiene la lista de números quitando espacios al inicio y al final

    // Se valida que el input no se envie vacio
    if (numsValores === "") {
        console.warn("Por favor, ingresa al menos 2 números separados por coma");
        return;
    }

    // Corta el texto por las comas y crea un arreglo de textos (strings)
    const arregloBase = numsValores.split(",");
    // Limpia los espacios vacíos y elimina las posiciones que quedaron sin texto
    const filtroArreglo = arregloBase.filter(num => num.trim() !== "");
    if (filtroArreglo.length === 0) {
        console.warn("Debe ingresar números, no sólo comas.");
        return;
    }

    // Convierte cada texto del arreglo en un número real y crea un nuevo arreglo
    const arregloNums = filtroArreglo.map(num => Number(num.trim()));

    // Valida que el arreglo tenga un mínimo de 2 elementos para operar
    if (arregloNums.length < 2) {
        console.error("Debe ingresar al menos 2 números separados por coma.");
        return;
    }

    // Verifica si existe algún valor en el arreglo que no sea un número válido (NaN)
    if (arregloNums.some(isNaN)) {
        console.error("Uno o más valores no son números.");
        return;
    }

    // Separe las funciones especiales para usar await y que se pueda usar el setTimeout interno de la funcion
    if (laFuncion === "funEspeciales") {
        await lasOper[laFuncion](operSeleccionada, ...arregloNums);
    } else {
        // Muestra en consola la salida de la función llamada
        console.log(lasOper[laFuncion](operSeleccionada, ...arregloNums));
    }
}
