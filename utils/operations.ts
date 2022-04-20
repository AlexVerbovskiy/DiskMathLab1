export const operate = (multy1: string, multy2: string, type: string): string => {
    const arr1: string[] = multy1.split(",").map(elem => elem.trim());
    const arr2: string[] = multy2.split(",").map(elem => elem.trim());
    let resArr: string[] = [];
    switch (type) {
        case "union":
            resArr = mergeArr(arr1, arr2);
            break;
        case "cross section":
            resArr = filterArr(arr1, arr2, false);
            break;
        case "difference":
            resArr = filterArr(arr1, arr2);
            break;
        case "symmetrical difference":
            const resArr1 = filterArr(arr1, arr2);
            const resArr2 = filterArr(arr2, arr1);
            resArr = mergeArr(resArr1, resArr2);
            break;
    }
    const res = resArr.join(", ");
    return res;
}

const filterArr = (arr1: string[], arr2: string[], unique = true) => {
    const resArr = new Map<string, string>();
    arr1.forEach(elem1 => {
        let countDup = 0;
        arr2.forEach(elem2 => {
            if (elem1 === elem2)
                countDup++;
        })
        if ((!unique && countDup) || (unique && !countDup))
            resArr.set(elem1, "");
    })
    return Array.from(resArr.keys());
}

const mergeArr = (arr1: string[], arr2: string[]): string[] => arr1.concat(arr2.filter(ele => !arr1.includes(ele)));
