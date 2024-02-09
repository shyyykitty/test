import seedrandoom from "seedrandom/seedrandom"

let rand = seedrandoom("hello");

export function setSeed(seed) {
    rand = seedrandoom(seed);
}

export function Uniform(min, max) {
    return () => Math.floor(rand() * (max + 1 - min) + min);
}

function _gaussian(mean, stdev) {
    const u = 1 - rand();
    const v = rand();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    return Math.floor(z * stdev + mean);
}

export function Gaussian(mean, stdev) {
    return () => {
        let result = -1;
        while (result <= 0) {
            result = _gaussian(mean, stdev);
        }
        return result;
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