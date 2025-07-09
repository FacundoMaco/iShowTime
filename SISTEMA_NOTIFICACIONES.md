# 🔔 Sistema de Notificaciones Automáticas de Eventos Próximos

## 📋 **Descripción General**

El sistema de notificaciones automáticas permite a los usuarios recibir alertas sobre eventos próximos de forma automática y en tiempo real. El sistema incluye:

- **Notificaciones automáticas** basadas en proximidad temporal
- **Panel de notificaciones** con interfaz intuitiva
- **Notificaciones del navegador** (push notifications)
- **Monitoreo automático** de eventos próximos
- **Gestión de estado** de notificaciones (leídas/no leídas)

## 🏗️ **Arquitectura del Sistema**

### **Componentes Principales**

1. **`NotificacionesService`** - Servicio principal para gestión de notificaciones
2. **`NotificacionesComponent`** - Componente UI para mostrar notificaciones
3. **Integración con `UserService`** - Para obtener datos del usuario actual

### **Flujo de Datos**

```
Eventos Próximos → NotificacionesService → NotificacionesComponent → UI
     ↓
Backend API ←→ localStorage (fallback)
```

## 🔧 **Funcionalidades Implementadas**

### **1. Tipos de Notificaciones**

- **🚨 Urgente**: Eventos en menos de 30 minutos
- **📅 Hoy**: Eventos en las próximas 24 horas
- **⏰ Próximo**: Eventos en la próxima semana

### **2. Monitoreo Automático**

- **Verificación cada 2 minutos** de eventos próximos
- **Detección automática** de eventos que requieren notificación
- **Prevención de duplicados** de notificaciones

### **3. Gestión de Estado**

- **Marcar como leída** notificaciones individuales
- **Marcar todas como leídas** (acción masiva)
- **Eliminar notificaciones** no deseadas
- **Contador de no leídas** en tiempo real

### **4. Notificaciones del Navegador**

- **Solicitud de permisos** automática
- **Notificaciones push** para eventos críticos
- **Fallback a notificaciones en pantalla**

## 📱 **Interfaz de Usuario**

### **Botón de Notificaciones**

```html
<button class="btn-notificaciones">
  <span class="icono-notificacion">🔔</span>
  <span class="contador-notificaciones">3</span>
</button>
```

**Características:**
- **Contador visual** de notificaciones no leídas
- **Animación de pulso** cuando hay notificaciones
- **Responsive design** para móviles

### **Panel de Notificaciones**

```html
<div class="panel-notificaciones">
  <!-- Header con controles -->
  <!-- Lista de notificaciones -->
  <!-- Acciones masivas -->
</div>
```

**Características:**
- **Panel deslizable** desde la esquina superior derecha
- **Scroll infinito** para muchas notificaciones
- **Estados de carga y error**
- **Acciones individuales y masivas**

## 🎨 **Estilos y Diseño**

### **Colores por Tipo**

- **Urgente**: `#dc3545` (rojo)
- **Hoy**: `#ffc107` (amarillo)
- **Próximo**: `#17a2b8` (azul)

### **Animaciones**

- **Slide Down**: Apertura del panel
- **Pulse**: Botón con notificaciones
- **Spin**: Auto-refresh activo
- **Slide In/Out**: Notificaciones toast

### **Responsive Design**

```css
/* Desktop */
.panel-notificaciones {
  width: 350px;
  max-height: 500px;
}

/* Mobile */
@media (max-width: 768px) {
  .panel-notificaciones {
    width: 100vw;
    height: 100vh;
  }
}
```

## 🔌 **Integración con Backend**

### **Endpoints Requeridos**

```typescript
// Obtener notificaciones del usuario
GET /api/notificaciones/usuario/{userId}

// Obtener eventos próximos
GET /api/notificaciones/usuario/{userId}/eventos-proximos

// Marcar como leída
PUT /api/notificaciones/notificacion/{id}/leer

// Marcar todas como leídas
PUT /api/notificaciones/usuario/{userId}/marcar-todas-leidas

// Eliminar notificación
DELETE /api/notificaciones/notificacion/{id}
```

### **Estructura de Datos**

```typescript
interface NotificacionEvento {
  id: number;
  eventoId: number;
  titulo: string;
  fecha: string;
  lugar: string;
  tiempoRestante: string;
  tipo: 'proximo' | 'hoy' | 'urgente';
  leida: boolean;
  fechaCreacion: string;
}

interface EventoProximo {
  id: number;
  titulo: string;
  fecha: string;
  lugar: string;
  descripcion: string;
  confirmado: boolean;
  tiempoRestante: {
    dias: number;
    horas: number;
    minutos: number;
  };
}
```

## 🚀 **Configuración y Uso**

### **1. Importar Componente**

```typescript
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';

@Component({
  imports: [NotificacionesComponent],
  // ...
})
```

### **2. Agregar al Template**

```html
<app-notificaciones></app-notificaciones>
```

### **3. Configurar Servicio**

```typescript
// El servicio se auto-inicializa
// No requiere configuración adicional
```

## 🔄 **Monitoreo Automático**

### **Configuración de Intervalos**

- **Verificación de eventos**: Cada 2 minutos
- **Limpieza de notificaciones**: Cada 30 días
- **Actualización de contadores**: En tiempo real

### **Lógica de Detección**

```typescript
private determinarTipoNotificacion(tiempo: TiempoRestante): TipoNotificacion {
  if (tiempo.minutos <= 30) return 'urgente';
  if (tiempo.dias === 0) return 'hoy';
  if (tiempo.dias <= 7) return 'proximo';
  return null; // No requiere notificación
}
```

## 📊 **Métricas y Estadísticas**

### **Datos Recopilados**

- **Número de notificaciones** por tipo
- **Tasa de lectura** de notificaciones
- **Tiempo de respuesta** del usuario
- **Preferencias de notificación**

### **Optimizaciones**

- **Cache local** para reducir llamadas al backend
- **Lazy loading** de notificaciones antiguas
- **Compresión de datos** para mejor rendimiento

## 🛠️ **Mantenimiento**

### **Limpieza Automática**

```typescript
// Limpiar notificaciones antiguas (30+ días)
limpiarNotificacionesAntiguas(): void {
  const treintaDiasAtras = new Date();
  treintaDiasAtras.setDate(treintaDiasAtras.getDate() - 30);
  
  this.notificacionesCache = this.notificacionesCache.filter(
    n => new Date(n.fechaCreacion) > treintaDiasAtras
  );
}
```

### **Logs y Debugging**

- **Console logs** para desarrollo
- **Error handling** robusto
- **Fallback mechanisms** para offline

## 🔒 **Seguridad y Privacidad**

### **Consideraciones**

- **Permisos explícitos** para notificaciones del navegador
- **Datos locales** para notificaciones sensibles
- **Encriptación** de datos en tránsito
- **GDPR compliance** para datos de usuario

## 🚀 **Futuras Mejoras**

### **Roadmap**

1. **Notificaciones push** con Firebase
2. **Personalización** de horarios de notificación
3. **Filtros avanzados** por tipo de evento
4. **Integración con calendario** externo
5. **Notificaciones por email/SMS**
6. **Analytics avanzados** de engagement

### **Optimizaciones Técnicas**

- **Service Workers** para notificaciones offline
- **WebSockets** para actualizaciones en tiempo real
- **IndexedDB** para cache persistente
- **PWA features** para mejor experiencia móvil

---

## 📝 **Notas de Implementación**

- ✅ **Completado**: Sistema básico de notificaciones
- ✅ **Completado**: UI responsiva y accesible
- ✅ **Completado**: Integración con servicios existentes
- ✅ **Completado**: Fallback para modo offline
- 🔄 **En progreso**: Optimizaciones de rendimiento
- 📋 **Pendiente**: Analytics y métricas avanzadas

**Fecha de implementación**: Diciembre 2024  
**Versión**: 1.0.0  
**Estado**: ✅ **Completado y funcional** 