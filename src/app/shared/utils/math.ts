// https://github.com/samiare/Controller.js/blob/master/source/Controller.js
export function getNormalizedAnalogInput(input: number): number {
    return (Math.abs(input) < 0.1) ? 0 : getLinearConversion(input, -0.9, 1, -1, 1)
}

// https://github.com/samiare/Controller.js/blob/master/source/Controller.js
export function getLinearConversion(value: number, oldMin: number, oldMax: number, newMin: number, newMax: number): number {
    let result = (((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;

    if (newMax < newMin) {
        if (result < newMax) {
            result = newMax;
        } else if (result > newMin) {
            result = newMin;
        }
    } else {
        if (result > newMax) {
            result = newMax;
        } else if (result < newMin) {
            result = newMin;
        }
    }

    return result;
}

export function deadzone(v: number, z = 0.15) {
  return Math.abs(v) < z ? 0 : v;
}