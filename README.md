# 📊 Onboarding Dashboard

Una aplicación moderna de gestión de empleados para el proceso de onboarding, construida con las últimas tecnologías web.

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm/yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd onboarding-dashboard

# Instalar dependencias
pnpm install

# Configurar variables de entorno (opcional)
cp .env.example .env.local
```

### Comandos Disponibles
```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo con Turbopack
pnpm build            # Build de producción
pnpm start            # Servidor de producción

# Testing
pnpm test             # Ejecutar tests
pnpm test:watch       # Tests en modo observación

# Linting & Type Checking
pnpm lint             # ESLint
pnpm type-check       # TypeScript validation
```

### **Stack Tecnológico Completo**
```typescript
🎯 Core: Next.js 15 + React 19 + TypeScript
🎨 Styling: Tailwind CSS 4 + Design System
📝 Forms: React Hook Form + Zod validation
🗃️ State: Context API + localStorage
📅 Dates: Luxon (evita new Date())
🔍 Icons: Lucide React
🧪 Testing: Jest + React Testing Library
🚀 Build: Turbopack (Next.js optimized)
🐳 Containerization: Docker + docker-compose
🔄 CI/CD: GitHub Actions pipeline
```

### Ejecución Local
```bash
pnpm dev
```
Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

### 🐳 Docker
```bash
# Build y ejecutar con Docker
docker-compose up --build

# O para desarrollo con hot reload
docker-compose up dev

# Build manual
docker build -t onboarding-dashboard .
docker run -p 3000:3000 onboarding-dashboard
``## 🏗️ Decisiones Técnicas Importantes

### **1. Next.js 15 con App Router**
- **Por qué**: Elegí Next.js 15 por su arquitectura moderna de App Router, mejor performance y soporte nativo para React Server Components
- **Beneficio**: Routing declarativo, middleware integrado, y optimizaciones automáticas

### **2. React Hook Form + Zod**
- **Por qué**: Combinación más eficiente para formularios complejos con validación robusta
- **Beneficio**: 
  - Performance superior vs useState native
  - Validación tanto client-side como server-side
  - TypeScript inference automático

### **3. Server Actions**
- **Por qué**: API más simple que REST/GraphQL para operaciones CRUD
- **Beneficio**: Código más limpio, mejor DX, eliminación de boilerplate API

### **4. Luxon para Fechas**
- **Por qué**: Librería más robusta que Date nativo
- **Beneficio**: Mejor manejo de timezones, operaciones inmutables, API más limpia

### **5. Tailwind CSS 4**
- **Por qué**: Desarrollo rápido, consistencia visual, fácil mantenimiento
- **Beneficio**: Responsive design, tema dark/light automático

### **6. Jest + React Testing Library**
- **Por qué**: Estándar de la industria para testing React
- **Beneficio**: Coverage completo, tests rápidos, mejores prácticas

### **7. Docker Containerization**
- **Por qué**: Consistencia entre entornos, deployment simplificado
- **Beneficio**: "It works on my machine" eliminado, scaling horizontal fácil

### **8. GitHub Actions CI/CD**
- **Por qué**: Automatización completa del proceso de calidad y deployment
- **Beneficio**: Checks automáticos, no bugs en main, mejor collaboration workflow

## ✨ Features Implementadas

### **🔐 Autenticación**
```typescript
- Login con JWT tokens
- Middleware de protección de rutas
- Context API para manejo de estado
- Server Actions para auth
```

### **👥 Gestión de Empleados**
```typescript
- CRUD completo de empleados
- Formulario avanzado con auto-save draft
- Validación en tiempo real
- Tabla dinámica con paginación y filtros
- Botón Edit en página de detalle (pre-llenado)
```

### **📝 Formularios Inteligentes**
```typescript
✅ Auto-save cada 30 segundos en localStorage
✅ Recuperación automática al recargar página
✅ Limpieza post-submit exitoso
✅ Validación con Zod schemas
✅ Estados de error visuales (rojos)
```

### **🎨 UI/UX**
```typescript
- Design System completo (Button, Input, Card, Table)
- Toast notifications
- Copy-to-clipboard para credenciales demo
- Responsive design completo
```

### **⏰ Gestión de Tiempo**
- Componente DatePicker integrado
- Formato de fechas consistente
- Validación de fechas futuras/pasadas

### **📊 Data Management**
- Mock data en memoria
- Server Actions para persistencia
- Revalidación de cache automática
- TypeScript strict mode

### **🧪 Testing Infrastructure**
```typescript
✅ Jest + React Testing Library setup completo
✅ 25 tests passing (100% success rate)
✅ Component testing: Button, Input, Card
✅ Jest DOM matchers configurados
✅ Mock strategies para Next.js
✅ CI/CD integration en GitHub Actions
```

## ⏱️ Tiempo Invertido

**📅 Total: ~17 horas** 
- Configuración inicial y arquitectura
- Implementación core features (auth, empleados, formularios)
- Testing y refinamientos UX

## 🤖 Uso de AI

### **Qué se usó AI para:**
- 📝 **Crear boilerplate code**: Estructura inicial de tests y componentes
- 🔧 **Debugging específico**: Resolver errores de console
- 🐛 **Error resolution**: Resolver problemas de configuración (Jest, ESLint)

### **Documentación generada:**
- Este README 

## 🚀 DevOps & Containerización

### **🐳 Docker Implementation**
```typescript
✅ Dockerfile multi-stage optimizado para Next.js
✅ docker-compose para producción simplificada  
✅ Image size optimizado con Alpine Linux
✅ Security hardening (non-root user)
✅ Restart policies automáticas
```

**Comandos Docker:**
```bash
# Producción completa
docker-compose up --build

# Solo build manual
docker build -t onboarding-dashboard .
docker run -p 3000:3000 onboarding-dashboard
```

### **🔄 CI/CD Pipeline con GitHub Actions**
```typescript
✅ GitHub Actions workflow configurado
✅ Linting automático (ESLint)
✅ Type checking automático (TypeScript)
✅ Build verification automático
✅ Cache de dependencies para performance
✅ Runs en push y pull requests
✅ Node.js 20 + pnpm optimizado
```

**Pipeline Flow:**
```bash
1. Trigger: Push/PR → main branch
2. Checkout code + Setup Node.js 20
3. Install pnpm + cache dependencies  
4. Run linting (ESLint)
5. Run type checking (TypeScript)
6. Build application (verification)
7. ✅ All checks must pass
```

## 🎯 Demo Credentials

```
Email: admin@rebuhr.com
Password: password123
```

## 📋 Licencia

MIT License - Libre para uso personal y comercial.

---
