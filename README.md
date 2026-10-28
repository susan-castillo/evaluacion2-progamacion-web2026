# Evaluación II — Programación Web 2026

## Descripción del Proyecto

El repositorio está compuesto por dos soluciones académicas integradas en una misma plataforma web:

1. **Ejercicio 1: ¡Adivina el Número! (Flujo Básico y Estado)**
    * Juego interactivo de lógica en el que el usuario intenta adivinar un número secreto entre 1 y 100 generado en memoria por el servidor.
    * Proporciona retroalimentación dinámica en tiempo real (*MAYOR*, *MENOR*, *CORRECTO*), gestión de reinicio y despliegue de un historial de intentos.

2. **Ejercicio 2: Sistema de Gestión de Reservas (Food DEI S.A. de R.L.)**
    * Módulo de reservas de platillos para restaurante con control estricto de inventario en memoria y saldo de almuerzo limitado.
    * Incorpora un temporizador reactivo controlado en el frontend (180 segundos), bloqueo de stock al agregar o confirmar la reserva, y manejo dinámico de raciones con control de errores mediante alertas.

---

## Tecnologías utilizadas

### Backend
* **Node.js** — Entorno de ejecución de JavaScript en el servidor.
* **Express.js** — Framework web para la construcción de la API REST.
* **CORS** — Middleware para habilitar la comunicación entre dominios cruzados.

### Frontend
* **React.js (Vite)** — Biblioteca para la construcción de la interfaz de usuario basada en componentes.
* **Reactstrap & Bootstrap 5** — Componentes de diseño adaptativo e interfaz gráfica.
* **React Router DOM (v6)** — Gestión de rutas y navegación dinámicas.

---

## Arquitectura de la API REST (Endpoints)

### Ejercicio 1 — Juego
* `POST /api/juego/guess` — Recibe un número, lo evalúa contra el valor secreto y actualiza el historial.
* `POST /api/juego/reset` — Genera un nuevo número aleatorio y limpia el historial en el servidor.

### Ejercicio 2 — Food DEI S.A.
* `GET /api/reserva/menu` — Devuelve la lista completa del menú con sus precios y stock disponible.
* `GET /api/reserva/reserva` — Devuelve la reserva activa y el saldo del usuario.
* `POST /api/reserva/reserva/agregar` — Agrega temporalmente un platillo a la reserva y descuenta su stock.
* `PUT /api/reserva/reserva/actualizar-porciones/:id` — Permite aumentar o reducir la cantidad de porciones desde la bandeja.
* `DELETE /api/reserva/reserva/eliminar/:id` — Quita un platillo de la reserva y devuelve sus raciones al stock general.

---

## Instalación y ejecución local

Sigue estos pasos para ejecutar el proyecto localmente en tu entorno de desarrollo:

## 1. Configurar y levantar el backend
* `cd backend`
* `npm install`
* `npm start`

El servidor backend se ejecutará en http://localhost:5000.

## 2. Configurar y levantar el frontend
* `cd frontend`
* `npm install`
* `npm run dev`

La aplicación web estará disponible en http://localhost:5173.

---
## Declaración sobre el uso de inteligencia artificial
En cumplimiento con las directrices académicas de la asignatura, se declara que para el desarrollo de este proyecto se contó con el apoyo de herramientas de Inteligencia Artificial Generativa como asistente en la resolución de dudas y depuración de código