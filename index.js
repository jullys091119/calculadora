const d = document;
let concatened = "";
let operador = "";
let resultado = " "
const getNumerosYOperadores = () => {
    return ['C', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '0', '00', '.', '='];
}

const setNumerosYOperadores = () => {
    const buttonsContainer = d.querySelector(".numbers");
    const elements = getNumerosYOperadores();
    elements.forEach(element => {
        const button = d.createElement("button");
        button.setAttribute("type", "button");
        button.classList.add("value-button");
        button.textContent = element;

        button.addEventListener('click', () => {
            handleClick(element);
        });
        buttonsContainer.appendChild(button);
    });
}

const handleClick = (num) => {
    if (num === '=') {
        evaluarOperacion();
    } else {
        concatened += num;
        console.log(concatened, "concatened")
        mostrarEnPantalla(concatened)
    }

    if (num === "C") {
        resetearOperacion()
        mostrarEnPantalla()
    }
}

const suma = () => {
    const numeros = concatened.split('+').map(numero => parseFloat(numero));
    resultado = numeros.reduce((total, numero) => total + numero, 0);
    console.log(resultado, "resultado")
    if (isNaN(resultado)) {
        mostrarEnPantalla("Sintaxys err")
        resetearOperacion();
    } else {
        mostrarEnPantalla(resultado)
        resetearOperacion();
    }

}

const resta = () => {
    const numeros = concatened.split('-');
    // Convetir todos los elementos a números y mantener el signo del primero
    const resultados = numeros.map((elemento, index) => {
        if (index === 0) {
            return parseFloat(elemento); // Mantener el primer número como es
        } else {
            return parseFloat(elemento) * -1; // Convertir el resto a negativos
        }
    });
    resultado = resultados.reduce((total, num) => total + num, 0);
    if (isNaN(resultado)) {
        mostrarEnPantalla("Sintaxys err")
        resetearOperacion();
    } else {
        mostrarEnPantalla(resultado)
        resetearOperacion();
    }
}

const divicion = () => {
    const numerosSplit = concatened.split("/").map((elemento) => parseFloat(elemento));
    if (numerosSplit.includes(0)) {
        console.log('Error: División por cero');
    } else {
        const resultado = numerosSplit.reduce((total, numero) => total / numero);
        if (isNaN(resultado)) {
            mostrarEnPantalla("Sintaxys err")
            resetearOperacion();
        } else {
            mostrarEnPantalla(resultado)
            resetearOperacion();
        }
    }
    resetearOperacion();
}

const multiplicacion = () => {
    const numeros = concatened.split('*').map(numero => parseFloat(numero));
    console.log(numeros)
    const resultado = numeros.reduce((total, numero) => total * numero);
    if (isNaN(resultado)) {
        mostrarEnPantalla("Sintaxys err")
        resetearOperacion();
    } else {
        mostrarEnPantalla(resultado)
        resetearOperacion();
    }
}

const evaluarOperacion = () => {
    if (concatened.includes('+')) {
        suma()
    } else if (concatened.includes('-')) {
        resta()
    } else if (concatened.includes("/")) {
        divicion()
    } else if (concatened.includes("*")) {
        multiplicacion()
    }

    else {
        console.log('Operación no soportada');
        resetearOperacion();
    }
}

const resetearOperacion = () => {
    concatened = "";
}

const mostrarEnPantalla = (num) => {
    console.log(num, "numero podemos hacer algo aqui")
    const screen = d.querySelector(".result")
    screen.textContent = num

}

setNumerosYOperadores();
