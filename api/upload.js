const express = require('express');
const multer = require('multer');
const FileManager = require('../js/file-manager');

const router = express.Router();
const fileManager = new FileManager();

// Configuração do multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'model/gltf-binary') {
            cb(null, true);
        } else {
            cb(new Error('Apenas arquivos .glb são permitidos'));
        }
    },
    limits: {
        fileSize: 50 * 1024 * 1024 // Limite de 50MB
    }
});

// Endpoint para upload de arquivo GLB
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado' });
        }

        const characterName = req.body.characterName;
        if (!characterName) {
            return res.status(400).json({ error: 'Nome do personagem não fornecido' });
        }

        // Salvar arquivo GLB
        const fileName = await fileManager.saveGLBFile(req.file.buffer, characterName);

        // Gerar QR code
        const qrPath = await fileManager.generateQRCode(characterName);

        // Retornar URLs
        res.json({
            success: true,
            glbUrl: fileManager.getAssetUrl(characterName),
            qrCodePath: qrPath
        });
    } catch (error) {
        console.error('Erro no processamento do upload:', error);
        res.status(500).json({ error: 'Erro ao processar o arquivo' });
    }
});

module.exports = router;