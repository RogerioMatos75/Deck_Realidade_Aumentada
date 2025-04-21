import { supabase } from '../utils/supabase'
import QRCode from 'qrcode'

export class FileManager {
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    this.bucketName = 'models'
  }

  async uploadGLB(file, characterName) {
    try {
      // Upload do arquivo para o Supabase Storage
      const { data: fileData, error: fileError } = await supabase.storage
        .from(this.bucketName)
        .upload(`models/${characterName}.glb`, file)

      if (fileError) throw fileError

      // Gerar URL pública do modelo
      const { data: fileUrl } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(`models/${characterName}.glb`)

      // Gerar QR Code
      const qrCode = await this.generateQRCode(characterName)

      // Salvar informações no banco de dados
      const { data: modelData, error: dbError } = await supabase
        .from('models')
        .insert([
          {
            name: characterName,
            file_url: fileUrl.publicUrl,
            qr_code_url: qrCode.url
          }
        ])
        .select()

      if (dbError) throw dbError

      return {
        modelUrl: fileUrl.publicUrl,
        qrCode: qrCode.dataUrl,
        modelData: modelData[0]
      }
    } catch (error) {
      console.error('Erro no upload:', error)
      throw error
    }
  }

  async generateQRCode(characterName) {
    const url = this.getCharacterUrl(characterName)
    const qrOptions = {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 400,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }

    try {
      const qrDataUrl = await QRCode.toDataURL(url, qrOptions)
      
      // Salvar QR Code no Supabase Storage
      const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64')
      const { data: qrData, error: qrError } = await supabase.storage
        .from(this.bucketName)
        .upload(`markers/${characterName}.png`, qrBuffer)

      if (qrError) throw qrError

      // Gerar URL pública do QR Code
      const { data: qrUrl } = supabase.storage
        .from(this.bucketName)
        .getPublicUrl(`markers/${characterName}.png`)

      return {
        dataUrl: qrDataUrl,
        url: qrUrl.publicUrl
      }
    } catch (error) {
      console.error('Erro ao gerar QR code:', error)
      throw error
    }
  }

  getCharacterUrl(characterName) {
    return `${this.baseUrl}/ar/${characterName}`
  }
}