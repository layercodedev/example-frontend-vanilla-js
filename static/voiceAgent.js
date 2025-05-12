import { createAudioVisualization } from "./audioVisualization.js";
import { createConnectionStatusIndicator } from "./connectionStatusIndicator.js";
import { createMicrophoneIcon } from "./microphoneIcon.js";

// Creates and returns the main voice agent UI
export function createVoiceAgent({ amplitude = 0, status = "disconnected" } = {}) {
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

  // Microphone button (automatic mode)
  const micBtn = document.createElement("div");
  micBtn.className = "h-12 px-4 rounded-full flex items-center gap-2 justify-center select-none bg-[#FF5B41]";
  micBtn.appendChild(createMicrophoneIcon());
  controls.appendChild(micBtn);

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
