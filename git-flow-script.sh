#!/bin/bash

# Script para automatizar Git Flow - Sistema de Confirmación de Asistencia
# iShowTime Project

echo "🚀 Iniciando Git Flow para Sistema de Confirmación de Asistencia"
echo "================================================================"

# Verificar que estamos en la rama main
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  Advertencia: No estás en la rama main. Actualmente en: $current_branch"
    read -p "¿Continuar de todos modos? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Operación cancelada"
        exit 1
    fi
fi

# Verificar que no hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Hay cambios sin commitear. Por favor, haz commit de tus cambios primero."
    git status
    exit 1
fi

echo "✅ Verificaciones completadas"

# 1. Crear feature branch
echo ""
echo "📝 Creando feature branch..."
git checkout -b feature/confirmacion-asistencia
if [ $? -eq 0 ]; then
    echo "✅ Feature branch creado: feature/confirmacion-asistencia"
else
    echo "❌ Error al crear feature branch"
    exit 1
fi

# 2. Agregar todos los archivos
echo ""
echo "📁 Agregando archivos..."
git add .
if [ $? -eq 0 ]; then
    echo "✅ Archivos agregados al staging area"
else
    echo "❌ Error al agregar archivos"
    exit 1
fi

# 3. Hacer commit
echo ""
echo "💾 Haciendo commit..."
git commit -m "feat: implementar sistema de confirmación de asistencia

- Agregar servicio EventosService para manejo de confirmaciones
- Actualizar componente eventos con botones de confirmación responsivos
- Implementar estilos CSS modernos con gradientes y animaciones
- Agregar estadísticas de confirmación en modal de detalles
- Integrar con backend con fallback local para localStorage
- Implementar mensajes de confirmación con animaciones
- Agregar validación de usuario autenticado
- Incluir documentación completa del sistema

Closes #123"
if [ $? -eq 0 ]; then
    echo "✅ Commit realizado exitosamente"
else
    echo "❌ Error al hacer commit"
    exit 1
fi

# 4. Verificar si existe la rama develop
echo ""
echo "🔍 Verificando rama develop..."
if git show-ref --verify --quiet refs/heads/develop; then
    echo "✅ Rama develop existe"
else
    echo "⚠️  Rama develop no existe. Creándola desde main..."
    git checkout main
    git checkout -b develop
    git push -u origin develop
    git checkout feature/confirmacion-asistencia
fi

# 5. Merge a develop
echo ""
echo "🔄 Haciendo merge a develop..."
git checkout develop
if [ $? -eq 0 ]; then
    git merge feature/confirmacion-asistencia
    if [ $? -eq 0 ]; then
        echo "✅ Merge a develop completado"
    else
        echo "❌ Error en merge a develop"
        echo "💡 Resuelve los conflictos manualmente y luego ejecuta:"
        echo "   git add ."
        echo "   git commit -m 'resolve: conflictos en merge de confirmación de asistencia'"
        exit 1
    fi
else
    echo "❌ Error al cambiar a develop"
    exit 1
fi

# 6. Push a develop
echo ""
echo "📤 Haciendo push a develop..."
git push origin develop
if [ $? -eq 0 ]; then
    echo "✅ Push a develop completado"
else
    echo "❌ Error al hacer push a develop"
    exit 1
fi

# 7. Volver a main
echo ""
echo "🏠 Volviendo a main..."
git checkout main
if [ $? -eq 0 ]; then
    echo "✅ Cambio a main completado"
else
    echo "❌ Error al cambiar a main"
    exit 1
fi

# 8. Información final
echo ""
echo "🎉 ¡Git Flow completado exitosamente!"
echo "======================================"
echo ""
echo "📋 Resumen de acciones realizadas:"
echo "   ✅ Feature branch creado: feature/confirmacion-asistencia"
echo "   ✅ Cambios commiteados con mensaje descriptivo"
echo "   ✅ Merge realizado a develop"
echo "   ✅ Push completado a develop"
echo ""
echo "📝 Próximos pasos:"
echo "   1. Crear Pull Request desde develop a main"
echo "   2. Solicitar review del equipo"
echo "   3. Una vez aprobado, hacer merge a main"
echo ""
echo "🔗 Comandos útiles:"
echo "   - Ver diferencias: git diff develop main"
echo "   - Ver historial: git log --oneline -10"
echo "   - Eliminar feature branch: git branch -d feature/confirmacion-asistencia"
echo ""
echo "✨ ¡El sistema de confirmación de asistencia está listo para review!" 