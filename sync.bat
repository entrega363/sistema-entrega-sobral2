@echo off
echo 🔄 Sincronizando com GitHub: entrega363/sistema-entrega-sobral

REM Verificar se git está configurado
git remote -v | findstr "entrega363/sistema-entrega-sobral" >nul
if %errorlevel% neq 0 (
    echo ⚙️ Configurando repositório...
    git remote add origin https://github.com/entrega363/sistema-entrega-sobral.git
)

REM Adicionar todas as alterações
git add .

REM Verificar se há alterações
git diff --cached --quiet
if %errorlevel% neq 0 (
    REM Fazer commit com timestamp
    for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
    set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
    set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
    set "timestamp=%DD%/%MM%/%YYYY% %HH%:%Min%:%Sec%"
    
    git commit -m "Atualização do Kiro - %timestamp%"
    
    REM Enviar para GitHub
    git push origin main
    
    echo ✅ Sincronização concluída!
    echo 🌐 Site: https://entrega363.github.io/sistema-entrega-sobral/
    echo 📁 Repo: https://github.com/entrega363/sistema-entrega-sobral
) else (
    echo ℹ️ Nenhuma alteração detectada.
)

pause