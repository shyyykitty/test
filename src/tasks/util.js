import * as seedrandoom from "seedrandom/seedrandom"

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
