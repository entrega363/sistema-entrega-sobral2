// Script para auto-sincronização (Node.js)
const fs = require('fs');
const { exec } = require('child_process');

console.log('🔄 Monitoramento automático iniciado...');

// Monitorar alterações no arquivo principal
fs.watchFile('delivery-app.html', (curr, prev) => {
    console.log('📝 Alteração detectada em delivery-app.html');
    
    // Executar sincronização
    exec('git add . && git commit -m "Auto-sync: delivery-app.html atualizado" && git push origin main', 
        (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Erro na sincronização:', error);
                return;
            }
            console.log('✅ Sincronizado com GitHub!');
            console.log('🌐 Site atualizado: https://entrega363.github.io/sistema-entrega-sobral/');
        }
    );
});

console.log('👀 Monitorando alterações... (Ctrl+C para parar)');