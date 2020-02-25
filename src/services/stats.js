export const updateStats =(statsObj, c, d) => {
    const length = statsObj.piApproximationsArray.length
    const newMean = (statsObj.mean * length + c/d) / (length + 1);
    statsObj.piApproximationsArray.push(newMean);
    statsObj.mean = newMean;
    statsObj.count = length + 1;
    c > statsObj.circumferenceMax ? statsObj.circumferenceMax = c : null;
    d > statsObj.diameterMax ? statsObj.diameterMax = d : null;
    return statsObj
}
