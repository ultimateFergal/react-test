export const debounce = (callback: (...args: string[]) => void, debounceTime: number) => {
    let timer: ReturnType<typeof setTimeout>
    
    console.log(callback,  debounceTime)
    return function (...args: string[]) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            callback(...args)
        }, debounceTime)
    }
}