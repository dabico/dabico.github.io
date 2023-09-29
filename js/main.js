(async function() {
    const sectionMembers = function (section) {
        return [
            section.querySelector(".command"),
            section.querySelector(".blinker"),
            section.querySelector(".output")
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
        const text = command.dataset.text;
        command.removeAttribute("data-text");
        await delay();
        for (let i = 0; i < text.length; i++) {
            command.textContent += text.charAt(i);
            await delay();
        }
        toggleOutput(output, blinker);
    };

    const body = document.querySelector("body");
    const storage = window.sessionStorage;
    const key = body.dataset.pageName;
    const shown = storage.getItem(key) === "true";
    storage.setItem(key, "true");
    const renderer = shown ? fastRender : slowRender;
    const sections = document.querySelectorAll(".section");
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        await renderer(section);
    }
})();
