/**
 * Provides DOM-based user-interface elements such as score display and control instructions.
 */
export class UI {
  /**
   * Constructs the UI and injects its elements into the document.
   */
  constructor() {
    this.injectStyles();
    this.createScoreContainer();
    this.createInstructions();
  }

  /**
   * Dynamically injects the base stylesheet link for UI components if it does not already exist.
   * @private
   */
  injectStyles() {
    if (!document.getElementById("ui-css")) {
      const link = document.createElement("link");
      link.id = "ui-css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }

  /**
   * Creates and positions the on-screen score display.
   * @private
   */
  createScoreContainer() {
    const scoreContainer = document.createElement("div");
    scoreContainer.id = "score-container";
    scoreContainer.style.position = "absolute";
    scoreContainer.style.top = "20px";
    scoreContainer.style.left = "50%";
    scoreContainer.style.transform = "translateX(-50%)";
    scoreContainer.style.color = "white";
    scoreContainer.style.fontSize = "24px";
    scoreContainer.style.fontFamily = "Arial, sans-serif";
    scoreContainer.style.fontWeight = "bold";
    scoreContainer.style.textAlign = "center";
    scoreContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    scoreContainer.style.padding = "10px 20px";
    scoreContainer.style.borderRadius = "10px";
    scoreContainer.innerHTML = `
      <div id="score-display">Score: 0</div>
    `;
    document.body.appendChild(scoreContainer);
  }

  /**
   * Builds the instruction overlay that lists available keyboard controls.
   * @private
   */
  createInstructions() {
    const instructionsElement = document.createElement("div");
    instructionsElement.id = "controls-container";
    instructionsElement.style.position = "absolute";
    instructionsElement.style.bottom = "20px";
    instructionsElement.style.left = "20px";
    instructionsElement.style.color = "white";
    instructionsElement.style.fontSize = "16px";
    instructionsElement.style.fontFamily = "Arial, sans-serif";
    instructionsElement.style.textAlign = "left";
    instructionsElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    instructionsElement.style.padding = "15px";
    instructionsElement.style.borderRadius = "10px";
    instructionsElement.innerHTML = `
      <h3 style="margin: 0 0 10px 0; color: #ffaa00;">Basketball Court - HW05</h3>
      <p style="margin: 5px 0;"><strong>Current Controls:</strong></p>
      <p style="margin: 5px 0;">O - Toggle orbit camera</p>
      <p style="margin: 5px 0; color: #888; font-style: italic;">Interactive controls coming in HW06...</p>
    `;
    document.body.appendChild(instructionsElement);
  }

  /**
   * Updates the orbit camera status label within the instruction overlay.
   *
   * @param {boolean} isOrbitEnabled - Whether the orbit camera is currently enabled.
   * @public
   */
  updateOrbitStatus(isOrbitEnabled) {
    const controlsContainer = document.getElementById("controls-container");
    if (!controlsContainer) return;

    const statusText = isOrbitEnabled
      ? "O - Toggle orbit camera (ON)"
      : "O - Toggle orbit camera (OFF)";

    controlsContainer.innerHTML = `
      <h3 style="margin: 0 0 10px 0; color: #ffaa00;">Basketball Court - HW05</h3>
      <p style="margin: 5px 0;"><strong>Current Controls:</strong></p>
      <p style="margin: 5px 0;">${statusText}</p>
      <p style="margin: 5px 0; color: #888; font-style: italic;">Interactive controls coming in HW06...</p>
    `;
  }
}
