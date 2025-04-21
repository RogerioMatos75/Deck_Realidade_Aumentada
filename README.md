# Projeto Deck de Realidade Aumentada

Este projeto utiliza Next.js para criar uma aplicação de realidade aumentada com upload de modelos 3D e geração de QR Codes, integrado com Supabase para armazenamento e Vercel para deploy.

## Estrutura do Projeto

```
Deck_Realidade_Aumentada/
├── public/
│   └── placeholder.png        # Imagem padrão para previews
│
├── pages/
│   ├── index.js               # Página principal com formulário e upload
│   ├── api/
│   │   ├── upload.js          # Gerencia uploads para o Supabase
│   │   ├── generate.js        # Gera QR Codes e URLs
│
├── components/
│   ├── UploadForm.js          # Componente do formulário
│   ├── QRPreview.js           # Componente de visualização do QR Code
│
├── styles/
│   └── globals.css
│
├── utils/
│   ├── supabase.js            # Cliente e funções do Supabase
│   ├── qrGenerator.js         # Geração de QR Code
│
├── .env.local                 # Variáveis de ambiente (não versionado)
├── next.config.js
├── package.json
└── README.md
```

## Configuração

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente no arquivo `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Deploy

1. Configure um novo projeto no Vercel
2. Configure as variáveis de ambiente no Vercel
3. Faça o deploy da aplicação

## Funcionalidades

- Upload de modelos 3D (.glb) diretamente para o Supabase Storage
- Geração automática de URLs públicas para os modelos
- Geração de QR Codes vinculados às URLs dos modelos
- Interface intuitiva para gerenciamento de modelos
- Deploy contínuo via Vercel

## Tecnologias

- Next.js - Framework React
- Supabase - Backend e Storage
- Vercel - Hosting e Deploy
- QR Code Generator - Geração de QR Codes