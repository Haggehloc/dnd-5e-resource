module.exports =
{
    isNullOrEmptyObject:function (val) {
        return val == null ||
            (typeof val === 'object' &&
            Object.keys(val).length === 0);
    }
};
