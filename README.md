# To-Do List con Fastify, React + Mantine y MongoDB

Este proyecto es una aplicación sencilla de lista de tareas que utiliza diversas tecnologías modernas para ofrecer una experiencia eficiente y agradable para la gestión de tareas.

## Tecnologías Utilizadas

- **Fastify (NodeJS):** Fastify es un framework web extremadamente rápido y eficiente para Node.js. Utilizamos Fastify para construir la API que alimenta la aplicación de lista de tareas.

- **React + Mantine:** React es una biblioteca de JavaScript para construir interfaces de usuario. Junto con Mantine, una librería de componentes React, desarrollé la interfaz de usuario de nuestra aplicación, lo que me permitió crear una experiencia de usuario atractiva y fácil de usar.

- **MongoDB:** MongoDB es una base de datos NoSQL que utilicé para almacenar la información relacionada con los usuarios, listas de tareas y tareas individuales de nuestra aplicación.

## Funcionalidades

- **Inicio de Sesión y Registro de Usuario:** Los usuarios pueden iniciar sesión con sus credenciales existentes o registrarse para obtener una cuenta nueva.

- **Creación y Eliminación de Listas de Tareas:** Los usuarios pueden crear nuevas listas de tareas para organizar sus actividades. También tienen la capacidad de eliminar listas de tareas cuando ya no las necesiten.

- **Creación y Eliminación de Tareas:** Dentro de cada lista de tareas, los usuarios pueden agregar nuevas tareas o eliminar las existentes según sea necesario.

- **Marcado de Completado de Tareas:** Los usuarios pueden marcar las tareas como completadas para llevar un registro de su progreso.

- **Expansión con Pop-up para Detalles de Tareas:** Cuando la descripción de una tarea es muy larga, la aplicación ofrece una función de expansión que muestra los detalles completos de la tarea en un pop-up, lo que permite una visualización cómoda y completa.

- **Mensajes de Error:**
  - Se proporcionan mensajes de error claros en caso de intento de inicio de sesión incorrecto.
  - También se notifica a los usuarios sobre problemas comunes durante el registro, como contraseñas que no coinciden o dirección de correo electrónico ya registrada.

## Configuración y Ejecución del Proyecto

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias ejecutando `npm install` en la raíz del proyecto.
3. Asegúrate de tener MongoDB instalado y en funcionamiento en tu sistema.
4. Configura las variables de entorno necesarias (por ejemplo, la URL de conexión a la base de datos) según lo especificado en el archivo `.env.example`.
5. Ejecuta el servidor de backend ejecutando `npm run dev` en la raíz del proyecto.
6. Ejecuta la aplicación de frontend ejecutando `npm run start` en la raíz del proyecto.
7. Asegúrate de que la variable API_URL del archivo de conexiones frontend/todo-frontend/api.js coincide con la url del backend.

¡Ahora deberías poder acceder a la aplicación de lista de tareas en tu navegador!

---

Este proyecto es una prueba técnica concretada el día 28/02/2024
