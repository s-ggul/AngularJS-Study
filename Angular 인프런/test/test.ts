/*
let num: number = 10;

// num.push(); // 코드 단에서 에러검출

function testing(): number {
  return 10;
}
*/

// export class AppComponent {}

// 클래스의 특징

class Parent {}

class App extends Parent {}

// 인터페이스 => 타입스크립트에서의 타입이라 봐도 무방하다

interface Person {
  name: string;
  age: number;
}

let kim: Person;

// 접근제한자
class Parent2 {
  public one: number = 10;
  protected two: number = 10;
  private three: number = 10;

  constructor() {
    this.one;
    this.two;
    this.three;
  }
}

class Child extends Parent2 {
  constructor() {
    super();

    this.one;
    this.two;
  }
}

let p = new Parent2();

p.one;

// 접근 제한자의 활용

// 1)
class Car1 {
  age: number = 0;
  constructor(age: number) {
    this.age = age;
  }
}

// 2)
class Car2 {
  constructor(public age: number) {}
}

/*
1번과 2번 모두 같은 코드이다. 
즉 1번에서 처럼 변수를 선언하고 생성자 내에서 할당작업이 이루어지는 내용을 2번 코드에서는 public 생성 제한자를 이용해 한번에 처리해줄 수 있다는 점을 알 수 있다.
 */

// 데코레이터
