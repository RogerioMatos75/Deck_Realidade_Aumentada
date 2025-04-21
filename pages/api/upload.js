// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // necessário para o formidable funcionar
  },
};

const uploadDir = path.join(process.cwd(), 'public/models');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Garante que o diretório de upload exista
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = new formidable.IncomingForm({
      uploadDir,
      keepExtensions: true,
      multiples: false,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Erro no parse do form:', err);
        return res.status(500).json({ error: 'Erro ao processar upload' });
      }

      const file = files.file;
      const fileName = file.originalFilename;
      const newPath = path.join(uploadDir, fileName);

      fs.rename(file.filepath, newPath, (err) => {
        if (err) {
          console.error('Erro ao mover arquivo:', err);
          return res.status(500).json({ error: 'Erro ao salvar arquivo' });
        }

        const fileUrl = `/models/${fileName}`;
        return res.status(200).json({ success: true, url: fileUrl });
      });
    });
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
