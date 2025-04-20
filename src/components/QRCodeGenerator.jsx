import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [file, setFile] = useState(null);
  const [qrUrl, setQrUrl] = useState('');
  const [downloadPath, setDownloadPath] = useState('');

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.name.endsWith('.glb')) {
      setFile(uploadedFile);
      
      // Simular o upload e geração de URL
      // Em produção, isso seria feito com uma API real
      const modelUrl = `https://${window.location.hostname}/models/${uploadedFile.name}`;
      setQrUrl(modelUrl);
    } else {
      alert('Por favor, selecione um arquivo .glb válido');
    }
  };

  const handleDownloadPath = (event) => {
    setDownloadPath(event.target.value);
  };

  const handleSaveQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode-${file.name}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="qr-generator">
      <h2>Gerador de QR Code para Modelos 3D</h2>
      
      <div className="upload-section">
        <input
          type="file"
          accept=".glb"
          onChange={handleFileUpload}
          className="file-input"
        />
      </div>

      {qrUrl && (
        <div className="qr-section">
          <QRCode value={qrUrl} size={256} />
          
          <div className="save-section">
            <input
              type="text"
              placeholder="Caminho para salvar"
              value={downloadPath}
              onChange={handleDownloadPath}
              className="path-input"
            />
            <button onClick={handleSaveQRCode} className="save-button">
              Salvar QR Code
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .qr-generator {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        .upload-section {
          margin: 20px 0;
        }

        .file-input {
          padding: 10px;
          border: 2px dashed #ccc;
          border-radius: 4px;
          width: 100%;
        }

        .qr-section {
          margin-top: 20px;
        }

        .save-section {
          margin-top: 20px;
        }

        .path-input {
          padding: 8px;
          margin-right: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 60%;
        }

        .save-button {
          padding: 8px 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .save-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default QRCodeGenerator;