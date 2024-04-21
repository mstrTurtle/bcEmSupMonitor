import { firstValueFrom, timer } from "rxjs"

const coro = async () => {
     await Promise.race([firstValueFrom(timer(3000)), firstValueFrom(timer(5000))]) 
}

coro()