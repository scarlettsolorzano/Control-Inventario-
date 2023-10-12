/* 
*   Control de inventario de productos 
*   usando el sistema de catálogo mediante el uso de la clase producto
*   almacenamiento de clases 
*/

class Producto {
    constructor(codigo, nombre, precio, cantidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.siguiente = null; // Puntero al siguiente nodo en la lista
        this.anterior = null; // Puntero al nodo anterior en la lista
    }
}

class Inventario {
    constructor() {
        this.primero = null; // Primer nodo en la lista
        this.ultimo = null;  // Último nodo en la lista
    }

    // Inserta un nuevo producto en la lista de forma ordenada por código
    ingresarProducto(producto) {
        let nuevoProducto = new Producto(producto.codigo, producto.nombre, producto.precio, producto.cantidad);

        if (!this.primero) {
            this.primero = nuevoProducto;
            this.ultimo = nuevoProducto;
        } else {
            let nodoActual = this.primero;
            let nodoAnterior = null;

            // Busca la posición adecuada para el nuevo producto en la lista ordenada
            while (nodoActual && nodoActual.codigo < nuevoProducto.codigo) {
                nodoAnterior = nodoActual;
                nodoActual = nodoActual.siguiente;
            }

            // Inserta el nuevo producto en la posición adecuada
            if (nodoAnterior) {
                nodoAnterior.siguiente = nuevoProducto;
                nuevoProducto.anterior = nodoAnterior;
            } else {
                this.primero = nuevoProducto;
            }

            if (nodoActual) {
                nodoActual.anterior = nuevoProducto;
                nuevoProducto.siguiente = nodoActual;
            } else {
                this.ultimo = nuevoProducto;
            }
        }

        return "<p>El producto se ha ingresado correctamente</p>";
    }

    // Busca un producto por su código y devuelve su información
    buscarProducto(codigoBuscar) {
        let nodo = this.primero;

        while (nodo) {
            if (nodo.codigo == codigoBuscar) {
                return `<p>Codigo: ${nodo.codigo} Nombre: ${nodo.nombre} Precio: ${nodo.precio} Cantidad: ${nodo.cantidad}</p>`;
            }
            nodo = nodo.siguiente;
        }

        return "<p>El producto no existe</p>";
    }

    // Elimina un producto por su código
    borrarProducto(codigoBorrar) {
        let nodo = this.primero;

        while (nodo) {
            if (nodo.codigo == codigoBorrar) {
                if (nodo.anterior) {
                    nodo.anterior.siguiente = nodo.siguiente;
                } else {
                    this.primero = nodo.siguiente;
                }

                if (nodo.siguiente) {
                    nodo.siguiente.anterior = nodo.anterior;
                } else {
                    this.ultimo = nodo.anterior;
                }

                return "<p>Se ha borrado exitosamente</p>";
            }
            nodo = nodo.siguiente;
        }

        return "<p>El producto no existe</p>";
    }

    // Devuelve la lista de productos en orden ascendente
    listarProductos() {
        let nodo = this.primero;
        let res = "";

        while (nodo) {
            res += `<tr><th>${nodo.codigo}</th><td>${nodo.nombre}</td><td>${nodo.precio}</td><td>${nodo.cantidad}</td></tr>`;
            nodo = nodo.siguiente;
        }

        return res;
    }

    // Devuelve la lista de productos en orden descendente
    listarProductosInverso() {
        let nodo = this.ultimo;
        let res = "";

        while (nodo) {
            res += `<tr><th>${nodo.codigo}</th><td>${nodo.nombre}</td><td>${nodo.precio}</td><td>${nodo.cantidad}</td></tr>`;
            nodo = nodo.anterior;
        }

        return res;
    }
}

// Creación del objeto inventario
let inventario = new Inventario();

// Event listeners para los botones
document.getElementById("btnBuscar").onclick = buscarProducto;
document.getElementById("btnClean1").onclick = limpiarProducto;
document.getElementById("btnAdd").onclick = agregarProducto;
document.getElementById("btnDelete").onclick = eliminarProducto;
document.getElementById("btnListar").onclick = listarProductos;
document.getElementById("btnOrder").onclick = ordenarProductos;

let orden = true; // Variable para controlar el orden de la lista

// Función para buscar un producto por código
function buscarProducto() {
    let codigoBuscar = document.getElementById("txtBuscar").value;
    document.getElementById("notify").innerHTML = inventario.buscarProducto(codigoBuscar);
}

// Función para limpiar el campo de búsqueda
function limpiarProducto() {
    document.getElementById("txtBuscar").value = "";
    document.getElementById("notify").innerHTML = "";
}

// Función para agregar un producto
function agregarProducto() {
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let cantidad = document.getElementById("cantidad").value;

    if (codigo && nombre && precio && cantidad) {
        let producto = {
            codigo: parseInt(codigo),
            nombre: nombre,
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad)
        };
        document.getElementById("notify").innerHTML = inventario.ingresarProducto(producto);
    } else {
        document.getElementById("notify").innerHTML = "<p>Por favor, complete todos los campos</p>";
    }
}

// Función para eliminar un producto
function eliminarProducto() {
    let codigoBorrar = document.getElementById("txtBuscar").value;
    document.getElementById("notify").innerHTML = inventario.borrarProducto(codigoBorrar);
}

// Función para listar productos
function listarProductos() {
    document.getElementById("detalles").innerHTML = inventario.listarProductos();
    document.getElementById("notify").innerHTML = "";
}

// Función para alternar el orden de la lista y volver a listar los productos
function ordenarProductos() {
    if (orden) {
        document.getElementById("detalles").innerHTML = inventario.listarProductos();
        orden = false;
    } else {
        document.getElementById("detalles").innerHTML = inventario.listarProductosInverso();
        orden = true;
    }

    document.getElementById("notify").innerHTML = "";
}
