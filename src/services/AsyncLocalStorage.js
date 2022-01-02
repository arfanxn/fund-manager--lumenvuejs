class AsyncLocalStorage {
    static setItem(key, value) {
        return Promise.resolve().then(() => {
            if (typeof value != "string" ||
                typeof value != "number") value = JSON.stringify(value);
            window.localStorage.setItem(key, value);
        });
    }

    static async getItem(key) {
        return Promise.resolve().then(() => {
            let item = window.localStorage.getItem(key);
            try {
                return JSON.parse(item);
            } catch (error) {
                return item;
            }
        });
    }

    static removeItem(key) {
        return Promise.resolve()
            .then(() => window.localStorage.removeItem(key));
    }

    static clear() {
        return Promise.resolve()
            .then(() => window.localStorage.clear());
    }
}

export default AsyncLocalStorage;