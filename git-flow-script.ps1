# Script para automatizar Git Flow - Sistema de Confirmación de Asistencia
# iShowTime Project - PowerShell Version

Write-Host "🚀 Iniciando Git Flow para Sistema de Confirmación de Asistencia" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green

# Verificar que estamos en la rama main
$current_branch = git branch --show-current
if ($current_branch -ne "main") {
    Write-Host "⚠️  Advertencia: No estás en la rama main. Actualmente en: $current_branch" -ForegroundColor Yellow
    $response = Read-Host "¿Continuar de todos modos? (y/N)"
    if ($response -notmatch "^[Yy]$") {
        Write-Host "❌ Operación cancelada" -ForegroundColor Red
        exit 1
    }
}

# Verificar que no hay cambios sin commitear
$status = git status --porcelain
if ($status) {
    Write-Host "❌ Hay cambios sin commitear. Por favor, haz commit de tus cambios primero." -ForegroundColor Red
    git status
    exit 1
}

Write-Host "✅ Verificaciones completadas" -ForegroundColor Green

# 1. Crear feature branch
Write-Host ""
Write-Host "📝 Creando feature branch..." -ForegroundColor Cyan
git checkout -b feature/confirmacion-asistencia
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Feature branch creado: feature/confirmacion-asistencia" -ForegroundColor Green
} else {
    Write-Host "❌ Error al crear feature branch" -ForegroundColor Red
    exit 1
}

# 2. Agregar todos los archivos
Write-Host ""
Write-Host "📁 Agregando archivos..." -ForegroundColor Cyan
git add .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Archivos agregados al staging area" -ForegroundColor Green
} else {
    Write-Host "❌ Error al agregar archivos" -ForegroundColor Red
    exit 1
}

# 3. Hacer commit
Write-Host ""
Write-Host "💾 Haciendo commit..." -ForegroundColor Cyan
$commitMessage = @"
feat: implementar sistema de confirmación de asistencia

- Agregar servicio EventosService para manejo de confirmaciones
- Actualizar componente eventos con botones de confirmación responsivos
- Implementar estilos CSS modernos con gradientes y animaciones
- Agregar estadísticas de confirmación en modal de detalles
- Integrar con backend con fallback local para localStorage
- Implementar mensajes de confirmación con animaciones
- Agregar validación de usuario autenticado
- Incluir documentación completa del sistema

Closes #123
"@

git commit -m $commitMessage
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit realizado exitosamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error al hacer commit" -ForegroundColor Red
    exit 1
}

# 4. Verificar si existe la rama develop
Write-Host ""
Write-Host "🔍 Verificando rama develop..." -ForegroundColor Cyan
$developExists = git show-ref --verify --quiet refs/heads/develop
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Rama develop existe" -ForegroundColor Green
} else {
    Write-Host "⚠️  Rama develop no existe. Creándola desde main..." -ForegroundColor Yellow
    git checkout main
    git checkout -b develop
    git push -u origin develop
    git checkout feature/confirmacion-asistencia
}

# 5. Merge a develop
Write-Host ""
Write-Host "🔄 Haciendo merge a develop..." -ForegroundColor Cyan
git checkout develop
if ($LASTEXITCODE -eq 0) {
    git merge feature/confirmacion-asistencia
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Merge a develop completado" -ForegroundColor Green
    } else {
        Write-Host "❌ Error en merge a develop" -ForegroundColor Red
        Write-Host "💡 Resuelve los conflictos manualmente y luego ejecuta:" -ForegroundColor Yellow
        Write-Host "   git add ." -ForegroundColor White
        Write-Host "   git commit -m 'resolve: conflictos en merge de confirmación de asistencia'" -ForegroundColor White
        exit 1
    }
} else {
    Write-Host "❌ Error al cambiar a develop" -ForegroundColor Red
    exit 1
}

# 6. Push a develop
Write-Host ""
Write-Host "📤 Haciendo push a develop..." -ForegroundColor Cyan
git push origin develop
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Push a develop completado" -ForegroundColor Green
} else {
    Write-Host "❌ Error al hacer push a develop" -ForegroundColor Red
    exit 1
}

# 7. Volver a main
Write-Host ""
Write-Host "🏠 Volviendo a main..." -ForegroundColor Cyan
git checkout main
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Cambio a main completado" -ForegroundColor Green
} else {
    Write-Host "❌ Error al cambiar a main" -ForegroundColor Red
    exit 1
}

# 8. Información final
Write-Host ""
Write-Host "🎉 ¡Git Flow completado exitosamente!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Resumen de acciones realizadas:" -ForegroundColor White
Write-Host "   ✅ Feature branch creado: feature/confirmacion-asistencia" -ForegroundColor Green
Write-Host "   ✅ Cambios commiteados con mensaje descriptivo" -ForegroundColor Green
Write-Host "   ✅ Merge realizado a develop" -ForegroundColor Green
Write-Host "   ✅ Push completado a develop" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor White
Write-Host "   1. Crear Pull Request desde develop a main" -ForegroundColor Yellow
Write-Host "   2. Solicitar review del equipo" -ForegroundColor Yellow
Write-Host "   3. Una vez aprobado, hacer merge a main" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 Comandos útiles:" -ForegroundColor White
Write-Host "   - Ver diferencias: git diff develop main" -ForegroundColor Cyan
Write-Host "   - Ver historial: git log --oneline -10" -ForegroundColor Cyan
Write-Host "   - Eliminar feature branch: git branch -d feature/confirmacion-asistencia" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ ¡El sistema de confirmación de asistencia está listo para review!" -ForegroundColor Green 