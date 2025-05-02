@echo off
title MoodMap Launcher
echo Iniciando backend Spring Boot...
start cmd /k "cd \"Fase 2\Evidencias Proyecto MoodMap\BackEndMoodMap\" && mvn spring-boot:run"

timeout /t 5

echo Iniciando frontend Expo (modo web)...
start cmd /k "cd \"Fase 2\Evidencias Proyecto MoodMap\FrontEndMoodMap\" && npm run web"

echo Todo se está ejecutando en ventanas separadas.
pause
