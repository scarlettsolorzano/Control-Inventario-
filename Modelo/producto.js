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
    }

    // Muestra los datos del producto (nombre, precio y cantidad)
    mostrarInformacion() {
        return ` ${this.codigo } Nombre: ${this.nombre} Precio: ${this.precio} Cantidad: ${this.cantidad}`;
    }   
   
} 


class Inventario{

    constructor() {
        this.productos = new Array()
    }

    // Inserta objeto(s) de tipo Producto
    ingresarProducto(producto){
        
        // Inserción
        this.productos.push(producto);

        // Ordena la lista de Productos
        for (let x=0; x<this.productos.length; x++) {
            for (let y=0; y<this.productos.length; y++) {

                if (y+1 !== this.productos.length) {

                    if (parseInt(this.productos[y].codigo) > parseInt(this.productos[y+1].codigo)) {
                        let intercambio = this.productos[y+1];

                        this.productos[y+1] = this.productos[y];
                        this.productos[y] = intercambio;
                    }

                }

            }
        }

        return "<p>''El producto se ha ingresado correctamente''</p>";
    }

    // Muestra un Producto en específico en la notificación
    buscarProducto(codigoBuscar){

        // Recorre el arreglo hasta encontrar un Producto con el mismo código que se ingresó
        for(let i=0; i<this.productos.length ; i++){
            if(codigoBuscar==this.productos[i].codigo){
                return "<p> Codigo: " + this.productos[i].codigo + " Nombre:" + this.productos[i].nombre + " Precio:" + this.productos[i].precio + " Cantidad:" + this.productos[i].cantidad + "</p>"
            }
        }

        return "<p>''El producto no existe''</p>";
    }

    // Elimina un Producto en específico
    borrarProducto(codigoBorrar){

        // Recorre el arreglo hasta encontrar un Producto con el mismo código que se ingresó
        for(let i = 0; i<this.productos.length;i++){
            if(codigoBorrar == this.productos[i].codigo){

                for(let j = i; j < this.productos.length; j++){
                    this.productos[j] = this.productos[j+1];
                }

                // Eliminación
                this.productos.pop();

                return "<p>''Se ha borrado exitosamente''</p>"
            }
        }
    }

    // Muestra todos los Productos del arreglo ASCENDENTE
    ListarProducto(){
        let res = "";

        for(let i = 0; i < this.productos.length; i++){
            res += "<tr><th>" + this.productos[i].codigo + "</th><td>" 
                            + this.productos[i].nombre + "</td><td>" 
                            + this.productos[i].precio + "</td><td>" 
                            + this.productos[i].cantidad +"</td></tr>";
        }

        return res;
    }

    // Muestra todos los Productos del arreglo DESCENDENTE
    ListarProductoInverso(){
        let res = "";

        for(let i = this.productos.length - 1; i >= 0; i--){
            res += "<tr><th>" + this.productos[i].codigo + "</th><td>" 
                            + this.productos[i].nombre + "</td><td>" 
                            + this.productos[i].precio + "</td><td>" 
                            + this.productos[i].cantidad +"</td></tr>";
        }

        return res;
    }

    // Muestra un Producto en específico en los campos de texto
    seleccionarProducto(buscar) {
        for(let i = 0; i < this.productos.length; i++){
            if(this.productos[i].codigo == buscar){
                return this.productos[i];
            }
        }

        return null;
    }

    // Actualiza un Producto
    ActualizarProducto(buscar, codigo2, nombre2, precio2, cantidad2){
        for(let i = 0; i < this.productos.length; i++){
            if(this.productos[i].codigo == buscar){
                if(codigo2 != ""){
                    this.productos[i].codigo = codigo2;
                }
                if (nombre2 != "") {
                    this.productos[i].nombre = nombre2;
                }
                if (precio2 != "") {
                    this.productos[i].precio = precio2;
                }
                if (cantidad2 != "") {
                    this.productos[i].cantidad = cantidad2;
                }
                return "<p> Se ha actualizado a Codigo: " + this.productos[i].codigo + " Nombre: " + this.productos[i].nombre + " Precio: $" + this.productos[i].precio + " Cantidad: " + this.productos[i].cantidad + " </p";
            }
        }
    }
}

// Creación del Inventario
let inventario = new Inventario();

// Ejecución de funciones a partir del click en el botón
document.getElementById("btnBuscar").onclick = buscarproducto;
document.getElementById("btnClean1").onclick = limpiarProducto;

document.getElementById("btnAdd"). onclick = agregarProducto;
document.getElementById("btnDelete").onclick = eliminarProducto;
document.getElementById("btnUpdate").onclick = actualizarProducto;
document.getElementById("btnClean2").onclick = limpiarProducto;

document.getElementById("btnListar").onclick = listarProductos;
document.getElementById("btnOrder").onclick = ordenarProductos;

// Ordenamiento de los productosen la tabla (true = ASCENDENTE y false = DESCENDENTE)
let orden = true;

// Busca un Producto
function buscarproducto() {
    let codigoBuscar = document.getElementById("txtBuscar").value;
    
    let producto = inventario.seleccionarProducto(codigoBuscar);

    if (producto != null) {

        document.getElementById("codigo").value = producto.codigo;
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("precio").value = producto.precio;
        document.getElementById("cantidad").value = producto.cantidad;

        document.getElementById("btnClean1").style.display = "inline";
        document.getElementById("btnAdd").style.display = "none";
        document.getElementById("btnUpdate").style.display = "inline";
        document.getElementById("btnDelete").style.display = "inline";

        document.getElementById("notify").innerHTML = "";

    } else {
        document.getElementById("notify").innerHTML = inventario.buscarProducto(codigoBuscar);
    }
    
}

// Actualiza un Producto
function actualizarProducto() {
    let codigoActualizar = document.getElementById("txtBuscar").value;

    let codigo = document.getElementById("codigo");
    let nombre = document.getElementById("nombre");
    let precio = document.getElementById("precio");
    let cantidad = document.getElementById("cantidad");

    inventario.ActualizarProducto(codigoActualizar, codigo.value, nombre.value, precio.value, cantidad.value);

    codigo.value = "";
    nombre.value = "";
    precio.value = "";
    cantidad.value = "";

    codigo.innerHTML = "";
    nombre.innerHTML = "";
    precio.innerHTML = "";
    cantidad.innerHTML = "";

    document.getElementById("btnClean1").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnDelete").style.display = "none";
}

// Elimina un Producto
function eliminarProducto() {
    let codigoBorrar = document.getElementById("txtBuscar").value;

    let codigo = document.getElementById("codigo");
    let nombre = document.getElementById("nombre");
    let precio = document.getElementById("precio");
    let cantidad = document.getElementById("cantidad");

    codigo.value = "";
    nombre.value = "";
    precio.value = "";
    cantidad.value = "";

    codigo.innerHTML = "";
    nombre.innerHTML = "";
    precio.innerHTML = "";
    cantidad.innerHTML = "";

    document.getElementById("notify").innerHTML =  inventario.borrarProducto(codigoBorrar);
}

// Agrega un Producto
function agregarProducto() {

    let msg = "";
    let execute = true;

    let codigo = document.getElementById("codigo");

    if (codigo.value == '' && execute) {
        msg = "¡ERROR! - El campo 'Código' solo recibe números";
        execute = false;
    }

    let nombre = document.getElementById("nombre");

    if (nombre.value == '' && execute) {
        msg = "¡ERROR! - El campo 'Nombre' no puede ir vacío";
        execute = false;
    }

    let precio = document.getElementById("precio");

    if (precio.value == '' && execute) {
        msg = "¡ERROR! - El campo 'Precio' solo recibe números";
        execute = false;
    }

    let cantidad = document.getElementById("cantidad");

    if (cantidad.value == '' && execute) {
        msg = "¡ERROR! - El campo 'Cantidad' solo recibe números";
        execute = false;
    }

    if (codigo.value == '' && nombre.value == '' && precio.value == '' && cantidad.value == '') {
        msg = "¡ERROR! - Los campos están vacíos";
        execute = false;
    }

    if (execute) {
        let nuevoProducto = new Producto(codigo.value, nombre.value, precio.value, cantidad.value)
        document.getElementById("notify").innerHTML = inventario.ingresarProducto(nuevoProducto);    
    } else {
        document.getElementById("notify").innerHTML = msg;
    }
    
    codigo.value = "";
    nombre.value = "";
    precio.value = "";
    cantidad.value = "";

    codigo.innerHTML = "";
    nombre.innerHTML = "";
    precio.innerHTML = "";
    cantidad.innerHTML = "";

}

// Limpia los campos de texto
function limpiarProducto() {
    let codigo = document.getElementById("codigo");
    let nombre = document.getElementById("nombre");
    let precio = document.getElementById("precio");
    let cantidad = document.getElementById("cantidad");

    codigo.value = "";
    nombre.value = "";
    precio.value = "";
    cantidad.value = "";

    codigo.innerHTML = "";
    nombre.innerHTML = "";
    precio.innerHTML = "";
    cantidad.innerHTML = "";

    document.getElementById("notify").innerHTML = "";
}

// Lista todos los Productos
function listarProductos(){
    document.getElementById("detalles").innerHTML = inventario.ListarProducto();

    document.getElementById("notify").innerHTML = "";
}

// Ordena alternando los productos (ASCENDENTE ←→ DESCENDENTE)
function ordenarProductos() {

    if (orden) {
        document.getElementById("detalles").innerHTML = inventario.ListarProducto();

        orden = false;
    } else {
        document.getElementById("detalles").innerHTML = inventario.ListarProductoInverso();

        orden = true;
    }

    document.getElementById("notify").innerHTML = "";

}

// Filtro para los campos de texto que no llevan letras
function soloNumeros(inputId) {
    let input = document.getElementById(inputId).value;

    for (let i=0; i<input.length; i++) {
        // Comprobación de que el valor sea de tipo NUMBER
        if (typeof(input[i]) !== typeof(1)) {
            input[i] = "";
        }
    }

    document.getElementById(inputId).value = input;
    document.getElementById(inputId).innerHTML = input;
}