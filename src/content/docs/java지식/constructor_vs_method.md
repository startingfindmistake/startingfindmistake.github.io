---
title: <Java> 생성자(Constructor) vs 메서드(Method)
description: 생정자(constructor)와 메서드(Method)에 대해 알아보자
---

### 1. 생성자(Constructor)
* used in the creation of an object taht is an instance of a class
생성자는 클래스의 인스턴스인 객체를 생성할 때 사용되는 것

#### Function
* Name rule: 생성자의 이름은 반드시 자신이 속한 클래스의 단순 이름(Simple name)과 동일해야 합니다.
* 반환타입(Return Type)없음: "생성자 선언은 결과(반환값)이 없는 메서드 선언 처럼 보인다" 고 명시합니다.
결과 값이 없다는 뜻의 `void` 조차 적지 않습니다.
* 맴버가 아님: "생성자는 클래스의 멤버(member)가 아니다" 라고 명확히 규정되어 있습니다.
멤버가 아니기 때문에 부모 클래스에서 자식 클래스로 상속(Inherit)되지 않습니다.


</br>
</br>

### 2. 메서드(Method)
* declares executable code that can be invoked
호출할 수 있는 실행 가능한 코드를 선언한 것

#### Functional
* 고유한 이름 지정: 메서드는 기능을 나타내는 고유한 이름을 자유롭게 가질 수 있습니다.
* 반환타입(Return Type)필수 : 메서드는 실행이 끝난 후 어떤 타입의 결과를 반환할지(Result)를 반드시 명시해야 합니다.
만약 반환할 값이 없다면, 반드시 `void` 라는 키워드를 명시해야 합니다.
* 클래스의 멤버임: 생성자와 달리 메서드는 클래스의 '멤버'에 속합니다.
따라서 접근 제어자에 따라 자식 클래스로 상속되거나, 기능을 덮어쓰는 재정의(Overriding)이 가능합니다.

| 구분 | 생성자(Constructor) | 메서드(Method) |
| ----| -------------------|---------------|
|공식 목적| 객체(인스턴스)의 생성| 실행 가능한 코드의 호출|
|이름 규칙| 반드시 클래스 이름과 동일해야 함| 자유롭게 명명 가능|
|반환 타입(Return Type)| 없음(`void`도 적지 않음) | 필수(값이 없으면 `void` 명시)|
| 클래스 멤버 여부| 멤버가 아님(상속 불가)| 멤버임(상속 및 재정의 가능)|



</br>
</br>


---


### Class 클래스란?

>_"A class is the blueprint from which individual objects are created."_
클래스는 개별 **객체(Object)**가 생성되는 청사진(Blueprint)** 입니다.

세상에는 수많은 자전거가 있지만, 모든 자전거는 '현재 기어', '현재 속도' 같은 상태를 가지고 있고 '브레이크 밟기', '페달 밟기' 같은 동작을 합니다.
이 공통된 설계도를 자바에서는 '클래스'라고 부릅니다.

>_"A class declaration specifies a new named reference type."_
클래스 선언은 새로운 이름이 부여된 **참조 타입(Reference Type)**을 정의합니다.

우리는 흔히 아는 `int`, `double` 같은 기본 타입(Primitive Type) 외에,
개발자가 자신만의 새로운 데이터 복합체(타입)를 창조해 내는 공간이 바로 클래스 입니다.
그중 하나의 예가 `StringBuilder` 역시 자바 개발자들이 만들어둔 하나의 '클래스(참조 타입)'입니다.

* 멤버(Members): 클래스에 소속된 핵심 요소입니다.
    * 필드(Fields): 객체의 '상태(State)'나 데이터를 저장하는 변수입니다.
    * 메서드(Methods): 앞서 보셨던 `reverse()`처럼 객체의 '동작(Behavior)'을 정의하는 실행 가능한 코드입니다.
    
* 생성자(Constructors): 클래스를 기반으로 실제 객체(인스턴스)를 만들어 낼 때 초기화를 담당합니다.
(공식 문서상 생성자는 클래스 내부에 작성되지만 '멤버'로 취급되지는 않습니다.)




> _"A class may be declared to be a direct extension of another class type..."_
클래스는 다른 클래스 타입의 직접적인 확장(상속)으로 선언될 수 있습니다.


자바의 모든 클래스는 `Object`라는 최상위 클래스를 제외하고는,
단 하나의 모두 클래스(Superclass)를 상속(extends)받아 기존 클래스의 멤버(필드와 메서드)를 물려받을 수 있도록 설계되어 있습니다.



---

### 객체란 무엇인가?

자바 공식 듀토리얼에서는 소프트웨어 객체를 현실 세계의 사물에 빗대어 설명합니다.

>* **상태(State)와 동작(Behavior):**
"_Software objects are conceptually similar to real-world objects: they too consist of state and related behavior._"
(소프트웨어 객체는 개념적으로 현실 세계의 객체와 유사합니다. 소프트웨어 객체 역시 **상태(State)**와 그에 관련된 **동작(behavior)**으로 구성됩니다.
>
>
>* **필드와 메서드로 구현**
"_An object stores its state in fields and exposes its behavior through methods._"
(객체는 자신의 상태를 **필드(Fields)**에 저장하고, **메서드(Methods)**를 통해 자신의 동작을 외부로 드러냅니다.)

즉, 듀토리얼에서는 객체를 **데이터(필드)**와 그 데이터를 조작하는 **코드(메서드)**를 하나로 묶어놓은 소프트웨어 단위'로 정의하고 있습니다.

</br>
</br>

자바 언어명세서(JLS 4.3.1)

>* **인스턴스와 배열**
"_An object is a class instance or an array._"
(객체는 **클래스의 인스턴스(Instance)**이거나 **배열(Array)**입니다.)
>
> 자바 언어명세서에 따르면 객체란 앞서 배운 '클래스(설계도)'를 바탕으로 메모리상에 실제로 생성된 실체(인스턴스)를 뜻합니다.
또한 Java에서는 `int[]` 같은 배열도 단순한 데이터 나열이 아니라 하나의 완벽한 '객체'로 취급한다고 명확히 규정하고 있습니다.
>
>
>* **객체의 생성 방식**
"_A new class instance is explicitly created when evaluation of a class instance creation expression causes a class to be instantiated."_
(새로운 클래스 인스턴스는 클래스 인스턴스 생성 표현식(예:`new`키워드)가 평가되어 클래스가 인스턴스화될 때 명시적으로 생성됩니다.)
>
> 우리가 `new Scanner(system.in)`라고 코드를 작성했을 때, `new`라는 키워드가 바로 클래스(설계도)를 바탕으로 메모리 공간에 새로운 객체(실체)를 뚝딱 만들어내는 역활을 합니다
>
> * **참조(Reference)를 통한 접근**
_"The reference values are pointers to these objects..."_
(참조 값은 이러한 객체들을 가리키는 포인터 입니다.)
>
> 자바에서 만들어진 객체는 메모리 어딘가에 존재하게 되며, 우리는 변수(예 `sb1`)에 그 객체가 있는 메모리의 주소(참조 값)을 저장하여 객체를 조정하게 됩니다.

**객체란 클래스라는 설계도를 바탕으로 `new`연산자를 통해 메모리에 실제 생성된 실체(인스턴스)이며, 자신만의 고유한 데이터(필드)와 기능(메서드)을 가진 덩어리"**라고 정의할 수 있습니다.

| 개념 | 공식 문서 정의(JLS & Oracle Tutorial) | 역활 및 특징 | 이름 규칙 및 반환 | 클래스 멤버 여부 | 예시 |
|---|----|------|-----|----|-----|
|Class(클래스)| 개별 객체(Object)가 생성되는 청사진(Blueprint)이자 새로운 참조 타입(Reference Type)| 객체의 상태(필드)와 동작(메서드)을 하나로 묶어 정의하는 설계도 | (사용자 정의 이름) | N/A | `StringBuilder`그 자체|
|Object(객체) | 상태(State)와 동작(Behavior)으로 구성된 **클래스의 인스턴스(Instance)** | `new` 연산자를 통해 메모리에 명시적으로 생성된 실제 실체| N/A | N/A | `new StringBuilder()`를 통해 메모리에 생성된 실제 결과물|
|Constructor(생성자)| 클래스의 인스턴스인 객체를 생성할 때 사용되는 요소| 생성 시 객체의 초기 상태를 설정하는 역활| **이름**: 반드시 클래스 이름과 동일 </br> 	**반환타입**: 없음(`void`도 적지 않음) | 아님(상속 불가) | `StringBuilder()` |
|Method(메서드)| 객체를 통해 호출할 수 있는 **실행 가능한 코드(Executable code)** | 객체의 구체적인 동작(Behavior)을 수행하는 역활 | **이름**: 자유롭게 지정 </br> **반환 타입**: 필수(값이 없으면 `void` 명시) | 맞음(상속 및 오버라이딩 가능)| `append()`, `reverse()`, `toString()` 등 |


</br>
</br>


|개념| StringBuilder에서의 실제 모습 | 설명
|---|--------|---------|
class(클래스)| `StringBuilder` 그 자체| 자바 개발자들이 미리 만들어둔 **문자열을 자유롭게 조작 할 수 있는 기계의 설계도(청사진)**' 입니다.</br> (`java.lang` 패키지 안에 정의되어 있습니다.)|
|Constructor(생성자) | `StringBuilder()` </br> `StringBuilder(String str)` 등 | 설계도를 바탕으로 실제 기계를 뚝딱 만들어 내는 **'생성자'** 입니다. 클래스 이름과 완전히 똑같고, `new` 키워드와 함께 쓰여 객체를 탄생시킵니다.|
|Method(메서드)| `append()`, `reverse()`, `toString()` 등| 만들어진 기계(객체)에 달려있는 조작 버튼, 즉 **'실행 가능한 기능'** 입니다. 각각 고유한 이름이 있고, 어떤 결과를 반환할지(Return Type)이 명시되어 있는 클래스의 멤버 입니다.|
|Object(객체)| `new StringBuilder()`를 통해 메모리에 생성된 실제 결과물 | 코드를 실행했을 때 ㅁ모리상에 명시적으로 생성된 **'클래스의 인스턴스(실체)'** 입니다.|

</br>
</br>

---

### 공식 문서 찾아보는 방법
공식 API 문서에서 `StringBuilder`를 검색해 보면 문서 최상단에 다음과 같은 **클래스 선언부(Class Declaration)**이 나옵니다.

> public final class StringBuilder extends Object implements Serializable, Comparable<StringBuilder>, CharSequence
  
  
**Constructor (생성자)**
스크롤을 내려 'Constructor Summary(생성자 요약)' 섹션을 보면 다음 항목들이 나열되어 있습니다.
  * `StringBuilder()`: Constructs a string builder with no characters in it...
  * `StringBuilder(String str)`: Constructs a string builder initialized to the contents of the specified string.

공식문서에서 정확히 'Constructor'카테고리로 분류하고 있습니다.
반환 타입(Return Type)이 적혀있지 않고, 이름이 클래스 이름과 완벽히 동일하므로 객체를 만들어내는 생성자가 맞습니다.
  

  
**Method(메서드)**
'Method Summary(메서드 요약)' 섹션을 보면 수많은 기능들이 나열되어 있습니다.
  * `StringBuilder append(String str)`: Appends the specified string to this character sequence.
 * `StringBuilder reverse()`: Causes this character sequence to be replaced by the reverse of the sequence.
* `String toString()`: Returns a string representing the data in this sequence.
  
공식 문서에서 정확히 'Method' 카테고리로 분류하고 있습니다.
표를 보면 `append`나 `reverse`라는 고유한 이름 앞이나 옆에 `StringBuilder`나 `String` 같은 **반환 타입(Return Type)**이 명시되어 있습니다. 따라서 이들은 생성된 객체가 수행하는 메서드가 맞습니다.
  
**Object(객체)검증**
자바 언어 명세서(JLs 15.9 Class Instance Creation Expressions)에서는 `new` 키워드의 역활을 다음과 같이 정의합니다.
  
>"A class instance creation expression is used to create new objects that are instances of classes."
  (클래스 인스턴스 생성 표현식(`new`키워드)은 클래스의 인스턴스인 **새로운 객체(objects)**를 생성하는 데 사용된다.)

코드에서 작성하는 `new StringBuilder()`라는 표현식 자체가 JLS의 규칙에 따라 메모리상에 **새로운 객체(Object)**를 만들어내는 행위임이 공식적으로 증명됩니다.
