ShowTime 🎟️  
**Una plataforma web para centralizar y potenciar la vida estudiantil a través de eventos universitarios**

## 🌟 Descripción del Proyecto

**ShowTime** es una innovadora plataforma web desarrollada por estudiantes de la Universidad Peruana de Ciencias Aplicadas (UPC). Tiene como objetivo centralizar la gestión, difusión y participación en eventos académicos, culturales y recreativos dentro del entorno universitario. ShowTime permite a los usuarios explorar eventos según sus intereses, registrarse de forma intuitiva, y a los organizadores, gestionar sus actividades con herramientas específicas.

## 🧠 Motivación

En la actualidad, la información sobre eventos está dispersa en múltiples canales (redes sociales, correos, carteles), lo que reduce la asistencia y dificulta la organización. ShowTime nace para resolver este problema, facilitando una experiencia completa y fluida tanto para asistentes como organizadores.

## 👥 Equipo

- Fabrizio Bussalleu Salcedo
- Facundo Nicolás Maco Rebatta
- Valentina Étoile Montenegro López
- Mireya Nicole Sihuincha Schermuly
- Gabriel Aldo Zavala Arteaga

## 🧩 Funcionalidades Clave

- 📅 Explorar eventos por categoría, fecha e intereses
- 🎫 Reservar entradas con confirmación automática y QR
- 🛠️ Panel de gestión para organizadores
- 🔔 Notificaciones automáticas y recordatorios
- ✅ Verificación de eventos para mayor seguridad
- 💬 Comentarios, reseñas e interacción entre usuarios
- 📈 Métricas de asistencia para organizadores

## 🔍 Público Objetivo

- **Estudiantes universitarios**: Buscan eventos relevantes, participar activamente y compartir experiencias.
- **Organizadores estudiantiles**: Necesitan herramientas eficientes para crear, difundir y gestionar sus eventos.

## 🔨 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS, JavaScript (prototipado en Figma)
- **Gestión Ágil**: Trello, Lean UX
- **Prototipado y Diseño UI**: Figma, Miro
- **Documentación**: Canva, Google Docs, Notion

## 📈 Proceso de Desarrollo

### 🧭 Metodología: Lean UX
- Definición de Problem Statements, Hypothesis y Canvas
- User Personas, User Journey Mapping, Empathy Mapping
- Prototipos validados con usuarios reales

### 📝 Recolección de Requisitos
- Entrevistas a estudiantes y organizadores
- Identificación de necesidades, frustraciones y oportunidades
- Backlog priorizado con epics y user stories

### 🎨 Diseño
- Style Guidelines con enfoque juvenil y accesible
- Diagrama de flujos de usuario
- Validación iterativa con feedback real

## 📌 Enlaces Importantes

- [🎨 Prototipo en Figma](https://www.figma.com/proto/u4MYPFHKd8Li5P4DKTV5Uj/ShowTime)
- [🧠 User Personas y Empathy Map](https://www.canva.com/design/DAGlv6bFKIc/0FqnkaxgSnHbNtefU89Jpw/edit)
- [🗂️ Tablero Trello del Proyecto](https://trello.com/invite/b/68104b35b3955fff8dc72ac7/ATTI1e83ab0206b3d42eb9692eee6f9af04c887AD5A8/showtime)

## 🚀 Próximos Pasos

- Desarrollo del MVP funcional
- Integración con sistemas de QR y base de datos de eventos
- Validación en entorno real UPC
- Expansión a otras universidades

## 📄 Licencia

Este proyecto ha sido desarrollado como parte del curso **IHC y Programación Web (CC237)** en la Universidad Peruana de Ciencias Aplicadas.

## 🎉 Nueva Funcionalidad: Guardar Eventos

### Características Implementadas

#### 📋 Gestión Completa de Eventos
- **Crear Eventos**: Formulario completo con validaciones
- **Guardar Eventos**: Almacenamiento persistente en localStorage
- **Ver Eventos Guardados**: Interfaz moderna para gestionar eventos
- **Editar y Eliminar**: Funcionalidades CRUD completas
- **Filtros y Búsqueda**: Búsqueda por texto, categoría y estado

#### 🎨 Diseño Moderno y Responsivo
- Interfaz intuitiva y fácil de usar
- Diseño adaptativo para móviles y tablets
- Animaciones suaves y feedback visual
- Estadísticas en tiempo real

#### 🔧 Funcionalidades Técnicas
- **EventService**: Servicio centralizado para gestión de eventos
- **Validaciones**: Formularios con validación completa
- **Persistencia**: Almacenamiento local con localStorage
- **Rutas**: Navegación integrada en la aplicación

### 🚀 Cómo Usar

#### Crear un Evento
1. Navega a "Crear Evento" en el menú
2. Completa el formulario con la información del evento
3. Haz clic en "Crear Evento"
4. El evento se guardará automáticamente

#### Ver Eventos Guardados
1. Navega a "Eventos Guardados" en el menú
2. Visualiza todos tus eventos creados
3. Usa los filtros para encontrar eventos específicos
4. Edita o elimina eventos según necesites

#### Filtros Disponibles
- **Búsqueda por texto**: Busca en título, descripción, organizador, etc.
- **Filtro por categoría**: Tecnología, académicos, culturales, etc.
- **Filtro por estado**: Activo, inactivo, pendiente

### 📊 Estadísticas
La página de eventos guardados muestra:
- Total de eventos creados
- Eventos activos
- Total de asistentes
- Eventos próximos

### 🛠️ Tecnologías Utilizadas
- **Angular 17**: Framework principal
- **TypeScript**: Lenguaje de programación
- **CSS3**: Estilos modernos y responsivos
- **localStorage**: Persistencia de datos

### 📁 Estructura del Proyecto

```
src/app/
├── services/
│   └── event.service.ts          # Servicio para gestión de eventos
├── pages/
│   ├── events-create/            # Crear eventos
│   ├── events-saved/             # Ver eventos guardados
│   └── ...                       # Otras páginas
└── app.routes.ts                 # Configuración de rutas
```

### 🔄 Flujo de Trabajo Git

#### Branch Creado
- `feature/guardareventos`: Branch para la funcionalidad de guardar eventos

#### Commits Realizados
1. **feat**: Crear EventService para gestión centralizada de eventos
2. **feat**: Actualizar componente de crear eventos para usar EventService
3. **feat**: Crear página de eventos guardados con filtros y estadísticas
4. **feat**: Agregar rutas y navegación para nueva funcionalidad
5. **docs**: Actualizar README con nueva funcionalidad

### 🎯 Próximas Mejoras
- [ ] Integración con backend real
- [ ] Sistema de notificaciones
- [ ] Compartir eventos en redes sociales
- [ ] Calendario de eventos
- [ ] Sistema de comentarios y valoraciones

### 📝 Notas de Desarrollo
- La funcionalidad está completamente integrada con el diseño existente
- Se mantiene la consistencia visual con el resto de la aplicación
- Código limpio y bien documentado
- Pruebas manuales realizadas en diferentes dispositivos

---

**Desarrollado con ❤️ para la comunidad estudiantil**
