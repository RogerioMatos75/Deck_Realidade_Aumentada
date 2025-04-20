import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [file, setFile] = useState(null);
  const [qrUrl, setQrUrl] = useState('');
  const [downloadPath, setDownloadPath] = useState('');
  const canvasRef = useRef(null);
  const qrRef = useRef(null);

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

  const generateMarker = (ctx, width, height) => {
    ctx.fillStyle = '#000000';
    
    // Gerar padrões aleatórios nos cantos
    const cornerSize = width * 0.2;
    
    // Canto superior esquerdo
    for(let i = 0; i < 5; i++) {
      const x = Math.random() * cornerSize;
      const y = Math.random() * cornerSize;
      const size = 10 + Math.random() * 20;
      ctx.fillRect(x, y, size, size);
    }
    
    // Canto superior direito
    for(let i = 0; i < 5; i++) {
      const x = width - (Math.random() * cornerSize) - 20;
      const y = Math.random() * cornerSize;
      const size = 10 + Math.random() * 20;
      ctx.fillRect(x, y, size, size);
    }
    
    // Canto inferior esquerdo
    for(let i = 0; i < 5; i++) {
      const x = Math.random() * cornerSize;
      const y = height - (Math.random() * cornerSize) - 20;
      const size = 10 + Math.random() * 20;
      ctx.fillRect(x, y, size, size);
    }
    
    // Canto inferior direito
    for(let i = 0; i < 5; i++) {
      const x = width - (Math.random() * cornerSize) - 20;
      const y = height - (Math.random() * cornerSize) - 20;
      const size = 10 + Math.random() * 20;
      ctx.fillRect(x, y, size, size);
    }
  };

  useEffect(() => {
    if (qrUrl && canvasRef.current && qrRef.current) {
      const canvas = canvasRef.current;
      const qrCanvas = qrRef.current.querySelector('canvas');
      
      if (qrCanvas) {
        const ctx = canvas.getContext('2d');
        const width = 400;
        const height = 400;
        
        canvas.width = width;
        canvas.height = height;
        
        // Limpar canvas
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        
        // Gerar marcadores
        generateMarker(ctx, width, height);
        
        // Desenhar QR code no centro
        const qrSize = 256;
        const x = (width - qrSize) / 2;
        const y = (height - qrSize) / 2;
        ctx.drawImage(qrCanvas, x, y);
      }
    }
  }, [qrUrl]);

  const handleSaveQRCode = () => {
    const canvas = canvasRef.current;
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
          <div ref={qrRef} style={{ display: 'none' }}>
            <QRCode value={qrUrl} size={256} />
          </div>
          <canvas
            ref={canvasRef}
            style={{ border: '1px solid #ccc', borderRadius: '4px' }}
          />
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