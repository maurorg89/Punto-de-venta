function reloj(){
    var d = new Date();
    dd=d.getDate();
    mm=d.getMonth();
    y=d.getFullYear();
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();

    hora = "Fecha:" + dd+"/"+mm+"/"+y + "<br>" + "Hora:" + h + ":" + m + ":" + s;

    document.getElementById("reloj").innerHTML = hora
    setTimeout("reloj()",1000)
}
/* window.onload =  */
function productos() {
    // Variables
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'Alambre de aluminio',
            precio: 65,
        },
        {
            id: 2,
            nombre: 'Maceta grande',
            precio: 150,
        },
        {
            id: 3,
            nombre: 'Podadora concava',
            precio: 1950,
        },
        {
            id: 4,
            nombre: 'Tijera 180mm',
            precio: 850,
        }

    ]
    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
    let $botonVaciar = document.querySelector('#boton-vaciar');
    let $botonnuevo = document.querySelector('#boton-nuevo');

    // Funciones
    function renderItems() {
        for (let info of baseDeDatos) {
           cargaritem(info)
        }
    }

    function cargaritem(info){
         // Estructura
         let miNodo = document.createElement('tr');
         // Body
         let miNododato1 = document.createElement('td');
         let miNododato2 = document.createElement('td');
         let miNododato3 = document.createElement('td');
         // Titulo
         let miNodoTitle = document.createElement('h5');
         miNodoTitle.textContent = info['nombre'];
         // Precio
         let miNodoPrecio = document.createElement('p');
         miNodoPrecio.textContent = '$' + info['precio']  ;
         // Boton 
         let miNodoBoton = document.createElement('button');
         miNodoBoton.textContent = '+';
         miNodoBoton.setAttribute('marcador', info['id']);
         miNodoBoton.addEventListener('click', anyadirCarrito);
         // Insertamos
         miNododato1.appendChild(miNodoTitle);
         miNododato2.appendChild(miNodoPrecio);
         miNododato3.appendChild(miNodoBoton);
         miNodo.appendChild(miNododato1);
         miNodo.appendChild(miNododato2);
         miNodo.appendChild(miNododato3);
         $items.appendChild(miNodo);
    }

    function anyadirCarrito () {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(this.getAttribute('marcador'))

        var d = new Date();
        dd=d.getDate();
        mm=d.getMonth();
        y=d.getFullYear();
        h = d.getHours();
        m = d.getMinutes();
        s = d.getSeconds();
        fecha = "Fecha:" + dd+"/"+mm+"/"+y ;
        hora = "Hora:" + h + ":" + m + ":" + s;
        console.log("Producto añadido al carrito");
        console.log(fecha);
        console.log(hora);
        console.log("id:",this.getAttribute('marcador'));
        // Calculo el total
        calcularTotal();
        // Renderizamos el carrito 
        renderizarCarrito();
    }

    function renderizarCarrito() {
        // Vaciamos todo el html
        $carrito.textContent = '';
        // Quitamos los duplicados
        let carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach(function (item, indice) {
            // Obtenemos el item que necesitamos de la variable base de datos
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            // Cuenta el número de veces que se repite el producto
            let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            let miNodo = document.createElement('li');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - $ ${miItem[0]['precio']}`;
            // Boton de borrar
            let miBoton = document.createElement('button');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }

    function borrarItemCarrito() {
        console.log()
        // Obtenemos el producto ID que hay en el boton pulsado
        let id = this.getAttribute('item');
        // Borramos todos los productos
        carrito = carrito.filter(function (carritoId) {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
    }

    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        for (let item of carrito) {
            // De cada elemento obtenemos su precio
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }
        // Formateamos el total para que solo tenga dos decimales
        let totalDosDecimales = total.toFixed(2);
        // Renderizamos el precio en el HTML
        $total.textContent = totalDosDecimales;
    }

    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
    }

    function itemnuevo(evt) {
        evt.preventDefault();
        var art = document.getElementById("articulo").value;
        var prec = Number (document.getElementById("precio").value);
        if(isNaN(prec) || prec <= 0 ){
            alert("Valor de precio no válido")
            return false;
        }
        if(art === "" || !isNaN(Number(art))){
            alert("Valor de producto no válido");
            return false;
        }
        for (let info of baseDeDatos) {
            if( art === info['nombre']){
                alert("Producto ya existente");
                return false;
            }
        }
        var d = new Date();
        dd=d.getDate();
        mm=d.getMonth();
        y=d.getFullYear();
        h = d.getHours();
        m = d.getMinutes();
        s = d.getSeconds();
        fecha = "Fecha:" + dd+"/"+mm+"/"+y 
        hora = "Hora:" + h + ":" + m + ":" + s;
        console.log("Producto añadido a la base de datos");
        console.log(fecha);
        console.log(hora);
        console.log("id:",baseDeDatos.length + 1);
        var nuevoitem = {id: baseDeDatos.length + 1, nombre: art, precio: prec};
        baseDeDatos.push(nuevoitem);
        cargaritem(nuevoitem);
        /* renderItems() */
    }

    // Eventos
    $botonVaciar.addEventListener('click', vaciarCarrito);
    $botonnuevo.addEventListener('click', itemnuevo);

    // Inicio
    renderItems();
} 