document.addEventListener('DOMContentLoaded', () => {
    const fileManager = new FileManager();
    const qrForm = document.getElementById('qrForm');
    const qrCodeContainer = document.getElementById('qrGrid');

    qrForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const deckName = document.getElementById('deckName').value.trim();
        const characterName = document.getElementById('characterName').value.trim();
        const fileInput = document.getElementById('modelFile');

        if (!fileInput.files.length) {
            alert('Por favor, selecione um arquivo .glb');
            return;
        }

        const file = fileInput.files[0];
        if (!file.name.toLowerCase().endsWith('.glb')) {
            alert('Por favor, selecione um arquivo .glb válido');
            return;
        }

        try {
            // Upload do arquivo GLB para a pasta models
            const formData = new FormData();
            formData.append('file', file);
            formData.append('deckName', deckName.replace(/\s+/g, '-').toLowerCase());
            formData.append('characterName', characterName.replace(/\s+/g, '-').toLowerCase());

            const uploadResult = await fileManager.uploadGLB(file, deckName, characterName);
            if (!uploadResult.success) {
                throw new Error('Erro ao fazer upload do arquivo');
            }

            // Gerar QR Code com a URL do modelo
            const qrCodeDataUrl = await fileManager.generateQRCode(uploadResult.glbUrl);

            // Criar elemento para o QR Code
            const qrDiv = document.createElement('div');
            qrDiv.className = 'qr-item';
            
            // Gerar QR Code
            const qrCanvas = document.createElement('canvas');
            await QRCode.toCanvas(qrCanvas, uploadResult.glbUrl, {
                width: 200,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });

            // Salvar QR Code como imagem
            const qrImageUrl = qrCanvas.toDataURL('image/png');

            // Adicionar informações do personagem
            const infoDiv = document.createElement('div');
            infoDiv.className = 'qr-info';
            infoDiv.innerHTML = `
                <p>Deck: ${deckName}</p>
                <p>Personagem: ${characterName}</p>
            `;

            // Botão de download
            const downloadBtn = document.createElement('a');
            downloadBtn.href = qrCanvas.toDataURL('image/png');
            downloadBtn.download = `qr-${characterName.toLowerCase()}.png`;
            downloadBtn.className = 'download-btn';
            downloadBtn.textContent = 'Baixar QR Code';

            // Montar o elemento completo
            qrDiv.appendChild(qrCanvas);
            qrDiv.appendChild(infoDiv);
            qrDiv.appendChild(downloadBtn);
            qrCodeContainer.appendChild(qrDiv);

            // Limpar o formulário
            qrForm.reset();

            alert('QR Code gerado com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
            alert(error.message);
        }
    });
});