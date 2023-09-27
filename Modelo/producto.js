//control de inventario de productos usando el sistema de catalogo mediante el uso de la clase producto
//alamcenamiento de clases 
class Producto {

    constructor(codigo, nombre, precio, cantidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    //metodo para regresar los datos del producto
    mostrarInformacion() {
        return ` ${this.codigo } Nombre: ${this.nombre} Precio: ${this.precio} Cantidad: ${this.cantidad}`;
    }   
   
} 
    
class Inventario{

    constructor(){
        this.productos=new Array()
    }

    ingresarProducto(producto){ //comprobar que no se repita y agregar de forma ordenada 
        this.productos.push(producto);

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

        return "<p> El producto se ha ingresado correctamente </p>";
    }

    buscarProducto(codigoBuscar){
        for(let i=0; i<this.productos.length ; i++){
            if(codigoBuscar==this.productos[i].codigo){
                return "<p> Codigo: " + this.productos[i].codigo + " Nombre:" + this.productos[i].nombre + " Precio:" + this.productos[i].precio + " Cantidad:" + this.productos[i].cantidad + "</p>"
            }
        }
        return "No existe"
    }

    borrarProducto(codigoBorrar){
        for(let i = 0; i<this.productos.length;i++){
            if(codigoBorrar == this.productos[i].codigo){
                for(let j = i; j < this.productos.length; j++){
                    this.productos[j] = this.productos[j+1];
                }
                this.productos.pop();
                return "<p> Se ha borrado exitosamente </p>"
            }
        }
    }

    ListarProducto(){
        let res = "<table><tr><td> Codigo </td><td> Nombre </td><td> Precio </td><td> Cantidad </td></tr>"
        for(let i = 0; i < this.productos.length; i++){
            res += "<tr><td>" + this.productos[i].codigo + "</td><td>" + this.productos[i].nombre + "</td><td>" + this.productos[i].precio + "</td><td>" + this.productos[i].cantidad +"</td></tr>";
        }
        res += "</table>";
        return res;
    }

    seleccionarProducto(buscar) {
        for(let i = 0; i < this.productos.length; i++){
            if(this.productos[i].codigo == buscar){
                return this.productos[i];
            }
        }

        return null;
    }

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
        return "<p> No se ha encontrado el codigo </p>"
    }
}

let inventario = new Inventario();

document.getElementById("btnBuscar").onclick = buscarproducto;
document.getElementById("btnClean1").onclick = limpiarProducto;

document.getElementById("btnAdd"). onclick = agregarProducto;
document.getElementById("btnDelete").onclick = eliminarProducto;
document.getElementById("btnUpdate").onclick = actualizarProducto;
document.getElementById("btnClean2").onclick = limpiarProducto;

document.getElementById("btnListar").onclick = listarProductos;

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

    } else {
        document.getElementById("detalles").innerHTML = inventario.buscarProducto(codigoBuscar)
    }
    
}

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

    document.getElementById("detalles").innerHTML =  inventario.borrarProducto(codigoBorrar);
}


function agregarProducto() {
    let codigo = document.getElementById("codigo");
    let nombre = document.getElementById("nombre");
    let precio = document.getElementById("precio");
    let cantidad = document.getElementById("cantidad");

    let nuevoProducto = new Producto(codigo.value, nombre.value, precio.value, cantidad.value)
    document.getElementById("detalles").innerHTML = inventario.ingresarProducto(nuevoProducto);
    console.log(inventario);

    codigo.value = "";
    nombre.value = "";
    precio.value = "";
    cantidad.value = "";

    codigo.innerHTML = "";
    nombre.innerHTML = "";
    precio.innerHTML = "";
    cantidad.innerHTML = "";

}

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
}


function listarProductos(){
    document.getElementById("detalles").innerHTML = inventario.ListarProducto();
}