const debug = true;

class Animal {
  constructor(name) {
    this.name = name;
    this.type = "animal";
  }

  getName() {
    return this.name;
  }
}

class Lion extends Animal {
  constructor(name) {
    super(name);
    this.type = "lion";
  }
}

class exStatic {
  static getName() {
    return "Make Static Method";
  }
}
const PI = 3.14; // Constant
let a = 1; // Variable
let str = `${PI} and ${a}`; // template string
console.log(`a
**list
${str}
**file`);

let calVol = (a, b, c) => {
  let volume = a * b * c;
  return volume;
};
let result = calVol(3, 2, 4);
console.log(result);

let animal = new Animal("lion");
let lionKing = new Lion("Andy");

console.log(animal.getName());
console.log(typeof Animal);
console.log(lionKing instanceof Animal);
console.log(lionKing.getName());
console.log(exStatic.getName());

// Destructuring

const obj = {
  name: "LJS",
  age: "31",
  affiliaton: "KU",
};
let { name, age, affiliaton, test = 5 } = obj;
console.log(name, age, affiliaton, test);

// Speard & Rest Operator
const data1 = [1, 2];
const data2 = [3, 4];
const data3 = [...data1, ...data2];
function testSpread(a, b, c, d) {
  return a + b + c + d;
}
function testRest(a, ...rest) {
  return rest;
}
console.log("Spread :", testSpread(...data3));
console.log("Rest :", testRest(...data3));

// for.. of loop

const keys = Object.keys(obj);
for (let key of keys) {
  console.log(key, obj[key]);
}

const afunc = {
  func() {
    console.log("new function");
  },
  _name: "afunc",
  get name() {
    return this._name;
  },
  set name(name){
    this._name = name;
  }
};

afunc.name = "new bfunc";
if (debug == true){
  console.log(afunc.name);
}

// javascript는 특정 코드의 연산이 끝날 때까지 기다리지 않고 다음 코드를 먼저 실행함(비동기 처리)
// 순차적 실행을 보장하기 위해  async - await 사용

async function async_test() {

  let promise = new Promise((resolve, reject) => {
    if(debug == true){
    setTimeout(()=> resolve("done"), 1000)  // 1초 뒤에 할당된 function 실행
    }

  });

  const result = await promise;
  console.log(result);
}

async_test();
console.log("Async test : Come up before async_test are completed")

// async function logfetch(url){
//   try{
//     const response = await fetch(url);
//     console.log(await response.test());
//   }
//   catch (err) {
//     console.log('fetch failed', err);
//   }
// }
