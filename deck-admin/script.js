// Importar a biblioteca QRCode
const qrCodeContainer = document.getElementById('qrGrid');
const characterForm = document.getElementById('characterForm');

// Função para gerar QR code
async function generateQRCode(character) {
    try {
        // Criar elemento para o QR code
        const qrItem = document.createElement('div');
        qrItem.className = 'qr-item';

        // Gerar QR code usando a biblioteca qrcode.js
        const qrCanvas = document.createElement('canvas');
        await QRCode.toCanvas(qrCanvas, character.url, {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 200,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });

        // Adicionar QR code à interface
        qrItem.appendChild(qrCanvas);

        // Adicionar nome do personagem
        const characterName = document.createElement('p');
        characterName.textContent = character.name;
        qrItem.appendChild(characterName);

        // Botão de download
        const downloadBtn = document.createElement('a');
        downloadBtn.className = 'download-btn';
        downloadBtn.textContent = 'Download QR Code';
        downloadBtn.href = qrCanvas.toDataURL('image/png');
        downloadBtn.download = `qr-${character.name}.png`;
        qrItem.appendChild(downloadBtn);

        // Adicionar à grid
        qrCodeContainer.appendChild(qrItem);

        return true;
    } catch (err) {
        console.error(`Erro ao gerar QR code para ${character.name}:`, err);
        return false;
    }
}

// Manipular envio do formulário
characterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const characterData = {
        name: document.getElementById('characterName').value,
        url: document.getElementById('characterUrl').value,
        model: document.getElementById('modelFile').files[0]
    };

    if (await generateQRCode(characterData)) {
        // Limpar formulário após sucesso
        characterForm.reset();
    } else {
        alert('Erro ao gerar QR Code. Por favor, tente novamente.');
    }
});

// Carregar QR codes existentes ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    // Aqui você pode carregar QR codes existentes se necessário
});