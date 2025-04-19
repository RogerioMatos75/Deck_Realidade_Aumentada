// Gerenciamento de captura de mídia
const btnFoto = document.getElementById('btnFoto');
const btnVideo = document.getElementById('btnVideo');

let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

// Função para capturar foto
async function capturePhoto() {
    const sceneEl = document.querySelector('a-scene');
    await sceneEl.components.screenshot.capture('perspective');
    const canvas = sceneEl.components.screenshot.getCanvas('perspective');
    const data = canvas.toDataURL('image/png');
    
    // Criar link para download
    const link = document.createElement('a');
    link.href = data;
    link.download = `ar-capture-${Date.now()}.png`;
    link.click();
}

// Função para iniciar/parar gravação de vídeo
async function toggleVideoRecording() {
    const stream = document.querySelector('a-scene').canvas.captureStream();
    
    if (!isRecording) {
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `ar-video-${Date.now()}.webm`;
            link.click();
            URL.revokeObjectURL(url);
        };
        
        mediaRecorder.start();
        isRecording = true;
        btnVideo.classList.add('recording');
        btnVideo.textContent = '⏹️ Parar Gravação';
    } else {
        mediaRecorder.stop();
        isRecording = false;
        btnVideo.classList.remove('recording');
        btnVideo.textContent = '🎥 Gravar Vídeo';
    }
}

// Event listeners
btnFoto.addEventListener('click', capturePhoto);
btnVideo.addEventListener('click', toggleVideoRecording);