TS的Enum值不能是子类型。反观Rust和Haskell的ADT直接是新的类型。

TS不能newtype生造出新类型。只能用空class实现模板。

TS只有泛型，不能实现类模板偏特化。TS的函数重载只对外部保证类型，只是函数签名保证了类型。实现中用if-else实现。所以不能被用来做静态派发。

TS的Enum，还有typeof，`[xx in yy]`，这种东西，比较复杂奇怪，需要研究下。
