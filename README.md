# Bots-RPAs

Una aplicación web moderna construida con React y TypeScript para la automatización de procesos y gestión de bots RPA. Esta versión demo ha sido desarrollada por Ricardo Dev, ofreciendo una solución responsive y adaptable a cualquier dispositivo.

## 🚀 Características

### 👑 Cuenta Administrador
- **Gestión de Usuarios**
  - Crear nuevos usuarios
  - Editar información de usuarios existentes
  - Eliminar usuarios
- **Gestión de Perfil**
  - Modificación de información personal
  - Actualización de credenciales
- **Gestión de Contenido**
  - Administración de preguntas frecuentes (FAQ)
  - Agregar nuevas preguntas y respuestas
  - Editar contenido existente
  - Eliminar entradas obsoletas
- **Soporte en Tiempo Real**
  - Chat en línea con usuarios
  - Sistema de notificaciones
  - Seguimiento de actividades

### 👤 Cuenta Usuario
- **Gestión de RPAs**
  - Creación de nuevos bots RPA
  - Personalización de automatizaciones
  - Eliminación de RPAs existentes
- **Perfil Personal**
  - Modificación de datos personales
  - Configuración de preferencias
- **Asistencia Inteligente**
  - Chat con IA integrado
  - Respuestas automáticas
  - Ayuda contextual

### 🌟 Características Generales
- Interfaz de usuario moderna y responsive usando CoreUI
- Gráficos interactivos con Chart.js
- Gestión de estado con Zustand
- Enrutamiento con React Router
- Soporte completo para TypeScript
- Desarrollo rápido con Vite
- Diseño adaptable a móviles, tablets y escritorio
- Tema claro/oscuro
- Navegación intuitiva

## 🛠️ Tecnologías

- React 19
- TypeScript
- Vite 6
- CoreUI 5.5
- Bootstrap 5
- Chart.js
- Zustand
- React Router DOM
- Axios

## 📱 Compatibilidad

La aplicación es totalmente responsive y compatible con:
- 📱 Dispositivos móviles
- 📱 Tablets
- 💻 Laptops
- 🖥️ Monitores de escritorio

## 📦 Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila el proyecto para producción
- `npm run lint` - Ejecuta el linter
- `npm run preview` - Vista previa de la build de producción

## 🔨 Desarrollo

### ESLint

El proyecto incluye una configuración robusta de ESLint. Para habilitar reglas de tipo:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## 🔐 Acceso al Sistema

### Administrador
```
URL: http://localhost:5173/admin
Usuario: admin@example.com
Contraseña: [Contactar al desarrollador]
```

### Usuario Regular
```
URL: http://localhost:5173
Usuario: user@example.com
Contraseña: [Contactar al desarrollador]
```

## 📝 Licencia

MIT License

## 👨‍💻 Desarrollador

Desarrollado por Ricardo Dev
Versión: Demo 1.0.0

---
© 2024 Los-42. Todos los derechos reservados.
