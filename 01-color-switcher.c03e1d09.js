!function(){var t={bodyEl:document.body,startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},n=null;t.stopBtn.disabled=!0,t.startBtn.addEventListener("click",(function(o){n=setInterval((function(){var n,o="#".concat(Math.floor(16777215*Math.random()).toString(16));n=o,t.bodyEl.style.backgroundColor=n}),1e3),t.startBtn.disabled=!0,t.stopBtn.disabled=!1})),t.stopBtn.addEventListener("click",(function(o){clearInterval(n),t.startBtn.disabled=!1,t.stopBtn.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.c03e1d09.js.map
