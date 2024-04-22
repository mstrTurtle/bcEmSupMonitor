enum E{A,B}
var a = E[E.A]
console.log(E.B as number)
// E.A打印默认是number那种。可以用E操作符把enum E变成string，或者把string变回enum E
