const video = document.querySelector("#webcam-video");
const button = document.querySelector("button");
let stream; // Variável para armazenar a instância da stream

button.addEventListener("click", () => {
    video.style.display = "block";
    
    // Se já houver uma instância de stream, encerre-a
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }

    // Verifica se o navegador suporta a API de mídia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Solicita permissão para acessar a webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (newStream) {
                // Obtém a referência ao elemento de vídeo no HTML
                let videoElement = document.getElementById('webcam-video');
    
                // Define o srcObject do elemento de vídeo para o fluxo da nova webcam
                videoElement.srcObject = newStream;

                // Armazena a nova instância da stream
                stream = newStream;
    
                // Adiciona um manipulador de eventos para lidar com erros
                newStream.onended = function () {
                    console.log('Acesso à webcam encerrado');
                };
            })
            .catch(function (error) {
                console.log('Erro ao acessar a webcam: ', error);
            });
    } else {
        console.log('A API de mídia não é suportada neste navegador');
    }
});
