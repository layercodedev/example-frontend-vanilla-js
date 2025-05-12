import { createAudioVisualization } from "./audioVisualization.js";
import { createConnectionStatusIndicator } from "./connectionStatusIndicator.js";
import { createMicrophoneButtonPushToTalk } from "./microphoneButtonPushToTalk.js";

// Creates and returns the main voice agent UI
export function createVoiceAgentPushToTalk({ amplitude = 0, status = "disconnected" } = {}) {
  const container = document.createElement("div");
  container.className = "w-96 h-96 border border-white rounded-lg flex flex-col gap-20 items-center justify-center";

  const title = document.createElement("h1");
  title.className = "text-gray-800 text-xl font-bold";
  title.textContent = "Voice Agent Demo";
  container.appendChild(title);

  // Audio visualization
  const audioVis = createAudioVisualization(amplitude, 75);
  container.appendChild(audioVis);

  // Controls
  const controls = document.createElement("div");
  controls.className = "flex flex-col gap-4 items-center justify-center";

  // Microphone button (push-to-talk mode)
  const micBtnPushToTalk = createMicrophoneButtonPushToTalk({
    triggerUserTurnStarted: () => {
      console.log("User turn started");
      window.layercode.triggerUserTurnStarted();
    },
    triggerUserTurnFinished: () => {
      console.log("User turn finished");
      window.layercode.triggerUserTurnFinished();
    },
  });
  controls.appendChild(micBtnPushToTalk);

  // Connection status
  const statusIndicator = createConnectionStatusIndicator(status);
  console.log(statusIndicator);
  controls.appendChild(statusIndicator.element);

  container.appendChild(controls);

  let currentAudioVis = audioVis;
  container.updateAmplitude = (amp) => {
    if (currentAudioVis && currentAudioVis.parentNode === container) {
      container.removeChild(currentAudioVis);
    }
    const newVis = createAudioVisualization(amp, 75);
    container.insertBefore(newVis, controls);
    currentAudioVis = newVis;
  };
  container.updateStatus = statusIndicator.updateStatus;

  return {
    element: container,
    updateStatus: statusIndicator.updateStatus,
    updateAmplitude: container.updateAmplitude,
  };
}
