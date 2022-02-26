const __basedir = 'C:/Users/Amadeusz/Documents/Projects/TravelR/api/storage/';

const getBasePath = (selector: string) => {
    if (selector === 'files') {
        return __basedir + selector;
    } else {
        return __basedir + 'images/' + selector;
    }
};

const getPath = (selector: string, filename?: string) => {
    if (filename) {
        return [getBasePath(selector), filename].join('/');
    } else return getBasePath(selector);
};

export default {
    getPath
};
