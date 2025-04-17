// Gerenciamento de rotas e modelos 3D
const characterModels = {
    'chaves': '../assets/personagens/chaves.glb',
    'quico': '../assets/personagens/quico.glb',
    'chiquinha': '../assets/personagens/chiquinha.glb',
    'default': '../assets/personagens/chaves.glb'
};

// Função para obter o personagem da URL
function getCharacterFromURL() {
    const path = window.location.pathname;
    const character = path.split('/p/')[1];
    return character || 'default';
}

// Função para carregar o modelo 3D
function loadCharacterModel() {
    const character = getCharacterFromURL();
    const modelPath = characterModels[character] || characterModels.default;
    
    const modelEntity = document.querySelector('a-entity[gltf-model]');
    if (modelEntity) {
        modelEntity.setAttribute('gltf-model', modelPath);
    }
}

// Carregar modelo quando a página carregar
window.addEventListener('load', loadCharacterModel);