# Estrutura do Projeto Deck-AR

```
deck-ar/
├── src/
│   ├── components/           # Componentes React reutilizáveis
│   │   ├── ar/              # Componentes relacionados à AR
│   │   ├── upload/          # Componentes de upload
│   │   └── ui/              # Componentes de interface
│   ├── services/            # Lógica de negócios
│   │   ├── fileManager.js   # Gerenciamento de arquivos
│   │   ├── qrGenerator.js   # Geração de QR codes
│   │   └── arService.js     # Serviços de AR
│   └── utils/               # Funções utilitárias
├── pages/                   # Rotas Next.js
│   ├── api/                 # API routes
│   ├── ar/                  # Páginas de visualização AR
│   └── admin/              # Páginas administrativas
├── public/                  # Arquivos estáticos
│   ├── models/             # Modelos 3D (.glb)
│   ├── markers/            # QR codes e marcadores
│   └── assets/            # Outros recursos
└── tests/                  # Testes unitários e E2E
```

## Organização do Código

1. **Components**: Componentes React isolados e reutilizáveis
   - `ar/`: Componentes específicos para realidade aumentada
   - `upload/`: Componentes para upload de arquivos
   - `ui/`: Componentes de interface do usuário

2. **Services**: Lógica de negócios e integrações
   - `fileManager.js`: Gerenciamento de uploads e arquivos
   - `qrGenerator.js`: Geração e manipulação de QR codes
   - `arService.js`: Configuração e controle de AR

3. **Pages**: Rotas e páginas da aplicação
   - `/api`: Endpoints da API
   - `/ar`: Páginas de visualização AR
   - `/admin`: Interface administrativa

4. **Public**: Arquivos estáticos
   - `models/`: Modelos 3D (.glb)
   - `markers/`: QR codes gerados
   - `assets/`: Recursos adicionais

Esta estrutura segue as melhores práticas de organização de código React/Next.js, separando claramente as responsabilidades e facilitando a manutenção.