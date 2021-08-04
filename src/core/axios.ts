// 拦截器
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number

  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected: RejectedFn
}
export default class InterceptorsManager<T> {
  private Interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.Interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    this.Interceptors.push({
      resolved,
      rejected
    })
    return this.Interceptors.length - 1
  }

  forEach(fn: (Interceptor: Interceptor<T>) => void): void {
    this.Interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.Interceptors[id]) {
      this.Interceptors[id] = null
    }
  }
}
