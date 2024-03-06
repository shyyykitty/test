export class Requirement {
    constructor(name, text) {
        this.name = name;
        this.text = text;
    }
}

export class ObjectReq extends Requirement {
    constructor(name, object) {
        super(name, `Having access to ${object}.`);
    }
}

export class Subtask {

    /**
     * @param {string} template
     * @param {Requirement[]|ObjectReq[]} requirements
     * @param {Object.<string, function>} variables
     * @param {Object.<string, Subtask>} twists
     * @param {Object.<string, Modifier>} modifiers
     */
    constructor(template, requirements = [], variables = {}, twists = {}, modifiers = {}) {
        this.template = template
        this.requirements = requirements
        this.variables = variables
        this.twists = twists
        this.modifiers = modifiers;
    }

    text() {
        let text = this.template;
        for (const [k, v] of Object.entries(this.variables)) {
            text = text.replaceAll(`{${k}}`, v());
        }

        text = text.replaceAll("[", "<span class=\"spoiler\" onclick='this.classList.add(\"unspoiler\")'>")
        text = text.replaceAll("]", "</span>BREAK")

        return text;
    }

    getTimers() {
        const pattern = /((?<m>[0-9]+) minutes?)|((?<s>[0-9]+) seconds?)/ig;

        const timers = [];

        [...this.text().matchAll(pattern)].forEach(match => {
            const minutes = match.groups.m ?? 0;
            const seconds = match.groups.s ?? 0;

            const time = minutes * 60 + seconds;

            if (time >= 10) {
                timers.push(time)
            }
        })

        return timers;
    }
}

export class Twist extends Subtask {

}
