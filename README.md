# JIRS-PERFECT
最完整的JIRS TS项目

# unkonwn
被定义为 unknown 的值不能作为值给赋值给其他值
被定义为 unknown 的值不能调用其属性和方法

# 泛型很多时候可用用来解决类型推断
# 泛型会根据传入的数据类型，在赋值给泛型参数
如<T>(s:T)  当使用时如果s=5，则T被推断为number，当s=‘5’，则T被推断为字符串类型


# 联合类型，有多个类型
let myFavoriateNumber: string | number;
myFavoriateNumber = 7;
myFavoriateNumber = '7';
let jackFavoriateNumber: string | number;
// 这里 myFavoriateNumber 和 jackFavoriateNumber 类型都是一样的，可以使用类型别名将类型抽取

# 类型别名:
type FavoriateNumber = string | number;
let roseFavoriateNumber: FavoriateNumber = 7;
let zgysFavoriateNumber: FavoriateNumber = '7';

# 很多时候接口和类型别名可以互换
interface Person {
  name: string
}
type Person = {name: string};
const xiaoMing: Person = {name: 'yxd'};

# 类型别名和接口的区别:
// 类型别名和接口有很多细微的区别，但是很多时候我们在开发过程中无法感知
// 主要两个区别:
// 1.类型别名定义联合类型，接口无法定义
// 2.类型别名定义交叉类型，接口无法定义
// 3.interface无法使用Utility Type(TS定义的工具类型:用来对type定义的数据类型做一些操作)

# Utility Type举例
type perSon = {
  name: string;
  age: number;
};

# 需求1:需要name和age可传可不传，但是不能使用？的方式
// 使用Utility Type Partial<Type>
const xiaoZhao: Partial<perSon> = {name: 'aaaa'}; // 只传名字

# 需求2:只需要age，但是没有name（传name就要错）,
// 使用Utility Type Partial Omit<Type，需要删除的属性>
const shenMiRen: Omit<Person, 'name' | 'age'> = {};

# Partial:的实现
key of T 是将类型T中的键取出来形成一个联合类型，如：
type Personkey = keyof perSon;
Personkey 的类型为 "name" | "age";
P in key of T 是遍历的意思，及遍历Personkey中键值
T[P] 就是取出T类型中P键的类型
type Partial<T> = {
  [P in keyof T]?: T[P];
};

# Pick:的实现
需求，需要在一个类型中挑选几个类型出来作为一个新的类型
下面挑选了name
type PersonOnlyName = Pick<Person,'name'>;
即：
PersonOnlyName = {name：string}
实现：
解说：传入的键K必须在T的键值范围内
type Pick<T,K extends keyof T>={
    [P in T]:T[P]
}
# Exclude 去除联合类型的部分
type Age = Exclude<Personkey,'name'>
Age='age'

