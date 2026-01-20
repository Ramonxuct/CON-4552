# 🚌 Plataforma de Gestión - Estación de Autobuses de Guadalajara

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)

## 📋 Descripción

Sistema integral de gestión para la Estación de Autobuses de Guadalajara que centraliza el control operativo, administrativo y de información visual en una única plataforma web moderna.

### ✨ Características Principales

- **Dashboard Operativo**: Centro de control con KPIs en tiempo real
- **Sistema de Información Visual (SIV)**: Pantallas públicas para pasajeros con actualización automática
- **Gestión de Tráfico**: Control de movimientos (llegadas/salidas) y asignación de dársenas
- **Facturación Automatizada**: Generación y gestión de facturas para compañías operadoras
- **Gestión de Compañías**: Base de datos de operadores con identidad corporativa
- **API RESTful**: Endpoints para integración con sistemas externos

## 🛠️ Tecnologías

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño responsive
- **Lucide React** - Iconografía moderna

### Backend
- **Next.js API Routes** - API RESTful integrada
- **Prisma ORM** - Gestión de base de datos
- **PostgreSQL** - Base de datos en producción
- **SQLite** - Base de datos en desarrollo

## 🚀 Inicio Rápido

### Prerrequisitos

```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Ramonxuct/CON-4552.git
cd CON-4552
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tu configuración
```

4. **Configurar base de datos**
```bash
npx prisma migrate dev
npx prisma db seed
```

5. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
├── prisma/              # Schema y migraciones de base de datos
│   ├── schema.prisma
│   └── seed.ts
├── public/              # Assets estáticos
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── admin/       # Panel de administración
│   │   ├── api/         # API Routes
│   │   ├── calendar/    # Calendario de operaciones
│   │   ├── companies/   # Gestión de compañías
│   │   └── public/      # Pantallas públicas (SIV)
│   ├── components/      # Componentes React
│   │   ├── SIV/         # Sistema de Información Visual
│   │   └── dashboard/   # Widgets del dashboard
│   ├── lib/             # Utilidades y configuración
│   └── types/           # Definiciones TypeScript
├── .env                 # Variables de entorno (no versionado)
└── package.json
```

## 🗄️ Modelo de Datos

### Entidades Principales

- **Company**: Compañías operadoras (ALSA, SAMAR, etc.)
- **Bus**: Flota de vehículos
- **Route**: Rutas definidas (origen-destino)
- **Movement**: Movimientos (llegadas/salidas)
- **Invoice**: Facturas generadas

## 📊 Módulos

### 1. Dashboard (`/`)
Centro de control con métricas operativas en tiempo real.

### 2. Sistema SIV (`/public/board`)
Pantalla pública de información para pasajeros con:
- Listado de salidas/llegadas en tiempo real
- Códigos de color por compañía
- Sistema de megafonía visual para emergencias

### 3. Gestión de Pantallas (`/admin/screens`)
Control administrativo con:
- Preview en vivo de pantallas públicas
- Gestión de contenidos multimedia
- Alertas de emergencia

### 4. Facturación (`/admin/billing`)
Módulo financiero con:
- Dashboard de ingresos
- Generación automática de facturas
- Seguimiento de pagos

### 5. Gestión de Compañías (`/companies`)
Administración de operadores:
- Datos de contacto
- Color corporativo
- Flota asignada

### 6. Calendario (`/calendar`)
Vista temporal de operaciones programadas.

## 🔌 API Endpoints

```
GET    /api/movements      - Listar movimientos
POST   /api/movements      - Crear movimiento
GET    /api/companies      - Listar compañías
POST   /api/companies      - Crear compañía
GET    /api/invoices       - Listar facturas
POST   /api/invoices       - Crear factura
```

## 🎨 Paleta de Colores

- **Primario**: `#8A1D5B` (Morado Guadalajara)
- **Acento**: `#F97316` (Naranja)
- **Fondos**: `#0F172A` (Slate 900)
- **Estados**:
  - Verde `#10B981` (éxito/a tiempo)
  - Rojo `#EF4444` (error/retrasado)
  - Azul `#3B82F6` (información)

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npx prisma studio    # Interfaz visual de base de datos
```

## 🔒 Seguridad

- HTTPS/TLS en producción
- Validación de entradas
- Sanitización contra SQL Injection/XSS
- Sesiones seguras con cookies httpOnly

## 📚 Documentación

La documentación completa del proyecto está disponible en:
- **Memoria Descriptiva**: Documento técnico completo para cliente
- **Código comentado**: Inline documentation en componentes clave

## 🤝 Contribución

Este es un proyecto privado para la Estación de Autobuses de Guadalajara.

## 📄 Licencia

Propiedad de Interactive Tech Wave - Todos los derechos reservados

## 👨‍💻 Autor

**Desarrollado por**: Interactive Tech Wave  
**Contacto**: contacto@interactivetechwave.com

---

**Versión**: 1.0  
**Última actualización**: Enero 2026
