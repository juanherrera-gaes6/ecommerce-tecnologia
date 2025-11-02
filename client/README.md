# Sistema de Gestión de Productos de tecnología - Ecommerce

Aplicación web Full Stack desarrollada con React, Node.js, Express y MySQL, diseñada para simular una página de tecnología.


## 📑 Contenido

- [Descripción](#-descripción)
- [Tecnologías Usadas](#-tecnologías-usadas)
- [Instalación y Ejecución](#-instalación-y-ejecución)



## 🧾 Descripción

Permite la gestión completa de productos de una tienda (crear, listar, actualizar y eliminar registros).
Además, incluye la simulación de las funcionalidades clave de un e-commerce: la capacidad de ingresar productos al inventario, agregarlos en un carrito de compras y finalizar el proceso con una orden de compra.

Cada producto cuenta con los siguientes atributos:

- Nombre  
- Precio  
- Stock  
- Categoría  
- Descripción  

Los usuarios pueden:

- Crear productos nuevos.
- Ver la lista completa de productos.
- Editar productos existentes.
- Eliminar productos.
- Simular una orden de compra.

## Tecnologías Usadas

Frontend:

- React.js  
- Html
- css
- bootstrap

Backend:
- Node.js  
- Express.js  
- MySQL2  

Base de Datos:
- MySQL

---

## 🚀 Instalación y Ejecución

1. Preparación de la Base de Datos (Backend) 💾
Abre el gestor de bases de datos (MySQL).

Ejecuta el archivo de script SQL para crear la estructura de la base de datos (tablas de productos) y dejarla lista para la conexión.

CREATE DATABASE ecommerce;
use ecommerce;
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    descripcion TEXT
);

2. Inicio del Servidor (Backend) ⚙️
El servidor provee los datos y la lógica de la aplicación.

Abre una terminal y navega a la carpeta server.

Ejecuta el comando para iniciar el servidor en modo desarrollo (npm run dev).

(El servidor se pondrá en escucha, generalmente en un puerto como 3001).

3. Inicio de la Interfaz de Usuario (Frontend) 🖥️
La interfaz de usuario de React permite la interacción.

Abre una segunda terminal y navega a la carpeta client.

Ejecuta el comando para iniciar la aplicación cliente (npm start).

(Esto abrirá la aplicación en tu navegador, generalmente en http://localhost:3000).

4. Simulación: Cargar Productos y Comprar 🛒
Una vez que la página esté visible, realiza las siguientes acciones:

Registro de Productos:

Ubica el formulario de registro.

Llena todos los campos para crear al menos dos productos (Producto, Precio, Stock, Categoría, Descripción).

Guarda los registros.

Agregar al Carrito:

Busca los productos que acabas de registrar en el listado de la tienda.

Agrega una unidad de cada uno de ellos al Carrito de Compras.

Crear Orden de Compra:

Dirígete al carrito o a la página de checkout.

Confirma la compra para simular la generación de la Orden de Compra, la cual debe acumular el precio total de los artículos.


