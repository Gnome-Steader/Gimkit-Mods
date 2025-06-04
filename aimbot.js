javascript:(function() {
  if (!window.click) {
    window.click = true;
    document.body.style.cursor = 'crosshair';

    var cps = prompt('Autoclicker CPS: (Under 200 recommended)');
    if (!cps || isNaN(cps)) {
      alert('Invalid input. Try running the script again.');
      end();
      return;
    } else {
      alert('Canvas auto-clicker activated at ' + cps + ' CPS! Hold left-click to activate. Press [Ctrl+E] to stop.');
    }

    var canvas = document.querySelector('canvas');
    if (!canvas) {
      alert('No canvas element found!');
      end();
      return;
    }

    var int, x, y;

    document.addEventListener('mousemove', e => {
      x = e.clientX;
      y = e.clientY;
    });

    canvas.addEventListener('mousedown', () => {
      int = setInterval(() => {
        var event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: x,
          clientY: y
        });
        canvas.dispatchEvent(event);
      }, 1000 / cps);
    });

    canvas.addEventListener('mouseup', () => {
      clearInterval(int);
    });

    addEventListener('keydown', e => {
      if (e.key === 'e' && e.ctrlKey) {
        alert('Auto-clicker deactivated! Click the bookmark again to reactivate.');
        end();
      }
    });

    function end() {
      clearInterval(int);
      window.click = false;
      document.body.style.cursor = 'default';
    }
  }
})();

