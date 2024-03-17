import seedrandoom from "seedrandom/seedrandom"
import * as Subtasks from "@/tasks/tasks";

let SEED = 0;

export function setSeed(seed) {
    SEED = seed;
}

export function Uniform(min, max) {
    return () => {
        const rand = seedrandoom(SEED);
        return Math.floor(rand() * (max + 1 - min) + min);
    }
}

function _gaussian(mean, stdev) {
    const rand = seedrandoom(SEED);
    const u = 1 - rand();
    const v = rand();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    return Math.floor(z * stdev + mean);
}

export function random() {
    const rand = seedrandoom(SEED);
    return rand();
}

export function Gaussian(mean, stdev) {
    return () => {
        let result = -1;
        while (result < 0) {
            result = _gaussian(mean, stdev);
        }
        return result === 0 ? 1 : result;
    }
}

export function humanTime(sec_num) {
    sec_num = Math.floor(sec_num);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    const seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (sec_num < 60) {
        return `${sec_num}s`
    }

    if (sec_num < 3600) {
        return `${minutes < 10 ? "0" : ""}${minutes}<small>m</small> ${seconds < 10 ? "0" : ""}${seconds}<small>s</small>`;
    }

    return `${hours < 10 ? "0" : ""}${hours}<small>h</small> ${minutes < 10 ? "0" : ""}${minutes}<small>m</small>`;
}

export async function toBase64(str) {
    const base64url = await new Promise(r => {
        const reader = new FileReader();
        reader.onload = () => r(reader.result);
        reader.readAsDataURL(new Blob([str]));
    });

    return base64url.slice(base64url.indexOf(',') + 1);
}

class Node {
    constructor(val) {
        this.val = val;
        this.childs = [];
    }

    add(n) {
        if (n === "$return") {
            // FIXME: This shouldn't happen
            debugger;
        }

        if (n === undefined) {
            // FIXME: Action that goes to an invalid step
            debugger
        }
        this.childs.push(n);
    }
}

export function generateGraph(task) {
    const nodes = {$end: new Node("$end")};

    Object.keys(task)
        .forEach(name => nodes[name] = new Node(name));

    Object.entries(task).forEach(([name, steps]) => {
        steps.forEach(step => {
            const node = new Node(name + "." + step.name);
            nodes[node.val] = node;
            nodes[name].add(node);

            step.actions
                .filter(action => action.step !== "$return")
                .forEach(action => nodes[node.val].add(nodes[action.step]));
        });
    });

    return nodes;
}

export function getValidPaths(nodes) {
    const validPaths = [];

    function dfsTraverse(node, path) {
        if (path === undefined) {
            path = [];
        }

        path.push(node.val);

        if (node.val === "$end") {
            validPaths.push(path.slice());
            return;
        }

        node.childs.forEach(x => {
            if (!path.includes(x.val)) {
                dfsTraverse(x, path.slice());
            }
        });
    }

    dfsTraverse(nodes["$start"]);

    return validPaths
        .map(path => path
            .filter(node => node.includes("."))
            .map(node => Subtasks[node.substring(node.indexOf(".") + 1)])
        );
}

export function randomSeed() {
    return Math.round(Math.random() * 10000);
}