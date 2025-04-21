import QRCode from 'qrcode';

export class FileManager {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://deck-ar.vercel.app';
    this.assetsPath = '/public/models';
    this.markersPath = '/public/markers';
  }

  async uploadGLB(file, characterName) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('characterName', characterName);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao fazer upload do arquivo');
      }

      const data = await response.json();
      await this.generateQRCode(characterName);
      return data;
    } catch (error) {
      console.error('Erro no upload:', error);
      throw error;
    }
  }

  async generateQRCode(characterName) {
    const url = this.getCharacterUrl(characterName);
    const qrOptions = {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 400,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    };

    try {
      const qrDataUrl = await QRCode.toDataURL(url, qrOptions);
      return qrDataUrl;
    } catch (error) {
      console.error('Erro ao gerar QR code:', error);
      throw error;
    }
  }

  getModelUrl(characterName) {
    return `${this.baseUrl}${this.assetsPath}/${characterName}.glb`;
  }

  getMarkerUrl(characterName) {
    return `${this.baseUrl}${this.markersPath}/${characterName}.png`;
  }

  getCharacterUrl(characterName) {
    return `${this.baseUrl}/ar/${characterName}`;
  }
}