import React, { useState } from 'react';
import { FileManager } from '../../services/fileManager';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [characterName, setCharacterName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fileManager = new FileManager();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.glb')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Por favor, selecione um arquivo .glb válido');
      setFile(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !characterName) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fileManager.uploadGLB(file, characterName);
      setSuccess(true);
      // Limpar formulário
      setFile(null);
      setCharacterName('');
      event.target.reset();
    } catch (err) {
      setError('Erro ao fazer upload do arquivo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-uploader">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="characterName">Nome do Personagem:</label>
          <input
            type="text"
            id="characterName"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Ex: Chaves"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="glbFile">Arquivo GLB:</label>
          <input
            type="file"
            id="glbFile"
            accept=".glb"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Arquivo'}
        </button>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            Arquivo enviado com sucesso!
          </div>
        )}
      </form>

      <style jsx>{`
        .file-uploader {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input[type="text"],
        input[type="file"] {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        button {
          background-color: #0070f3;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:disabled {
          background-color: #ccc;
        }

        .error-message {
          color: red;
          margin-top: 10px;
        }

        .success-message {
          color: green;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default FileUploader;