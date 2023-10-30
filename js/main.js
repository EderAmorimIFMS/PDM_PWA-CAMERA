//registrando a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! 😎', reg);
      postNews()
    } catch (err) {
      console.log('😥 Service worker registro falhou: ', err);
    }
  });
}

// configurando as constraintes do video stream 
var constraints = { video: { facingMode: "user" }, audio: false };

//capturando os elementos em tela
const cameraView = document.querySelector("#camera--view"),
  cameraoutput = document.querySelector("#camera-output"),
  cameraSensor = document.querySelector("#camera--sensor"),
  cameraTrigger = document.querySelector("#camera--trigger")

//Estabelecendo o acesso a camera inicializando a visualização
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then( function (stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch( function (error) { 
      console.error("Ocorreu um Erro.", error);
    });
}

// Função para tirar foto
cameraTrigger.onclick = function () {
  cameraSensor.width = cameraView.videoWidth; 
  cameraSensor.height = cameraView.videoHeight; 
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0)
    cameraoutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");  
}

// carrega isagem de camera quando a Janela carregar 
window.addEventListener("load", cameraStart, false);