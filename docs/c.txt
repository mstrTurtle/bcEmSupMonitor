import { firstValueFrom, timer } from "rxjs";

(async () => {
    const r = await firstValueFrom(timer(50))
    console.log(typeof(r))
})()