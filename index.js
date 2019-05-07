function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

'use strict'
if (hasGetUserMedia()) {
  const captureVideoButton = document.querySelector('.capture-button');
  const stopRecording = document.querySelector('#stoprecord-button');
  // const img = document.querySelector('img');
  const video = document.querySelector('video');
  // const canvas = document.querySelector('canvas');

  captureVideoButton.onclick = function () {
    navigator.mediaDevices.getUserMedia({
      video: true,
      // audio:true
    }).then(handleSuccess).catch(handleError)
  }
  stopRecording.onclick = function stop() {
    mediaRecorder.stop()
    // play()

  }

  function handleSuccess(stream) {
    // screenshotbutton.disabled = false;
    video.srcObject = stream
    let options = {
      mimeType: 'video/webm;codecs=vp9'
    };
    mediaRecorder = new MediaRecorder(stream, options)
    mediaRecorder.ondataavailable = handleDataAvaliable;
    mediaRecorder.start()
  }

  function handleDataAvaliable(event) {

    let recordedChunks = [];
    if (event.data.size >= 0) {
      recordedChunks.push(event.data);
    }
    play(recordedChunks)
  }

  function play(recordedChunks) {
    let superBuffer = new Blob(recordedChunks);
    let videoElment = document.querySelector('#recorded')
    videoElment.src = window.URL.createObjectURL(superBuffer);
  }

  function handleError(e) {
    console.log(e, "ERRROORRRRR")
  }

} else {
  alert("GetUserMedia is not supported by browser")
}