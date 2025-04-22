# Projeto Deck de Realidade Aumentada

Este projeto utiliza Next.js para criar uma aplicação de realidade aumentada com upload de modelos 3D e geração de QR Codes, integrado com Supabase para armazenamento e Vercel para deploy.

## Estrutura do Projeto

```
Deck_Realidade_Aumentada/
├── deck-ar/                 # Frontend para visualização em AR
│   ├── public/              # Arquivos estáticos (imagens, modelos 3D, etc.)
│   ├── pages/               # Páginas da aplicação (Next.js)
│   ├── components/          # Componentes reutilizáveis
│   ├── styles/              # Arquivos de estilo (CSS, SCSS)
│   └── package.json         # Dependências e scripts do projeto
├── deck-admin/              # Backend/Admin para gerenciamento
│   ├── public/              # Arquivos estáticos
│   ├── pages/               # Páginas da aplicação (Next.js)
│   ├── components/          # Componentes reutilizáveis
│   ├── styles/              # Arquivos de estilo
│   ├── lib/                 # Bibliotecas e utilitários (ex: Supabase)
│   ├── services/            # Serviços (ex: upload de arquivos)
│   └── package.json         # Dependências e scripts do projeto
├── .gitignore               # Arquivos e pastas a serem ignorados pelo Git
└── README.md                # Documentação do projeto

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


## Entendendo o Projeto Deck-AR
O Deck-AR é uma aplicação que permite aos usuários visualizar modelos 3D em realidade aumentada. Ele foi desenvolvido utilizando tecnologias como Next.js, Supabase e Vercel. A aplicação possui duas partes principais: o Deck-AR (Visualizador) e o Deck-Admin (Painel Administrativo).

## Deck-AR (Visualizador)
- Função : Acionar a câmera e fazer a leitura de QR codes para exibir objetos 3D com marcadores
- Tecnologia : Utiliza A-Frame e AR.js para renderizar os modelos 3D em realidade aumentada
- Fluxo : O usuário escaneia um QR code com a câmera, que carrega o modelo 3D correspondente
## Deck-Admin (Painel Administrativo)
- Função : Interface administrativa para gerenciar os modelos 3D
- Recursos :
  - Formulário para input do nome do Deck e nome do arquivo
  - Upload de arquivos .glb (modelos 3D)
  - Geração de URL para o modelo
  - Geração de QR code vinculado à URL
  - Exibição do QR code na interface
  - Botão para salvar o QR code no diretório
- 
## Estrutura Atual do Projeto