@echo off
setlocal
cd /d "%~dp0"

echo ===============================================
echo   PUBBLICAZIONE GAMA LAUNCHER SU GITHUB PAGES
echo ===============================================
echo.

if not exist ".git" (
    echo Inizializzo repository Git...
    git init
    git remote add origin https://github.com/ServiziDc/Gama-Laucher.git
)

git add -A
git commit -m "Aggiornamento launcher %date% %time%"
git branch -M main
git push --force origin main

echo.
echo ===============================================
echo   PUBBLICAZIONE COMPLETATA
echo   URL: https://servizidc.github.io/Gama-Laucher/
echo ===============================================
pause
