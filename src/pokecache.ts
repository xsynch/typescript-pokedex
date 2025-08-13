

type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  add<T>(key: string, val: T){
    // console.log(`Adding new key: ${key} with value: ${val}`)
    this.#cache.set(key,{createdAt: Date.now(), val})
  }

  get<T>(key: string){
    if(!this.#cache.has(key)){
        return undefined
    }
    let result = this.#cache.get(key)
    if (result) {
        return result.val
    } else {
        return undefined
    }    
  }

  constructor(interval: number){
    this.#interval = interval;
    this.#startReapLoop()

  }

  #reap(){
    
    for (let entry of this.#cache.keys()){
        let val = this.#cache.get(entry)
        if (val && Date.now() - val.createdAt > this.#interval){
            // console.log(`Removing ${entry}: ${val.val}`)
            this.#cache.delete(entry)
        }

    }

  }

  #startReapLoop(){
    
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval)
  }

  stopReapLoop(){
    clearInterval(this.#reapIntervalId)
    this.#reapIntervalId = undefined;
  }
} 

