const arrayCompact = <T>(items: Array<T | null>): T[] => {
    const output: T[] = [];

    items.forEach(item => {
        if (item != null) output.push(item);
    });

    return output;
};

export default arrayCompact;
