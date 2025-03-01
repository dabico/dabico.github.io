(async function() {
    const sectionMembers = function (section) {
        return [
            section.querySelector(".command"),
            section.querySelector(".blinker"),
            section.querySelector(".output"),
        ];
    };

    const toggleOutput = function (output, blinker) {
        if (output) {
            blinker.hidden = true;
            output.hidden = false;
        } else {
            blinker.classList.add("blinking");
        }
    };

    const delay = async function(timeout = 150) {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const fastRender = async function(section) {
        const [ command, blinker, output ] = sectionMembers(section);
        command.textContent += command.dataset.text;
        command.removeAttribute("data-text");
        toggleOutput(output, blinker);
        section.hidden = false;
    };

    const slowRender = async function(section) {
        section.hidden = false;
        const [ command, blinker, output ] = sectionMembers(section);
        const { text } = command.dataset;
        command.removeAttribute("data-text");
        await delay();
        for (const char of [...text]) {
            command.textContent += char;
            await delay();
        }
        toggleOutput(output, blinker);
    };

    const body = document.querySelector("body");
    const { pageName: key} = body.dataset;
    const shown = window.sessionStorage.getItem(key) === "true";
    window.sessionStorage.setItem(key, "true");
    const renderer = shown ? fastRender : slowRender;
    const sections = document.querySelectorAll(".section");
    for (const section of sections) {
        await renderer(section);
    }
})();
