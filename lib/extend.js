const extend = (des, src, override) => {
    if (Array.isArray(src)) {
        src.forEach((each) => {
            extend(des, each, override);
        });
    }

    const oDes = des;
    Object.keys(src).forEach((key) => {
        if (override || !(key in oDes)) {
            oDes[key] = src[key];
        }
    });
    return oDes;
};

module.exports = extend;
