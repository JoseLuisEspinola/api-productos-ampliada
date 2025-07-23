# API Productos + Usuarios — Proyecto Node.js con Firestore

Esta API permite gestionar productos y usuarios usando Firestore como base de datos. Incluye operaciones completas (CRUD), validaciones detalladas, autenticación, rutas protegidas, respuestas claras, y manejo de errores.

---

## Tecnologías utilizadas

- Node.js + Express  
- Firebase Admin SDK (Firestore)  
- dotenv para variables de entorno  
- Postman (para testing de endpoints)  
- Validaciones personalizadas en middlewares  
- JSON Web Tokens (JWT) para autenticación

---

## Estructura del proyecto

/api-productos-ampliada
├── src/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── index.js              ← (Si se incluye el cliente visual en el futuro)
├── coleccion-postman.json
├── firebase-credentials.json  ← (se genera por el tester, no se incluye)
├── .env
├── package.json
├── README.md
```

---

## Endpoints disponibles

| Entidad   | Método | Ruta                             | Descripción                             |
|-----------|--------|----------------------------------|-----------------------------------------|
| Productos | GET    | `/api/products`                  | Obtener todos los productos             |
| Productos | GET    | `/api/products/:id`              | Obtener producto por ID                 |
| Productos | POST   | `/api/products/create`           | Crear nuevo producto                    |
| Productos | PUT    | `/api/products/:id`              | Modificar producto por ID               |
| Productos | DELETE | `/api/products/:id`              | Eliminar producto por ID                |
| Productos | POST   | `/api/products/create-protegido` | Crear producto con validación de acceso |
| Usuarios  | GET    | `/api/usuarios`                  | Listar todos los usuarios               |
| Usuarios  | GET    | `/api/usuarios/:id`              | Obtener usuario por ID                  |
| Usuarios  | POST   | `/api/usuarios`                  | Crear nuevo usuario                     |
| Usuarios  | PUT    | `/api/usuarios/:id`              | Actualizar usuario por ID               |
| Usuarios  | DELETE | `/api/usuarios/:id`              | Eliminar usuario por ID                 |
| Auth      | POST   | `/api/login`                     | Autenticación de usuario                |

---

## Validaciones en rutas

### En `POST /usuarios`

- Todos los campos son obligatorios: `nombre`, `email`, `password`, `rol`
- Roles permitidos: `"admin"`, `"cliente"`, `"viewer"`
- Si falta algún campo, respuesta esperada:

{
  "message": "Todos los campos son obligatorios: nombre, email, password y rol"
}

---

### En `PUT /usuarios/:id`

- Solo se actualizan los campos enviados
- Los campos omitidos se conservan
- Si el `id` no existe, se responde con:

{
  "message": "Usuario no encontrado"
}

---

### En `GET /products/:id`

- Si el producto existe:

{
  "message": "Producto encontrado",
  "payload": { ... }
}

- Si el `id` no existe:

{
  "message": "Producto no encontrado"
}

---

## Manejo de errores

### JSON mal formado

Si el cliente envía un JSON con error de sintaxis (por ejemplo, sin comas), la API responde con:

{
  "message": "Error de formato en el JSON recibido"
}

Esto se gestiona con un middleware global en `src/index.js` que intercepta errores de parsing (SyntaxError).

---

## Seguridad

- El campo `password` **NO** se incluye en las respuestas
- Los tokens se generan al autenticarse vía `POST /api/login`
- Las rutas protegidas verifican el rol antes de permitir acceso (ej. `admin`)
- No se expone información sensible en ningún endpoint

---

## Colección Postman incluida

Se incluye el archivo `coleccion-postman.json` para testear la API sin configurar las peticiones manualmente. Incluye ejemplos para:

- CRUD completo de productos
- CRUD completo de usuarios
- Autenticación (`/api/login`)
- Ruta protegida (`/api/products/create-protegido`)

Esta colección puede importarse directamente en Postman, para ejecutar pruebas sin configurar cada request.

---

## Observaciones adicionales

- El campo `id` en el body no se toma en cuenta en actualizaciones, solo la URL define el recurso
- Las respuestas siguen una estructura uniforme: `message` + `payload`
- La API puede testearse en modo local con `npm run dev` o `node src/index.js`

---

## API lista para testeo

La API está preparada para:

- Validar datos con precisión
- Rechazar inputs incompletos o inválidos
- Informar errores con mensajes claros y útiles
- Ser testeada manual o automáticamente usando Postman

---

## Configuración de credenciales Firebase

Para que el tester/profesor pueda ejecutar el proyecto localmente con Firestore, debe:

1. Acceder a [Firebase Console](https://console.firebase.google.com)
2. Crear un nuevo proyecto
3. Ir a **Configuración del proyecto → Cuentas de servicio**
4. Seleccionar **Firebase Admin SDK**
5. Generar una nueva clave privada
6. Guardar el archivo `.json` descargado como:

firebase-credentials.json

7. Crear un archivo `.env` con la siguiente línea:

GOOGLE_APPLICATION_CREDENTIALS=firebase-credentials.json

Esto permite que el servidor use Firebase Admin SDK con acceso privado a la base de datos.

El archivo `.json` de credenciales NO se incluye en el repositorio por razones de seguridad.

---

## Ejemplo de archivo `.env`

Los valores que se muestran son ilustrativos — deben completarse con datos reales del proyecto Firebase:

PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=firebase-credentials.json

FIREBASE_PROJECT_ID=tu-proyecto-en-firestore
FIREBASE_PRIVATE_KEY_ID=clave_privada_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=cuenta-de-servicio@tu-proyecto.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=000000000000000000000
FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com

JWT_SECRET=clave-super-secreta-para-generar-token

---


🙋🏻‍♀️Tutora: Triana Menendez- triana.menendez@bue.edu.ar
🙋🏻‍♂️Instructor: Daniel Riverol - d.riverol@bue.edu.ar


## AUTOR

**Jose Luis Espínola**  
Backend con Node.js + Firebase  
Proyecto académico con prácticas profesionales y foco en calidad técnica

