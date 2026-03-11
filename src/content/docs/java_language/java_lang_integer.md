---
title: <Java> java.lang.Integer
description: java.lang.Integer에 대해 알아보자
---

### ParseInt() 메서드
* **클래스**: `java.lang.Integer`
* **메서드**: `public static int parseInt(String s) throws NumberFormatException`

**설명(Description)**
* 전달받은 문자열 인자(String argument)를 **부호 있는 10진수 정수(signed decimal integer)**로 구문 분석(파싱)합니다.
* 문자열에 포함된 문자들은 반드시 모두 **10진수 숫자(decimal digits)**여야 합니다.
단, 첫 번째 문자에 한하여 양수를 나타내는 ASCII 플러스 기호(`+`)나 음수를 나타내는 ASCII 마이너스 기호(`-`)가 올 수 있습니다.
* 구문 분석이 완료되면 변환된 기본형 정수값(`int`)을 반환합니다.

</br>

** 적용 방법**
* `Scanner.next()` 등을 통해 사용자로부터 입력받은 **글자 형태의 숫자(String)"**를,
실제 산술 연산(`+`, `-`, `*`, `/`)이나 대소 비교(`<` ,`>`)가 가능한, **진짜 숫자 데이터(int)**로 바꾸고자 할 때 호출 합니다.
* `Integer` 클래스의 정적(static)메서드이므로, `new Integer()` 처럼 객체를 새로 생성할 필요 없이 `Integer.parseInt("문자열")` 형태로 클래스에 직접 호출에서 사용합니다.

**적용 예시**
```java
String strNum = "437";

// 왼쪽(int C): C라는 변수는 int 타입의 순수 숫자 데이터를 담을 준비를 합니다.
// 오른쪽(Integer.parseInt(strNum)); 문자열 "437"을 진짜 정수 437로 변환하여 반환합니다.
int C = Integer.parseInt(strNum);
```

</br>
</br>
</br>




💎**주의 사항**
문자열로 숫자를 입력받은 뒤, 변환 과정을 생략하거나 부적절한 문자열을 변환하려고 하면 에러가 발생합니다.

```java
import java.util.Scanner;

public class Main {
	public static void main(String[] args){
    	Scanner sc = new Scanner(System.in);
        
        // Scanner 객체를 통해 문자열을 입력받는다. (예 "473" 또는 "437 ")
        String strNum = sc.next();
        
        //❌ 에러 발생 1: Type mismatch (타입 불일치)
        int A = strNum;
        
        //❌ 에러 발생 2: NumberFormatException (숫자 형식 예외)
        String badStr = "437a"; // 숫자 외의 문자가 포함됨
        int B = Integer.parseInt(badStr);
    }
}
```

1. **"Type mismatch: cannot convert from String to int" (타입 불일치)**
예를 들어 `StringBuilder`와 `String`의 관계처럼, 자바에서 텍스트 "437"과 숫자 `437` 은 완전히 다른 종류의 데이터 입니다.

* `String`은 문자가 나열된 '객체(Object)' 타입 입니다.
* `int`는 순수하게 숫자값만 가지는 '원시 타입(Primitive Type)'입니다. 따라서 `int A = strNum;` 처럼 직접 대입하려고 하면 컴파일러가 "문자열을 정수형 변수에 그냥 넣을 수는 없어!" 라며 에러를 뺕어냅니다.
이 장벽을 넘기 위해 `Integer.parseInt()` 라는 번역기가 필요한 것입니다.


</br>

2. **"java.lang.NumberFormatException"(숫자 형식 예외)**
`parseInt()`를 사용하더라도 무조건 성공하는 것은 아닙니다.
공식 문서의 메서드 시그니처를 보면 `throws NumberFormatException`이라고 명시되어 있는데, 이는 "숫자로 변환할 수 없는 예외 사항이 발생하면 이 에러를 던지겠다"는 뜻입니다.
* 공식 문서의 규칙중 **"문자열에 있는 문자들은 반드시 모두 10진수 숫자여야 합니다."** 라는 조건을 어겼기 때문에 발생합니다.
* 알파벳(예: `"437a"`), 특수문자, 심지어 **보이지 않는 공백(예: `"437 "`)** 이 하나라도 포함되어 있으면, `parseInt()` 메서드는 이를 완벽한 숫자로 번역하지 못하고 프로그램을 강제로 종료시켜 버립니다.