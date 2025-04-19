# DeckAR - Realidade Aumentada para Experiências Imersivas

<div align="center">
  <a href="https://ar-code.com/KQzUuGsRn" target="_blank">
    <img src="https://ar-code.com/KQzUuGsRn/ar" width="200px" alt="QR Code para Experiência AR" /><br>
    <button style="height: 40px; width: 78px; background-color: #007aff; color: white; padding: 0px 10px; border: none; border-radius: 10px; text-align: center; text-decoration: none; font-size: 20px; cursor: pointer; transition: background-color 0.3s ease; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); font-weight: 500; font-family: Arial;">Experimente AR</button>
  </a>
</div>

## 🌟 Sobre o Projeto

DeckAR é uma solução inovadora que utiliza a Realidade Aumentada (AR) para criar experiências imersivas e interativas, acessíveis através da leitura de QR codes.  Nossa plataforma permite a visualização de modelos 3D, conteúdo digital e animações diretamente no mundo real, transformando a forma como os usuários interagem com informações e entretenimento.  Focado inicialmente em **encantar e entreter crianças em festas temáticas**, DeckAR tem o potencial de ser expandido para diversas outras aplicações. [cite: 1, 2, 3, 10, 11, 12]

## ✨ Funcionalidades

* **Visualização de Modelos 3D em AR:** Traga personagens, objetos e cenários à vida em qualquer superfície. [cite: 3, 4, 5]
* **Geração de QR Codes Personalizados:** Crie links diretos para experiências AR específicas. [cite: 9]
* **Experiências Temáticas:** Ideal para festas, eventos e ativações com temas como Disney, super-heróis, mitologia e muito mais. [cite: 3]
* **Captura de Fotos e Vídeos:** Permita que os usuários capturem e compartilhem sua interação com a AR. [cite: 26, 28]
* **Interface Intuitiva e Responsiva:** Design otimizado para fácil uso em dispositivos móveis. [cite: 28]
* **Personalização de Conteúdo:** Adapte os modelos 3D e as experiências AR para atender a necessidades específicas. [cite: 10]

## 🛠️ Tecnologias Utilizadas

* **WebAR:** Realidade Aumentada via navegador, permitindo a experiência sem a necessidade de instalar um aplicativo. [cite: 4]
    * A-Frame + AR.js: Frameworks para criação de experiências WebAR. [cite: 4, 15]
* **Modelagem 3D:** Criação e otimização de modelos 3D para AR. [cite: 6]
    * glTF/glb: Formatos de arquivo para modelos 3D. [cite: 17]
* **JavaScript:** Linguagem de programação para interatividade e captura de mídia. [cite: 30]
* **HTML/CSS:** Estrutura e estilo da página web. [cite: 27]
* **QR Code Generation Libraries:** Geração de QR codes dinâmicos. [cite: 9]

## 📖 Como Usar

1.  **Escaneie o QR code:** Utilize a câmera do seu dispositivo móvel ou um aplicativo de leitura de QR codes para escanear o código.
2.  **Acesse a experiência AR:** O QR code abrirá a página web com a experiência de Realidade Aumentada. [cite: 27, 28]
3.  **Permita o acesso à câmera:** Conceda permissão para que a página utilize a câmera do seu dispositivo.
4.  **Aponte para uma superfície:** Direcione a câmera para uma superfície plana e bem iluminada.
5.  **Interaja:** Explore o modelo 3D, mova o dispositivo e utilize os botões de interação (foto, vídeo, se aplicável). [cite: 28]

## 📂 Estrutura do Projeto (MVP)

deck-ar/
├── index.html         # Página principal da experiência AR
├── assets/
│   └── personagem.glb   # Modelo 3D (placeholder) 
├── css/
│   └── style.css      # Estilos da página
├── js/
│   └── capture.js     # Script para captura de fotos/vídeos 
└── marker/
└── qrcode-marker.patt # Arquivo de padrão do marcador    


## 📐 Layout do Deck Físico

* **Tamanho:** Aproximadamente 10cm x 7cm (similar a um cartão de visita grande). [cite: 29]
* **Frente:**
    * Logo do DeckAR
    * QR Code (apontando para a URL da experiência AR) [cite: 29]
    * Ícone/texto instruindo o usuário a apontar a câmera. [cite: 30]
* **Verso (Opcional):**
    * Nome do Personagem
    * Nome do Tema (ex: "Festa Disney") [cite: 30]

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você tiver ideias para melhorar o DeckAR, encontrou algum bug ou deseja adicionar novas funcionalidades, siga estas etapas:

1.  **Fork o repositório.**
2.  **Crie um branch para sua feature (```git checkout -b feature/NomeDaFeature```).**
3.  **Faça commit das suas mudanças (```git commit -m 'Adiciona nova feature'```).**
4.  **Faça push para o branch (```git push origin feature/NomeDaFeature```).**
5.  **Abra um Pull Request.**

## 📄 Licença

Este projeto é licenciado sob a Licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

---

<div align="center">
  Desenvolvido com 💙 pela Equipe DeckAR
</div>