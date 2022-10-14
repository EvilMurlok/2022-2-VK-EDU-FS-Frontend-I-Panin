export default function runOnKeys(cb, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
        pressed.add(event.code);
        console.log(event.code);
        for (let code of codes) {
            if (!pressed.has(code)) {
                return;
            }
        }
        pressed.clear();
        cb();
    });

    document.addEventListener('keyup', function(event) {
        pressed.delete(event.code);
    });
};
