const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Agregar curso al carrito
    listaCursos.addEventListener('click', agregarCurso)

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)
}

// funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}
// Eliminar o reducir la cantidad de un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Encontrar el curso en el carrito
        const curso = articulosCarrito.find(curso => curso.id === cursoId);
        
        // Si la cantidad del curso es mayor a 1, solo restamos 1 de la cantidad
        if (curso.cantidad > 1) {
            curso.cantidad--;
        } else {
            // Si la cantidad es 1, eliminamos el curso del carrito
            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        }

        // Actualizar la vista
        carritoHtml();
    }
}


// Extraer informacion del curso
function leerDatosCurso(curso) {
    // Crear un objeto con el contenido del curso actual usando desestructuración
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        autor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisar si el curso ya existe en el carrito
    const cursoExistente = articulosCarrito.find(curso => curso.id === infoCurso.id);

    if (cursoExistente) {
        // Si el curso ya está en el carrito, solo incrementamos la cantidad
        cursoExistente.cantidad++;
    } else {
        // Si no existe, agregamos el curso al carrito
        articulosCarrito.push(infoCurso);
    }

    // Actualizar el carrito en la UI
    carritoHtml();
}


// muestra el carrito de compras en el html

function carritoHtml() {

    // limpiar el html
    limpiarHtml();
    //recorre el carrito y genere el html
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = "${imagen}" >
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}"> Quitar </a>
            </td>
        `;
        //agrega el html al tbody
        contenedorCarrito.appendChild(row);
    })
}

//elimina los cursos del tbody o lipiar
function limpiarHtml() {
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}