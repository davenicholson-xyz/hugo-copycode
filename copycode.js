window.onload = function () {
  const copyCode = async (el) => {
    let code = el.querySelector("code");
    let text = cleanCopy(code.innerText);
    await navigator.clipboard.writeText(text);
  };

  const cleanCopy = (str) => {
    const lines = str.split("\n");
    let result = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() !== "") {
        result.push(lines[i]);
      } else {
        if (i + 1 < lines.length && lines[i + 1].trim() === "") {
          result.push("");
          i++;
        }
      }
    }
    return result.join("\n");
  };

  const SVG2HTMLElement = (svgString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = doc.documentElement;
    return svgElement;
  };

  const copy_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M3 3a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H5v12a1 1 0 1 1-2 0zm4 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3z" clip-rule="evenodd"/></svg>`;
  const copied_svg = `<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24"><path fill="currentColor" d="M18.333 6A3.667 3.667 0 0 1 22 9.667v8.666A3.667 3.667 0 0 1 18.333 22H9.667A3.667 3.667 0 0 1 6 18.333V9.667A3.667 3.667 0 0 1 9.667 6zM15 2c1.094 0 1.828.533 2.374 1.514a1 1 0 1 1-1.748.972C15.405 4.088 15.284 4 15 4H5c-.548 0-1 .452-1 1v9.998c0 .32.154.618.407.805l.1.065a1 1 0 1 1-.99 1.738A3 3 0 0 1 2 15V5c0-1.652 1.348-3 3-3zm1.293 9.293L13 14.585l-1.293-1.292a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414"/></svg>`;

  let copy_icon = SVG2HTMLElement(copy_svg);
  let copied_icon = SVG2HTMLElement(copied_svg);

  const codeblocks = document.querySelectorAll("pre:has(code)");

  codeblocks.forEach((codeblock) => {
    let btn = document.createElement("button");
    btn.classList.add("codecopy");
    btn.appendChild(copy_icon.cloneNode(true));

    codeblock.appendChild(btn);

    btn.addEventListener("click", async () => {
      await copyCode(codeblock);
      btn.classList.add("copied");
      btn.replaceChildren(copied_icon.cloneNode(true));

      setTimeout(() => {
        btn.classList.remove("copied");
        btn.replaceChildren(copy_icon.cloneNode(true));
      }, 1500);
    });
  });
};
