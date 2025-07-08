# Feature: Slidebar de Perfil de Usuario

## Descripción
Implementación de una pantalla con slidebar para el perfil de usuario, visible post-registro. El slidebar incluye información completa del usuario, opciones de edición y cierre de sesión.

## Características Implementadas

### ✅ Componente HTML
- **Datos dinámicos del usuario**: nombre, email, avatar, teléfono, bio, fecha de registro, eventos creados
- **Interfaz intuitiva**: diseño moderno con iconos SVG
- **Estados de carga**: spinner animado mientras se cargan los datos
- **Botones de acción**: editar perfil y cerrar sesión

### ✅ Estilos CSS Responsivos
- **Animación slide-in**: transición suave desde la derecha
- **Diseño adaptable**: responsive para móviles, tablets y desktop
- **Variables CSS**: sistema de colores y transiciones consistentes
- **Efectos hover**: interacciones visuales mejoradas
- **Scrollbar personalizado**: diseño coherente con la app

### ✅ Lógica TypeScript
- **Event listeners**: manejo de apertura/cierre del slidebar
- **Fetch de datos**: integración con AuthService para obtener datos del usuario
- **Gestión de estado**: observables para cambios en tiempo real
- **Manejo de memoria**: cleanup de suscripciones
- **Interfaz tipada**: UserProfile interface para type safety

### ✅ Integración con AuthService
- **Observable de perfil**: userProfile$ para cambios dinámicos
- **Persistencia**: localStorage para mantener datos entre sesiones
- **Métodos de actualización**: updateUserProfile() para modificaciones
- **Gestión de sesión**: integración con login/logout

## Estructura de Archivos

```
src/app/
├── pages/profile/
│   ├── profile.ts          # Componente principal
│   ├── profile.html        # Template del slidebar
│   └── profile.css         # Estilos responsivos
├── services/
│   └── auth.service.ts     # Servicio actualizado con UserProfile
├── app.ts                  # Componente principal actualizado
├── app.html               # Template principal con perfil
├── app.routes.ts          # Rutas actualizadas
└── app.css                # Estilos de integración
```

## Funcionalidades

### 🎯 Slidebar del Perfil
- **Apertura/cierre**: botón en navbar + overlay click
- **Animación suave**: transición de 0.3s con ease
- **Overlay con blur**: efecto de desenfoque en el fondo
- **Scroll interno**: para contenido extenso

### 👤 Información del Usuario
- **Avatar editable**: con botón de edición
- **Datos personales**: nombre, email, teléfono
- **Información de cuenta**: fecha de registro, eventos creados
- **Bio personal**: descripción del usuario

### 🎨 Diseño Responsivo
- **Desktop**: slidebar de 400px de ancho
- **Tablet**: ajustes de padding y tamaños
- **Móvil**: slidebar full-width con optimizaciones

### ⚡ Interacciones
- **Hover effects**: en botones y elementos interactivos
- **Focus states**: para accesibilidad
- **Loading states**: spinner durante carga de datos
- **Error handling**: manejo de estados nulos

## Uso

### Para Usuarios
1. **Registrarse/Iniciar sesión** en la aplicación
2. **Hacer clic** en el botón del perfil en la navbar
3. **Ver información** personal en el slidebar
4. **Editar perfil** o **cerrar sesión** según necesidad

### Para Desarrolladores
```typescript
// Importar el componente
import { Profile } from './pages/profile/profile';

// Usar en template
<app-profile></app-profile>

// Acceder a datos del usuario
this.authService.userProfile$.subscribe(profile => {
  console.log('Perfil actual:', profile);
});
```

## Variables CSS Personalizables

```css
:root {
  --slidebar-width: 400px;
  --primary-color: #007bff;
  --transition-speed: 0.3s;
  --slidebar-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
```

## Próximas Mejoras

- [ ] **Edición en línea**: formulario de edición integrado
- [ ] **Subida de avatar**: funcionalidad de cambio de imagen
- [ ] **Notificaciones**: sistema de notificaciones del usuario
- [ ] **Preferencias**: configuración de tema y notificaciones
- [ ] **Historial**: vista de eventos anteriores

## Testing

### Casos de Prueba
- [x] Apertura/cierre del slidebar
- [x] Carga de datos del usuario
- [x] Responsive en diferentes dispositivos
- [x] Integración con AuthService
- [x] Manejo de estados de carga
- [x] Accesibilidad (focus, keyboard navigation)

## Git Flow

### Rama Actual
- **Feature branch**: `feature/profile-slidebar`

### Próximos Pasos
1. **Merge a develop**: `git checkout develop && git merge feature/profile-slidebar`
2. **Crear PR a main**: Pull Request con revisión de código
3. **Testing**: pruebas en ambiente de staging
4. **Deploy**: despliegue a producción

## Dependencias

- **Angular**: Framework principal
- **RxJS**: Para observables y gestión de estado
- **CSS Variables**: Para personalización de estilos
- **SVG Icons**: Iconografía consistente

## Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, Tablet, Mobile
- **Angular**: Versión 17+
- **TypeScript**: Versión 5+ 