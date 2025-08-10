type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  add<T>(key: string, val: T){
    this.#cache.set(key,{createdAt: Date.now(), val})
  }

  get<T>(key: string){
    if(!this.#cache.has(key)){
        return undefined
    }
    return this.#cache.get(key)
  }

  constructor(interval: number){
    this.#interval = interval;

  }
}

