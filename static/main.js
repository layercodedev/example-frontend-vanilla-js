import { createVoiceAgent } from "./voiceAgent.js";

let amplitude = 0;
let status = "disconnected";

let agentUI = createVoiceAgent({ amplitude, status });
const root = document.getElementById("root");
root.appendChild(agentUI.element);

// Dynamically import LayercodeClient from CDN
import("https://cdn.jsdelivr.net/npm/@layercode/js-sdk@1.0.14/dist/layercode-js-sdk.esm.js").then(
  ({ default: LayercodeClient }) => {
    window.layercode = new LayercodeClient({
      pipelineId: "your-pipeline-id", // TODO: set your pipeline ID
      authorizeSessionEndpoint: "/authorize", // TODO: set your endpoint
      onConnect: ({ sessionId }) => {
        console.log("connected", sessionId);
      },
      onDisconnect: () => {
        console.log("disconnected");
      },
      onError: (err) => {
        console.error("error", err);
      },
      onDataMessage: (msg) => {
        console.log("data message", msg);
      },
      onAgentAmplitudeChange: (amp) => {
        agentUI.updateAmplitude(amp);
      },
      onStatusChange: (s) => {
        agentUI.updateStatus(s);
      },
    });
    window.layercode.connect();
  }
);
