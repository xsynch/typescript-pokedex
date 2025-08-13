export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    add(key, val) {
        // console.log(`Adding new key: ${key} with value: ${val}`)
        this.#cache.set(key, { createdAt: Date.now(), val });
    }
    get(key) {
        if (!this.#cache.has(key)) {
            return undefined;
        }
        let result = this.#cache.get(key);
        if (result) {
            return result.val;
        }
        else {
            return undefined;
        }
    }
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    #reap() {
        for (let entry of this.#cache.keys()) {
            let val = this.#cache.get(entry);
            if (val && Date.now() - val.createdAt > this.#interval) {
                // console.log(`Removing ${entry}: ${val.val}`)
                this.#cache.delete(entry);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
