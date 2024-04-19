
enum MsgType{
    Hello='hello',
}

interface Msg<T extends MsgType> {
    type: T,
    content:any,
}

var msgHandler:Map<MsgType,(content:any)=>void> = new Map<MsgType,()=>void>()

msgHandler.set(MsgType.Hello, (content)=>{console.log('hello there')})


function NotImplementedError(this: any, message = "") {
    this.name = "NotImplementedError";
    this.message = message;
}

NotImplementedError.prototype = Error.prototype;


function  dispatchMesg<T extends MsgType>(message: Msg<T>) {
    const { type, content } = message;
    if(msgHandler==undefined) return
    let possiblehandler = msgHandler.get(type)
    let defaultHandler = ((c:any)=>{throw NotImplementedError('hhhh')})
    let theHandler = possiblehandler??defaultHandler
    theHandler(content)
}

var ss:string = 'hello'

function toMsgType(s:string){
    MsgType.Hello
}

dispatchMesg({type:MsgType[ss],content:null})