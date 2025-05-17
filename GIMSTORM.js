(function(){
  if(!window.gimkitStormActive){
    window.gimkitStormActive = true;
    var cps = prompt("Enter CPS (1–200):");
    if(!cps || isNaN(cps) || cps <= 0 || cps > 200) {
      alert("❌ Invalid CPS. Reload and try again.");
      window.gimkitStormActive = false;
      return;
    }
    alert("⚡ GIMKIT STORM v2 RUNNING at " + cps + " CPS\n[Ctrl + E] to stop.");
    
    const b = function(){
      function a(){
        const currentHour = new Date().getHours();
        const day = new Date().getDay();
        const options = [
          {h:7, i:0},
          {h:9, i:2},
          {h:11, i:3},
          {h:13, i:5},
          {h:15, i:6},
          {h:17, i:7}
        ];
        for(let option of options) {
          if(currentHour >= option.h){
            d = option.i;
          }
        }
        if(d === null) { d = 7; }
        e = c[d][0];
      }
      function b(){
        if(e === null) { a(); }
        const [start, end] = c[d];
        const i = e++;
        if(e > end){
          f += (end - start + 1);
          e = start;
          if(f >= g){
            d = (d + 1) % c.length;
            e = c[d][0];
            f = 0;
            console.log("[\uD83D\uDD01 SHIFT RANGE]", c[d]);
          }
        }
        return i;
      }
      const c = [
        [100000,199999],
        [200000,299999],
        [300000,399999],
        [400000,499999],
        [500000,599999],
        [600000,699999],
        [700000,799999],
        [800000,999999]
      ];
      let d = null, e = null, f = 0, g = 250;
      return { nextCode: () => b().toString() };
    }();

    const c = (input, value) => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    };

    const d = (element) => {
      const span = element.querySelector("span");
      if(!span) return;
      const rect = span.getBoundingClientRect();
      ["mouseover", "mousedown", "mouseup", "click"].forEach(eventType => {
        span.dispatchEvent(new MouseEvent(eventType, {
          bubbles: true,
          cancelable: true,
          clientX: rect.left + 5,
          clientY: rect.top + 5
        }));
      });
    };

    const mObserver = new MutationObserver(() => {
      document.querySelectorAll(".ant-notification-notice").forEach(el => el.remove());
    });
    mObserver.observe(document.body, { childList: true, subtree: true });

    let active = true;
    const intervalId = setInterval(() => {
      if(!active) return;
      const inputEl = document.querySelector('input[type="number"]');
      const joinDiv = [...document.querySelectorAll("div")].find(el => el.textContent.trim() === "Join");
      if(inputEl && joinDiv){
        const code = b.nextCode();
        c(inputEl, code);
        setTimeout(() => d(joinDiv), 30);
        console.log("[🚀 TRY]", code);
      }
      const hints = ["Enter name", "You're in", "Waiting for host"];
      if(hints.some(text => document.body.innerText.includes(text))){
        clearInterval(intervalId);
        active = false;
        window.gimkitStormActive = false;
        const currentVal = inputEl ? inputEl.value : "UNKNOWN";
        alert(`✅ VALID CODE FOUND: ${currentVal}`);
      }
    }, 1000 / cps);
    
    document.addEventListener("keydown", e => {
      if(e.ctrlKey && e.key === "e"){
        clearInterval(intervalId);
        active = false;
        window.gimkitStormActive = false;
        alert("⛔ GIMKIT STORM STOPPED.");
      }
    });
  } else {
    alert("⚠️ Already running.");
  }
})();
