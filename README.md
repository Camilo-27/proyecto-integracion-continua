# Proyecto de Software - Integración Continua
## Politécnico Grancolombiano - Énfasis Profesional I

### Integrantes
- Juan Camilo Guzman Parra

### Descripción
Sistema de Gestión de Tareas desarrollado con Node.js, Express y MySQL, 
desplegado mediante contenedores Docker como parte del módulo de 
Integración Continua.

### Arquitectura
El proyecto está compuesto por tres contenedores Docker comunicados 
entre sí a través de una red interna llamada `todo-network`:

| Contenedor | Tecnología | Puerto |
|---|---|---|
| todo_frontend | Nginx | 8080 |
| todo_backend | Node.js / Express | 3000 |
| todo_db | MySQL 8.0 | 3307 |

### Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/health | Verificación de salud del servicio |
| GET | /api/tareas | Listar todas las tareas |
| POST | /api/tareas | Crear una nueva tarea |
| GET | /api/tareas/:id | Consultar una tarea por ID |
| PUT | /api/tareas/:id | Actualizar una tarea |
| DELETE | /api/tareas/:id | Eliminar una tarea |

### Requisitos
- Docker Desktop instalado
- Git

### Instrucciones de instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/TU_USUARIO/proyecto-integracion-continua.git
cd proyecto-integracion-continua
```

2. Levantar los contenedores:
```bash
docker-compose up --build
```

3. Abrir en el navegador:
- Frontend: http://localhost:8080
- API: http://localhost:3000/api/health

### Herramientas utilizadas
- **GitHub** - Control de versiones y repositorio
- **Docker** - Contenedorización de servicios
- **Docker Compose** - Orquestación de contenedores
- **Node.js / Express** - Backend y API REST
- **MySQL** - Base de datos relacional
- **Nginx** - Servidor web para el frontend

### Hoja de ruta
- **Semana 3 (Entrega 1):** ✅ Tres contenedores Docker comunicados entre sí
- **Semana 5 (Entrega 2):** Jenkins como gestor de operaciones
- **Semanas 7 y 8 (Entrega 3):** Integración con Travis CI y Codeship