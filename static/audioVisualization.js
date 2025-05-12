// Creates and returns an audio visualization element
export function createAudioVisualization(amplitude, height = 46) {
  const maxHeight = height;
  const minHeight = Math.floor(height / 6);
  const barWidth = Math.floor(minHeight);
  const multipliers = [0.2, 0.5, 1.0, 0.5, 0.2];
  const normalizedAmplitude = Math.min(Math.max(amplitude * 7, 0), 1);

  const container = document.createElement("div");
  container.className = "w-auto flex items-center gap-[2px]";
  container.style.height = `${height}px`;

  multipliers.forEach((multiplier) => {
    const barHeight = minHeight + normalizedAmplitude * maxHeight * multiplier;
    const bar = document.createElement("div");
    bar.className = "flex flex-col items-center";
    bar.style.height = `${barHeight}px`;
    bar.style.width = `${barWidth}px`;

    // Top rounded cap
    const top = document.createElement("div");
    top.className = "bg-[#FF5B41] dark:bg-[#FF7B61] transition-all duration-20";
    top.style.width = "100%";
    top.style.height = `${barWidth}px`;
    top.style.borderTopLeftRadius = "9999px";
    top.style.borderTopRightRadius = "9999px";
    bar.appendChild(top);

    // Middle straight section
    const middle = document.createElement("div");
    middle.className = "bg-[#FF5B41] dark:bg-[#FF7B61] transition-all duration-20";
    middle.style.width = "100%";
    middle.style.height = `calc(100% - ${2 * barWidth}px)`;
    middle.style.borderRadius = 0;
    bar.appendChild(middle);

    // Bottom rounded cap
    const bottom = document.createElement("div");
    bottom.className = "bg-[#FF5B41] dark:bg-[#FF7B61] transition-all duration-20";
    bottom.style.width = "100%";
    bottom.style.height = `${barWidth}px`;
    bottom.style.borderBottomLeftRadius = "9999px";
    bottom.style.borderBottomRightRadius = "9999px";
    bar.appendChild(bottom);

    container.appendChild(bar);
  });

  return container;
}
