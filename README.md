# 🧠 API Productos + Usuarios — Proyecto Node.js con Firestore

Esta API permite gestionar productos y usuarios usando Firestore como base de datos. Incluye operaciones completas (CRUD), validaciones detalladas, respuestas claras, y control de errores para cada ruta.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express  
- Firebase Admin SDK (Firestore)  
- Postman (para testing de endpoints)  
- dotenv para variables de entorno  
- Validaciones personalizadas en middlewares

---

## 📦 Estructura del proyecto

```
/api-productos-ampliada
├── src/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── index.js
├── coleccion-postman.json
├── README.md
├── .env
├── package.json
```

---


## 📮 Endpoints disponibles

| Entidad   | Método | Ruta                             | Descripción                             |
|-----------|--------|----------------------------------|-----------------------------------------|
| Productos | GET    | `/api/products`                  | Obtener todos los productos             |
| Productos | GET    | `/api/products/:id`              | Obtener producto por ID                 |
| Productos | POST   | `/api/products/create`           | Crear nuevo producto                    |
| Productos | PUT    | `/api/products/:id`              | Modificar producto por ID               |
| Productos | DELETE | `/api/products/:id`              | Eliminar producto por ID                |

| Auth      | POST   | `/api/login`                     | Autenticación de usuario                |
| Productos | POST   | `/api/products/create-protegido` | Crear producto con validación de acceso |

| Usuarios  | GET    | `/api/usuarios`                  | Listar todos los usuarios               |
| Usuarios  | GET    | `/api/usuarios/:id`              | Obtener usuario por ID                  |
| Usuarios  | POST   | `/api/usuarios`                  | Crear nuevo usuario                     |
| Usuarios  | PUT    | `/api/usuarios/:id`              | Actualizar usuario por ID               |
| Usuarios  | DELETE | `/api/usuarios/:id`              | Eliminar usuario por ID                 |


---

## Validaciones en rutas

### En `POST /usuarios`

- Todos los campos son obligatorios: `nombre`, `email`, `password`, `rol`
- Si falta alguno, se responde con:

{
  "message": "Todos los campos son obligatorios: nombre, email, password y rol"
}


- El campo `rol` solo acepta: `"admin"`, `"cliente"`, `"viewer"`

---

### En `PUT /usuarios/:id`

- Se actualizan solo los campos enviados  
- Los campos omitidos se conservan  
- Si el `id` no existe, se responde con:


{
  "message": "Usuario no encontrado"
}


---

## Manejo de errores

### JSON mal formado

Si el cliente envía un JSON con error de sintaxis (por ejemplo, sin comas), la API responde con:

```json
{
  "message": "Error de formato en el JSON recibido"
}
```

Esto se gestiona con un middleware global en `src/index.js` que intercepta errores de parsing (SyntaxError).

---

## Seguridad

- El campo `password` NO se excluye en las respuestas.
- No se expone información sensible en ningún endpoint.

---

## COLECCION Postman incluida

En el directorio raíz se encuentra el archivo `coleccion-postman.json` con todos los endpoints configurados para testing:

- Productos: `GET`, `POST`, `PUT`, `DELETE`  
- Usuarios: `GET`, `POST`, `PUT`, `DELETE`

Podés importarla directamente en Postman para ejecutar pruebas sin configurar cada request.

---

## Observaciones adicionales

- El campo `id` en el body no es obligatorio ni se toma en cuenta durante modificaciones  
- Si el `id` del body difiere del de la URL, el sistema usa el de la URL  
- Las respuestas están diseñadas para ser limpias y claras ante cualquier situación

---

## Tester

La API está preparada para:

- Rechazar inputs incompletos  
- Informar errores con claridad y precisión  
- Validar comportamiento esperado bajo pruebas manuales o automatizadas  
- Devolver mensajes adaptados tanto a desarrolladores como testers (esto si que fui crítico de mi codigo)

---

## AUTOR

**Jose Luis Espínola**  
Backend con Node.js + Firebase  
Proyecto académico con prácticas profesionales y foco en calidad técnica


✨ ¡Espero APROBAR! ✨
