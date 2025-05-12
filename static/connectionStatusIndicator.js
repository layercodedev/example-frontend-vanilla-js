// Creates and returns a connection status indicator element and updater
export function createConnectionStatusIndicator(status) {
  const container = document.createElement("div");
  container.className =
    "justify-self-start flex items-center gap-2 bg-white dark:bg-gray-800 sm:px-3 p-1 rounded-full shadow-sm dark:shadow-gray-900/30";

  const dot = document.createElement("div");
  dot.className = "w-3 h-3 rounded-full";
  if (status === "connected") dot.classList.add("bg-green-500");
  else if (status === "connecting") dot.classList.add("bg-yellow-500");
  else dot.classList.add("bg-red-500");
  container.appendChild(dot);

  const span = document.createElement("span");
  span.className = "text-sm text-gray-700 dark:text-gray-300 hidden sm:block";
  if (status === "connected") span.textContent = "Connected";
  else if (status === "connecting") span.textContent = "Connecting...";
  else if (status === "error") span.textContent = "Connection Error";
  else span.textContent = "Disconnected";
  container.appendChild(span);

  function updateStatus(newStatus) {
    dot.classList.remove("bg-green-500", "bg-yellow-500", "bg-red-500");
    if (newStatus === "connected") dot.classList.add("bg-green-500");
    else if (newStatus === "connecting") dot.classList.add("bg-yellow-500");
    else dot.classList.add("bg-red-500");

    if (newStatus === "connected") span.textContent = "Connected";
    else if (newStatus === "connecting") span.textContent = "Connecting...";
    else if (newStatus === "error") span.textContent = "Connection Error";
    else span.textContent = "Disconnected";
  }

  return { element: container, updateStatus };
}
