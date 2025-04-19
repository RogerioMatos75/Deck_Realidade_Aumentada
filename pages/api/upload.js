// pages/api/upload.js

import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import QRCode from 'qrcode';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ multiples: false, uploadDir: '/tmp', keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Erro no upload.' });

    const { personagem, deck } = fields;
    const file = files.file;

    const deckDir = path.join(process.cwd(), 'public/assets', deck);
    const markerDir = path.join(process.cwd(), 'public/marker');

    // Cria diretórios se não existirem
    fs.mkdirSync(deckDir, { recursive: true });
    fs.mkdirSync(markerDir, { recursive: true });

    // Move o arquivo .glb para a pasta do personagem
    const finalPath = path.join(deckDir, `${personagem}.glb`);
    fs.renameSync(file.filepath, finalPath);

    // Gera a URL
    const url = `https://deck-ar.vercel.app/assets/${deck}/${personagem}.glb`;

    // Gera o QR Code e salva
    const qrPath = path.join(markerDir, `qr-${personagem}.png`);
    await QRCode.toFile(qrPath, url, {
      width: 400,
      margin: 1,
      errorCorrectionLevel: 'H',
    });

    res.status(200).json({ message: 'Upload e QR Code criados com sucesso!', qr: `/marker/qr-${personagem}.png`, url });
  });
}
