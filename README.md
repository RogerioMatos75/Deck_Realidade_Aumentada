# Projeto Deck de Realidade Aumentada

Este projeto utiliza Next.js para criar uma aplicação de realidade aumentada com upload de modelos 3D e geração de QR Codes.

## Estrutura do Projeto

```
Deck_Realidade_Aumentada/
├── public/
│   ├── assets/                # Onde os arquivos .glb e QR Codes serão armazenados
│   │   ├── TurmaDoChaves/
│   │   │   ├── chaves.glb
│   │   │   ├── qr-chaves.png
│   │   └── ...
│   └── placeholder.png        # Imagem padrão, se quiser
│
├── pages/
│   ├── index.js               # Página principal com formulário e upload
│   ├── api/
│   │   ├── upload.js          # Lida com uploads dos arquivos .glb
│   │   ├── generate.js        # Gera o QR Code e cria estrutura de pastas
│
├── components/
│   ├── UploadForm.js          # Componente do formulário
│   ├── QRPreview.js           # Componente de visualização do QR Code
│
├── styles/
│   └── globals.css
│
├── utils/
│   ├── fileManager.js         # Funções auxiliares para salvar arquivos e gerar URLs
│   ├── qrGenerator.js         # Geração de QR Code usando a lib `qrcode`
│
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

## Configuração

1. Instale as dependências com `npm install`.
2. Inicie o servidor de desenvolvimento com `npm run dev`.

## Funcionalidades

- Upload de modelos 3D no formato .glb.
- Geração de QR Codes para visualização dos modelos.
- Estrutura de pastas organizada para fácil manutenção.