// Gerenciamento de captura de mídia
const btnFoto = document.getElementById('btnFoto');
const btnVideo = document.getElementById('btnVideo');

let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

// Função para capturar foto
async function capturePhoto() {
    try {
        const sceneEl = document.querySelector('a-scene');
        if (!sceneEl) {
            alert('Erro: Cena AR não encontrada');
            return;
        }

        await sceneEl.components.screenshot.capture('perspective');
        const canvas = sceneEl.components.screenshot.getCanvas('perspective');
        const data = canvas.toDataURL('image/png');
        
        // Criar link para download
        const link = document.createElement('a');
        link.href = data;
        link.download = `ar-capture-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Erro ao capturar foto:', error);
        alert('Erro ao capturar foto. Por favor, tente novamente.');
    }
}

// Função para iniciar/parar gravação de vídeo
async function toggleVideoRecording() {
    try {
        const sceneEl = document.querySelector('a-scene');
        if (!sceneEl) {
            alert('Erro: Cena AR não encontrada');
            return;
        }

        const stream = sceneEl.canvas.captureStream();
        
        if (!isRecording) {
            recordedChunks = [];
            const options = {
                mimeType: 'video/webm;codecs=h264',
                videoBitsPerSecond: 2500000 // 2.5 Mbps
            };
            
            try {
                mediaRecorder = new MediaRecorder(stream, options);
            } catch (e) {
                console.warn('Codec H264 não suportado, tentando formato padrão');
                mediaRecorder = new MediaRecorder(stream);
            }
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };
            
            mediaRecorder.onstop = () => {
                try {
                    const blob = new Blob(recordedChunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `ar-video-${Date.now()}.webm`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                } catch (error) {
                    console.error('Erro ao salvar vídeo:', error);
                    alert('Erro ao salvar o vídeo. Por favor, tente novamente.');
                }
            };
        
            mediaRecorder.start();
            mediaRecorder.requestData(); // Solicita dados imediatamente

            isRecording = true;
            btnVideo.classList.add('recording');
            btnVideo.textContent = '⏹️ Parar Gravação';
        } else {
            mediaRecorder.stop();
            isRecording = false;
            btnVideo.classList.remove('recording');
            btnVideo.textContent = '🎥 Gravar Vídeo';
        }
    } catch (error) {
        console.error('Erro na gravação:', error);
        alert('Erro ao iniciar/parar a gravação. Por favor, tente novamente.');
        isRecording = false;
        btnVideo.classList.remove('recording');
        btnVideo.textContent = '🎥 Gravar Vídeo';
    }
}

// Event listeners
btnFoto.addEventListener('click', capturePhoto);
btnVideo.addEventListener('click', toggleVideoRecording);