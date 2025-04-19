// Gerador de QR Codes para personagens
const QRCode = require('qrcode');
const fs = require('fs');

// Lista de personagens e suas URLs
const characters = [
    { name: 'chaves', url: 'https://deck-ar.vercel.app/p/chaves.html' },
    { name: 'quico', url: 'https://deck-ar.vercel.app/p/quico.html' },
    { name: 'chiquinha', url: 'https://deck-ar.vercel.app/p/chiquinha.html' }
];

// Função para gerar QR code para um personagem
async function generateQRCode(character) {
    try {
        const qrPath = `marker/qr-${character.name}.png`;
        await QRCode.toFile(qrPath, character.url, {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 400,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });
        console.log(`QR Code gerado para ${character.name}: ${qrPath}`);
    } catch (err) {
        console.error(`Erro ao gerar QR code para ${character.name}:`, err);
    }
}

// Gerar QR codes para todos os personagens
async function generateAllQRCodes() {
    for (const character of characters) {
        await generateQRCode(character);
    }
}

// Executar geração
generateAllQRCodes();