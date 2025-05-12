import { createMicrophoneIcon } from "./microphoneIcon.js";

export function createMicrophoneButtonPushToTalk({
  triggerUserTurnStarted,
  triggerUserTurnFinished,
  minHoldDuration = 150,
  key = "Space",
} = {}) {
  let isPressed = false;
  let timeoutId = null;
  let pressedVisually = false;

  const button = document.createElement("button");
  button.className =
    "h-12 px-4 rounded-full flex items-center gap-2 justify-center cursor-pointer outline-none focus:outline-none transition-colors duration-200 select-none bg-gray-800 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-800";
  button.style.border = "none";

  const label = document.createElement("div");
  label.className = "text-sm font-medium text-white whitespace-nowrap";
  label.textContent = "Hold while speaking";
  button.appendChild(label);
  button.appendChild(createMicrophoneIcon());

  function setVisuallyPressed(pressed) {
    pressedVisually = pressed;
    button.className =
      "h-12 px-4 rounded-full flex items-center gap-2 justify-center cursor-pointer outline-none focus:outline-none transition-colors duration-200 select-none " +
      (pressed ? "bg-[#FF5B41]" : "bg-gray-800 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-800");
  }

  function handlePressStart() {
    if (isPressed) return;
    isPressed = true;
    setVisuallyPressed(true);
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      triggerUserTurnStarted && triggerUserTurnStarted();
      timeoutId = null;
    }, minHoldDuration);
  }

  function handlePressEnd() {
    if (!isPressed) return;
    setVisuallyPressed(false);
    isPressed = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    triggerUserTurnFinished && triggerUserTurnFinished();
  }

  // Mouse/touch events
  button.addEventListener("mousedown", handlePressStart);
  button.addEventListener("mouseup", handlePressEnd);
  button.addEventListener("mouseleave", handlePressEnd);
  button.addEventListener("touchstart", handlePressStart);
  button.addEventListener("touchend", handlePressEnd);

  // Keyboard support
  window.addEventListener("keydown", (e) => {
    if (e.code === key && !isPressed) {
      e.preventDefault();
      handlePressStart();
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === key && isPressed) {
      e.preventDefault();
      handlePressEnd();
    }
  });

  return button;
}
