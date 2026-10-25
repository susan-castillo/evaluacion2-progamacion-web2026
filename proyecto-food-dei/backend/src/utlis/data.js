// Inventario inicial del restaurante
let inventario = [
    { id: 101, nombre: "Menú Ejecutivo (Pollo)", precio: 5.50, stock: 12, categoria: "Fuerte" },
    { id: 102, nombre: "Lasaña de Carne", precio: 6.00, stock: 5, categoria: "Fuerte" },
    { id: 103, nombre: "Ensalada César", precio: 3.50, stock: 8, categoria: "Entrada" },
    { id: 104, nombre: "Sopa del Día", precio: 2.50, stock: 10, categoria: "Entrada" },
    { id: 105, nombre: "Jugo Natural", precio: 1.50, stock: 15, categoria: "Bebida" }
];

// Estado global de la reserva del restaurante
let reserva = {
    saldo: 25.00,
    itemsReservados: [],
    total: 0.00
}

// Función para recalcular el total de la reserva
const calcularTotal = () => {
    // El metodo reduce sirve para recorrer un array y reducirlo a un unico valor
    // Nos facilita el hecho de no crear una variable externa, haciendo el calculo del total mas limpio
    return reserva.itemsReservados.reduce((sum, item)=>{
        const plato = inventario.find(p => p.id === item.id);
        return sum + (plato ? plato.precio * item.cantidad : 0);
    }, 0);
};

// Exportamos nuestras funciones y objetos para que puedan ser utilizados en otros archivos
module.exports = {
    inventario,
    reserva,
    calcularTotal
}