class FileManager {
    constructor() {
        this.baseAssetsPath = '/assets';
        this.baseMarkerPath = '/marker';
    }

    async uploadGLB(file, deckName, characterName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('deckName', deckName);
            formData.append('characterName', characterName);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao fazer upload do arquivo');
            }

            return await response.json();
        } catch (error) {
            console.error('Erro no upload:', error);
            throw error;
        }
    }

    async generateQRCode(glbUrl) {
        try {
            const qrContainer = document.getElementById('qrcode');
            qrContainer.innerHTML = '';
            
            await QRCode.toCanvas(qrContainer, glbUrl, {
                width: 300,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });

            return qrContainer.toDataURL();
        } catch (error) {
            console.error('Erro na geração do QR Code:', error);
            throw error;
        }
    }

    getGlbUrl(deckName, characterName) {
        return `${this.baseAssetsPath}/${deckName}/${characterName}.glb`;
    }

    getQrCodePath(deckName, characterName) {
        return `${this.baseMarkerPath}/${deckName}/${characterName}.png`;
    }
}