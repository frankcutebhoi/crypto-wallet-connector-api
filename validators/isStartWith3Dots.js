const isStartWith3Dots = (value) => {
    if (value[0] !== '.' || value[1] !== '.' || value[2] !== '.') {
        throw new Error('input must start with \'...\'');
    }

    return true;
}

module.exports = isStartWith3Dots;