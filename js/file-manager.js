// Gerenciador de arquivos para o Deck-AR
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

class FileManager {
    constructor() {
        this.assetsDir = path.join(__dirname, '../assets');
        this.markerDir = path.join(__dirname, '../marker');
        
        // Criar diretórios se não existirem
        this.ensureDirectories();
    }

    ensureDirectories() {
        if (!fs.existsSync(this.assetsDir)) {
            fs.mkdirSync(this.assetsDir, { recursive: true });
        }
        if (!fs.existsSync(this.markerDir)) {
            fs.mkdirSync(this.markerDir, { recursive: true });
        }
    }

    async uploadFile(file, characterName) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('personagem', characterName);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao fazer upload do arquivo');
            }

            const data = await response.json();
            return data.url; // retorna o path salvo
        } catch (error) {
            console.error('Erro no upload:', error);
            throw error;
        }
    }

    async generateQRCode(characterName) {
        const url = `https://deck-ar.vercel.app/p/${characterName}.html`;
        const qrPath = path.join(this.markerDir, `qr-${characterName}.png`);

        try {
            await QRCode.toFile(qrPath, url, {
                errorCorrectionLevel: 'H',
                margin: 1,
                width: 400,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });
            return qrPath;
        } catch (error) {
            console.error('Erro ao gerar QR code:', error);
            throw error;
        }
    }

    getAssetUrl(characterName) {
        return `https://deck-ar.vercel.app/assets/${characterName}.glb`;
    }
}

module.exports = FileManager;