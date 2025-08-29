# Ejercicio 2 - Creación de un servidor HTTP con fastify.
![fastify](https://d2ooyrflu7lhqd.cloudfront.net/fastify_fb_share_image_07b6e6860853c758_c74e8381af.png?format=auto)
___
## 📃 Requisitos del proyecto 📃

- Almacenar en memoria un listado de usuarios
- Los usuarios tienen:
  -  **id_usuario**: *number*
  -  **nombre**: *string*
  -  **isAdmin**: *boolean*
___
## 📌 Objetivo del proyecto 📌
### Apartir de la documentación swagger autogenerada el equipo debera:

- #### Crear las cuatro operaciones basicas de **CRUD**
  - **GET**: Obtener los usuarios del listado completo *"/usuarios"*
  - **POST**: Crear un usuario nuevo *"/usuarios"*
  - **GET**: Obtener un usuario especifico según su id *"/usuarios/:id_usuarios"*
  - **PUT**: Modificar datos de un usuario especifico según su id *"/usuarios/:id_usuarios"*
  - **DELETE**: Eliminar un usuario especifico según su id *"/usuarios/:id_usuarios"*
___
## 🚀 Ejecución del proyecto 🚀
### 📡 Servidor 📡
#### Dentro del proyecto es posible ejecutar el servidor:
 - npm run dev
   - Esto ejecuta el script =>  "dev": "npm install && node --watch server.ts" <= definido dentro del package-json
#### Luego de ejecutar el servidor ya podremos hacerle las peticiones
### 📲 Cliente 📲
#### Para ver los metodos creados en el cliente se encuentra en la ruta "./src/routes/usuarios/usuarios.ts". Es necesario seguir los siguientes pasos
- Luego de iniciar el servidor
  - Ingresar en la url localhost:3000/docs/
  - Veremos los metodos (CRUD) listados en la parte inferior de la pantalla.
  - Debemos desplegar la pestaña "usuarios" haciendo click en la misma.
  - Seleccionamos el metodo que deseemos probar.
  - Para ejecutar el metodo es necesario clickear en "Try it out".
  - Si el metodo no requiere parametros obligatorios (como el GET /usuarios) hacemos click en "Execute"
  - Listo, con eso ya estaria probado el metodo (CRUD) que fue creado en el archivo "usuarios.ts" del cliente.
___
## 🔅 Demostración de uso 🔅
### A continuación video demostración del proyecto.
#### Click en la imagen para ver el video.
[![Mira el video](https://i.postimg.cc/MpXdL38k/Servidor-Web-con-Fastify-y-Type-Script.png)](https://youtu.be/J8FPKk0-RVo)
