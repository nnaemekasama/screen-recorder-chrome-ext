document.addEventListener("DOMContentLoaded", () => {
  // GET THE SELECTORS OF THE BUTTONS
  const startVideoRecording = document.querySelector("button#start_video")
  const cameraToggle = document.querySelector("div#start_camera")
  const audioToggle = document.querySelector("div#start_audio")
  //   const stopVideoRecording = document.querySelector("button#stop_video")

  // adding event listeners

  let cameraEnabled = false
  let audioEnabled = false

  function updateCameraButtonStyle() {
    if (cameraEnabled) {
      cameraToggle.classList.add("toggled")
    } else {
      cameraToggle.classList.remove("toggled")
    }
  }

  function updateAudioButtonStyle() {
    if (audioEnabled) {
      audioToggle.classList.add("toggled")
    } else {
      audioToggle.classList.remove("toggled")
    }
  }

  startVideoRecording.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "request_recording" },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log(response)
          } else {
            console.log(chrome.runtime.lastError, "error line 14")
          }
        }
      )
    })
  })

  cameraToggle.addEventListener("click", () => {
    cameraEnabled = !cameraEnabled // Toggle the cameraEnabled state
    updateCameraButtonStyle() // Update the button style
  })
  audioToggle.addEventListener("click", () => {
    audioEnabled = !audioEnabled // Toggle the audioEnabled state
    updateAudioButtonStyle() // Update the button style
  })

  updateCameraButtonStyle()
  updateAudioButtonStyle()

  //   stopVideoRecording.addEventListener("click", () => {
  //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //       chrome.tabs.sendMessage(
  //         tabs[0].id,
  //         { action: "stopvideo" },
  //         function (response) {
  //           if (!chrome.runtime.lastError) {
  //             console.log(response)
  //           } else {
  //             console.log(chrome.runtime.lastError, "error line 27")
  //           }
  //         }
  //       )
  //     })
  //   })
})
