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

# 使用CSS-IN-JS时，可以自定义组件
这种形式可以按照react组件正常使用，并且可以在用传入的属性做一些逻辑上的控制，非常的方便
export const Row = styled.div<{
  gap?: number | boolean,
  between?: boolean,
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${props => props.marginBottom + 'rem'};
  > * {
    margin-top: 0!important;
    margin-bottom: 0!important;
    margin-right:  ${(props) =>
    typeof props.gap === "number" ? props.gap + "rem" : props.gap ? "2rem" : undefined};
  }
`
也可以传入styled继续封装，例如
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  z-index: 1;
`

# typeof
在TypeScript中，typeof操作符可以用来获取一个变量或对象的类型。
interface Person {
    name: string;
    age: number;
}
const sem: Person = { name: "semlinker", age: 30}
type Sem = typeof sem; // type Sem = Person
在上面代码中，我们通过typeof操作符获取sem变量的类型并赋值给Sem类型变量，之后我们就可以使用Sem类型：
const lolo: Sem = { name: "lolo", age: 5 }
你也可以对嵌套对象执行相同的操作：
const kakuqo = {
    name: "kakuqo",
    age: 30,
    address: {
        province: '福建',
        city: '厦门'
    }
}

type Kakuqo = typeof kakuqo;
/**
 * type Kakuqo = {
 *  name: string;
 *  age: number;
 *  address: {
 *   province: string;
 *   city: string;
 *  }
 * }
 */
 此外，typeof操作符除了可以获取对象的结构类型之外，它也可以用来获取函数对象的类型，比如：
 function toArray(x: number): Array<number> {
     return [x]
 }

 type Func = typeof toArray; // -> (x: number) => number[]



# useRef 具体使用看react官网
useRef的current属性能保存一个原始值，但是useref的改变不能引起UI的变化，可以查看官网解决办法
请记住，当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。

# 回调ref
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}



/**
 * as const 返回最原始的一个对象
 */
const a = ['jact', 12, { gender: 'male' }] as const

# 键对字符串的对象约束
{ [key in string]: string } 

# 泛型限制K extends string，这里限制为string
 <K extends string>(keys: Array<K>)

 # 無限循环导致的原因，每次渲染的不是一个对象会造成页面无限循环
 这里keys.reduce方法每次都会返回一個新对象，返回的新对象被UI引用到就会造成无限循环
 export const useUrlQueryParam = <K extends string>(keys: Array<K>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [keys.reduce((pre, key: K) => {
    return { ...pre, [key]: searchParams.get(key) || '' }
  }, {} as { [key in K]: string }), setSearchParams] as const;
}
解决办法:
使用useMemo优化
useMemo:返回一个 memoized 值。
useMemo:把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
useMemo:记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。
如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。
你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。
export const useUrlQueryParam = <K extends string>(keys: Array<K>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [useMemo(() => {
    return keys.reduce((pre, key: K) => {
      return { ...pre, [key]: searchParams.get(key) || '' }
    }, {} as { [key in K]: string })
  }, [searchParams]), setSearchParams] as const;
}

# hooks依赖项
如果使用let obj = {对象}
useEffect(()=>{},[obj]) 会发生无限循环，react每次重新渲染都生成一个新对象
如果使用 let [obj] = useState(null)
useEffect(()=>{},[obj]) 不会发生无限循环，react感知到这是一个组件的state，每次重新渲染都会是同一个对象地址

# Object.fromEntries(iterator)
里面存放一个遍历器，将iterator对象改为一个键值对对象

# 獲取到組件上所有屬性的定義
type SelectProps = React.ComponentProps<typeof Select>;

# 不能将类型“undefined”分配给类型“number”
这种类型的错可以让该参数可传可不传 Partial

# useState可以传入一个函数，传入的函数是用来多惰性初始化value的值（需要通过计算得到才可以得到的值），所以这样使用：
const [value,setValue] = useState(()=>{return value});
里面的箭头函数就会立即被调用，被调用后返回的值就越是value的初始值
调用setValue的时候就相当于是将（）=》{return value}在执行一遍
所以这里传入一个函数在useState中不是为了保存一个函数，而是为了惰性初始化一个值