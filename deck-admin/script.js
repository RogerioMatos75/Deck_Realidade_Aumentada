const qrCodeContainer = document.getElementById('qrGrid');
const characterForm = document.getElementById('qrForm');
const fileManager = new FileManager();

document.getElementById('qrForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const deck = document.getElementById('deckName').value.trim().replace(/\s+/g, '-').toLowerCase();
    const character = document.getElementById('characterName').value.trim().replace(/\s+/g, '-').toLowerCase();
    const fileInput = document.getElementById('glbUpload');

    if (!fileInput.files.length) {
        alert('Por favor, selecione um arquivo .glb');
        return;
    }

    formData.append('file', fileInput.files[0]);
    formData.append('characterName', character);
    formData.append('deckName', deck);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao fazer upload');
        }

        // Gerar QR Code na interface
        const qrContainer = document.getElementById('qrcode');
        qrContainer.innerHTML = '';
        await QRCode.toCanvas(qrContainer, data.glbUrl, {
            width: 300,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });

        // Configurar link de download
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = data.qrCodePath;
        downloadLink.style.display = 'block';

        alert('QR Code gerado com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao processar o arquivo: ' + error.message);
    }
});

// Carregar QR codes existentes ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    // Implementar carregamento de QR codes existentes se necessário
});