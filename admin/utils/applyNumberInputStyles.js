function applyNumberInputStyles() {
  const styleElement = document.createElement("style");

  const cssRules = `
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `;

  styleElement.appendChild(document.createTextNode(cssRules));

  document.head.appendChild(styleElement);
}
