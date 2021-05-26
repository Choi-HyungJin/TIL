# 210526 - TypeScript

## JavaScript Type vs TypeScript Type

TypeScript - Static Type - set during development

JavaScript - Dynamic Type - resolved at runtime

ECMAScript 표준 기본 자료형 

- Boolean
- Number
- String
- Null
- Undefined
- Symbol
- Array : object 형

프로그래밍을 도와주는 추가 타입

- Any, Void, Never, Unknown
- Enum
- Tuple : object 형

```tsx
console.log(typeof null) // object
console.log(typeof undefined) // undefined

let v: void = null // Type 'null' is not assignable to type 'void'

// union type
let u: string | null = null;
u = 'optimy'
```

object

- a type that represents the non-primitive type
- "primitive type이 아닌 것"을 나타내고 싶을 때 사용

non-primitive type

- **not** number, string, boolean, bigint, symbol, null, or undefined

```tsx
const user: object = {
	name: 'optimy',
	age: 22
}

const user1: object = Object.create({
	name: 'optimy',
	age: 22
})

```

Array

```tsx
const list1: number[]  = [1, 2, 3]
const list2: Array<number> = [1, 2, 3]
const list3: (number | string)[] = [1, 2, 3, '4']
const list4: Array<number | string> = [1, 2, 3, '4']
```

tuple

```tsx
const user: [string, number, string] = ['optimy', 22, 'optimizion@gmail.com']
const [userName, age, email] = user

console.log(userName, age, email) // optimy 22 optimizion@gmail.com
console.log(typeof userName) // string
console.log(typeof age) // number
console.log(typeof email) // string
```

any

- 어떤 타입이어도 상관없는 타입
- 컴파일 타임에 타입 체크가 이뤄지지 않음
- noImplicitAny 옵션을 켤 경우 any를 명시적으로 써줘야 함

```tsx
// any propagation
function leakingAny(obj: any) { // obj -> any
  const a = obj.num; // a -> any
  const b = a + 1; // b -> any
  return b;
}

const c = leakingAny({num: 0}); // c -> any
c.indexOf("0"); // c의 타입 체크가 이뤄지지 않아 컴파일 타임에 에러가 발생하지 않음
```

unknown

- any보다 Type-safe한 타입
- 컴파일러가 타입을 추론할 수 있게끔 타입의 유형을 좁히거나
- 타입을 확정해주지 않으면 다른 곳에 할당 할 수 없고, 사용할 수 없다
    - runtime error를 줄일 수 있음

```tsx
function stringifyForLogging(value: unknown): string {
	if (typeof value === "function") {
		// `value` has type `Function`
	}

	if (value instanceof Date) {
		// `value` has type `Date`
	}

	return String(value);
}

function isNumberArray(value: unknown): value is number[] {
	return (
		Array.isArray(value) && 
			value.every(element => typeof element === "number")
	)
}
```

never

- 모든 타입의 subtype 이며, 모든 타입에 할당 가능
- never에는 어떤 것도 할당 불가(any도 불가)
- 잘못된 타입을 넣는 실수를 막고자 할 때 사용

```tsx
declare const a: string;
if (typeof a !== 'string') {
	let b = a; // b -> never
}

function infiniteLoop(): never {
	while(true) {}
}
```

void

```tsx
function returnVoid(message: string): void {
	console.log(message);

	return;
	// return undefined;
}

const r = returnVoid("no return") // r -> void
console.log(r) // undefined
```

## 타입 시스템

- 컴파일러에게 사용하는 타입을 명시적으로 지정하는 시스템
- 컴파일러가 자동으로 타입을 추론하는 시스템

타입스크립트의 타입 시스템

- 타입을 명시적으로 지정할 수 있음
- 명시적으로 지정하지 않으면, 타입스크립트 컴파일러가 자동으로 타입을 추론

## 타입 별칭 (별명)

- interface 랑 비슷함
- Primitive, Uniion Type, Tuple, Function
- 만들어진 타입의 refer로 사용

```tsx
// Aliasing Primitive
type MyStringType = string
const str = 'world'
let myStr: MySTringType = 'hello'

// Aliasing Union Type
type StringOrNumber = string | number
let another: StringOrNumber

// Aliasing Function
type EatType = (food: string) => void;
```

## Interface

```tsx
interface Person {
	name: string;
	age: number;
	email?: string; // optional property
	[index: string]: any; // indexible property
	hello1(): void;
	hello2(): void;
}

interface IPerson1 {
	name: string;
	age?: number;
	hello(): void;
}

function hello(person: Person): void {
  console.log(`hello! ${person.name}입니다.`);
}

class Person1 implements IPerson1 {
	name: string;
	age: number | undefined;

	constructor(name: string) {
		this.name = name;
	}

	hello(): void {
		console.log(this.name);
	}
}

const p: Person = {
  name: 'optimy',
  age: 22,
	// email: "optimizion@gmail.com",
	whatever: "whatever",
	hello1: function(): void {
		console.log(this.name)
	},
	hello2(): void {
		console.log(this.name)
	}
};

hello(p); // hello! optimy입니다.
p.hello1(); // optimy
p.hello2(); // optimy
const p1 = new Person1('optimy');
p1.hello() // optimy

```

```tsx
// interface extends
interface IPerson {
	name: string,
	age?: number
}

interface IKorean extends IPerson {
	city: string
}

const k: IKorean = {
	name: 'optimy',
	city: 'seoul'
}
```

```tsx
// function interface
interface HelloPerson {
	(name: string, age?: number): void;
}

const helloPerson: HelloPerson = function (name: string, age?: number) {
	console.log(name);
}
```

```tsx
// readonly interface property
interface Person {
	name: string,
	age?: number,
	readonly gender: string
}
const optimy: Person {
	name: 'optimy',
	gender: 'male'
}
optimy.gender = 'female' // Cannot assign to 'gender' because it is a read-only property
```

```tsx
// function
// type alias
type EatType = (food: string) => void; 
// interface
interface IEat {
	(food: string): void;

}
// Array
// type alias
type PersonList = string[];
// interface
interface IPersonList {
	[index: number]: string;
}

// intersection
interface ErrorHandling {
	succes: boolean;
	error?: {message: string};
}
interface ArtistData {
	artists: {name: string}[];
}
// type alias
type ArtistResponseType = ArtistData & ErrorHandling;
// interface
interface IArtistsResponse extends ArtistsData, ErrorHandling {}

// union types
// type alias
interface Bird {
	fly(): void;
	layEggs(): void;
}
interface Fish {
	swim(): void;
	layEggs(): void;
}
type PetType = Bird | Fish;

// Declaration Merging - interface
interface MergingInterface {
	a: string;
}
interface MergingInterface {
	b: string;
}
// 위와 동일
interface MergingInterface {
	a: string;
	b: string;
}
```

## Classes

TypeScript 에서는 클래스도 사용자가 만드는 타입의 하나

```tsx
class Person {
	name: string;
	constructor(name: string) {
		this.name = name;
	}
}

const p1 = new Person("optimy");
console.log(p1); // Person {name: 'optimy'}
```

```tsx
// constructor, initialize
class Person {
	name!: string;
	age: number;

	constructor(age?: number) {	
		if (age === undefined) {
			this.age = 20;
		} else {
			this.age = age;
		}
	}

	async init() {
		// initialize property
		this.name = 'optimy';
	}
}

const p1 = new Person(22);
await p1.init();
```

```tsx
// Access Modifiers
// default는 public - 모두 접근 가능
class Person {
	name: string;
	private age: number; // private - 외부에서 접근 불가
	protected email: string; // protected - 외부에서 접근 불가, 상속 관계에서는 가능
}
```

```tsx
class Person {
	// initialization in constructor parameters
	constructor(public name: string, private age: number) {}
}

const p1: Person = new Person("optimy", 22);
console.log(p1); // Person {name: 'optimy', age: 22}
```

```tsx
// Getter & Setter
class Person {
	public constructor(private _name: string, private age: number) {}

	get name() {
		return this._name;
	}

	set name(n: string) {
		this._name = n;
	}
}

const p1: Person = new Person('optimy', 22);
console.log(p1.name);   // optimy
p1.name = 'optimizion';
console.log(p1.name);   // optimizion
```

```tsx
// read-only property
class Person {
	public readonly name: string = 'optimy';
	private readonly country: string = 'Korea';
	private readonly city: string;

	public constructor(private _name: string, private age: number) {
		this.city = 'Seoul';
	}

	hello() {
		this.country = 'China'; // Error
	}
}

const p1: Person = new Person('optimy', 22);
console.log(p1.name);   // optimy
p1.name = 'optimizion'; // Error
```

```tsx
// class => object
// {mark: 'male', jade: 'male'}
// {chloe: 'female', alex" 'male', anna: 'female'}

class Students {
	[index: string]: "male" | "female";
	
	mark: "male" = "male";
}

const a = new Students();
a.mark = 'male';
a.jade = 'male';
console.log(a); // Students {mark: 'male', jade: 'male'}

const b = new Students();
b.chloe = 'female';
b.alex = 'male';
b.anna = 'female';
console.log(b); // Students {chloe: 'female', alex" 'male', anna: 'female'}
```

```tsx
// Static Properties & Methods
class Person {
	public static CITY = "Seoul";
	public static hello() {
		console.log('hello');
	}
}

const p1 = new Person();
p1.hello(); // Error
Person.hello(); // hello
console.log(Person.CITY); // Seoul
```

```tsx
// singleton pattern
class ClassName {
	private static instance: ClassName | null = null;
	public static getInstance(): ClassName {
		if (ClassName.instance === null) {
			ClassName.instance = new ClassName();
		}

		return ClassName.instance;
	}
	
	private constructor() {}
}

const a = ClassName.getInstance();
const b = ClassName.getInstance();

console.log(a === b); // true
```

```tsx
// inheritance
class Parent {
	constructor(protected _name: string, private age: number) {}

	public print(): void {
		console.log(`name: ${this.name}, age: ${this.age}`);

	protected printName(): void {
		console.log(this._name);
	}
}

const p = new Parent('optimy', 22);
p.print(); // name: optimy, age: 22

class Child extends Parent {
	public gender = "male";

	constructor(age: number) {
		super('optimizion', age);
		this.printName();
	}
}

const c = new Child(22);
c.print(); // name: optimizion, age: 22
```

```tsx
// abstract class
abstract class AbstractPerson {
	protected _name: string = 'optimy';

	abstract setName(name: string): void;
}

class Person extends AbstractPerson {
	setName(name: strong): void {
		this._name = name;
	}
}

const p = new Person();
p.setName("optimizion");
```

## Generics

```tsx
function helloString(message: string): string {
	return message;
}
function helloNumber(message: number): number {
	return message;
}
function hello<T>(message: T): T {
	return message;
}

console.log(hello('optimy'));
```

```tsx
function helloBasic<T, U>(message: T, comment: U): T {
	return message;
}

helloBasic<string, number>('optimy', 22); // T: string, U: number
helloBasic(22, 23); // T: 22, U: 23
```

```tsx
// Generics Array
function helloArray<T>(message: T[]): T {
	return message[0];
}

helloArray(['Hello', 'World']); // T: string
helloArray(['Hello', 22]); // T: string | number

// Generics Tuple
function helloTuple<T, K>(message: [T, K]): T {
	return message[0];
}

helloTuple(["Hello", "World"); // T: string, K: string
helloTuple(["Hello", 22); // T: string, K: number
```

```tsx
// Generics Function
type HelloFunctionGeneric1 = <T>(message: T) => T;

const helloFunction1: HelloFunctionGeneric1 = <T>(message: T): T => {
	return message;
};

interface HelloFunctionGeneric2 {
	<T>(message: T): T;
}
const helloFunction2: HelloFunctionGeneric2 = <T>(message: T): T => {
	return message;
}
```

```tsx
// Generics Class
class Person<T, K> {
	private _name: T;
	private _age: K;
	
	constructor(name: T, age: K) {
		this._name = name;
		this._age = age;
	}
}

new Person("optimy", 22);
new Person<string, number>('optimy', 22);
```

```tsx
// Generics with extends
class PersonExtends<T extends string | number> {
	private _name: T;

	constructor(name: T) {
		this._name = name;
	}
}

new PersonExtends('optimy'); // T: string
new PersonExtends(22); // T: number
```

```tsx
// keyof & type lookup
interface IPerson {
	name: string;
	age: number;
}

const person: IPerson = {
	name: 'optimy',
	age: 22
};

function getProp<T, K extedns keyof T>(obj: T, key: K): T[K] {
	return obj[key];
}

function setProp<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
	obj[key] = value;
}
```