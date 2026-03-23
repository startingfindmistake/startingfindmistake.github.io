---
title: junit이거 뭔데?
description: junit에 대해서 알아보자
---

>**JUnit**은 자바(Java) 생태계에서 가장 널리 사용되는 **단위 테스트(Unit Testing)프레임워크**입니다.

이 포스팅은 10분정도 투자하시면 Junit에 대해서 간단하게 알아볼수 있습니다.

>1. JUnit은 왜 나왔을까?
>2. Junit의 현재
>3. Junit 핵심 개념


## 1.JUnit은 왜 나왔을까?
---
과거의 자바 개발자들은 코드가 제대로 동작하는지 확인하기 위해 주로 `public static void main`메서드를 만들거나 `System.out.println()`을 사용해 결과값을 콘솔에 직접 출력하여 눈으로 확인했습니다.
하지만 여기에는 조금 아쉬운 부분이 많았습니다.
* **수동 검증**: 매번 눈으로 결과가 맞는지 확인해야 하므로 비효율적이고 실수가 발생하기 쉽습니다.
* **반복 불가**: 코드가 변경될 때마다 전체 시스템을 다시 수동으로 테스트하기가 매우 어렵습니다.

<br />
<br />

### 탄생비화
1997년, 객체 지향 프로그래밍의 선구자인 '켄트 벡(Kent Beck)'과 '에릭 감마(Erich Gamma)' 가 비행기 안에서 함께 자바용 테스트 프레임워크를 개발한 것이 JUnit의 시작입니다.
켄트 백이 스몰톡(Smalltalk)언어를 위해 만들었던 SUnit의 개념을 자바로 이식한 것입니다.

<br />
<br />

### 핵심 목적
* "개발 자가 스스로 작성한 코들르 자동화된 방식으로, 언제든 반복해서 테스트할 수 있게 하자."
* 테스트 코드 자체가 결과의 참/거짓을 판별하게 하여(자동화된 검증), 개발자가 코드 수정 시 발생할 수 있는 부작용(side Effect)을 즉각적으로 파악할 수 있게 만들었습니다.
이것은 훗날 **테스트 주도 개발(TDD)** 와 애자일(Agile)방법론의 든든한 기반이 되었습니다.

<br />
<br />
<br />

## 2. JUnit의 현재(2026.03.22): JUnit 5 아키텍처
현재(2026.03.22)공식 버전인 JUnit5는 이전 버전(Junit 4)과 달리 단일 라이브러리가 아니라 **세 가지 모듈의 결합**으로 이루어져 있습니다.

1. **JUnit Platform:** JVM에서 테스트 프레임워크를 실행하기 위한 기반(Foundation)입니다.
IDE(IntelliJ, Eclipse)나 빌드 툴(Maven, Gradle)이 테스트를 발견하고 실행할 수 있게 해주는 `TestEngine` API를 제공합니다.
2. **Junit Jupiter:** Junit 5에서 새로운 테스트를 작성하기 위한 프로그래밍 모델(어노테이션 등)과 확장 모델을 제공합니다. 우리가 흔히 작성하는 JUnit5 테스트 코드는 이 Jupiter API를 사용 합니다.
3. **JUnit Vintage:** 과거에 작성된 JUnit 3 및 JUnit 4 기반의 테스트 코드를 JUnit 5 플랫폼 위에서 실행할 수 있도록 하위 호환성을 제공하는 엔진 입니다.

<br />
<br />

## 3. JUnit 핵심 개념
---

**1step: 테스트 클래스와 메서드 정의하기 (`@Test`)**. 
JUnit의 가장 기본적인 단위는 테스트 메서드 입니다.
일반적인 자바 메서드 위에 `@Test` 어노테이션을 붙이면, JUnit엔진이 이를 '독립적으로 실행해야 할 테스트'로 인식합니다.
* 공식 문서에 따르면 테스트 클래스나 메서드는 반드시 `public`일 필요가 없습니다. (Package-private도 허용 됩니다.)

**2Step: 테스트 생명주기 관리 (Lifecycle Annotations)**
테스트를 실행하다 보면, 테스트 시작 전후로 데이터베이스를 연결/해제 하거나 초기 데이터를 세팅해야 할 때가 있습니다. 이를 위해 생명주기 어노테이션을 사용합니다.
* `@BeforeAll`: 해당 클래스의 모든 테스트가 실행되기 전 **단 한 번만** 실행 됩니다.(보통 무거운 자원 할당 시 사용)
* `@BeforeEach`: **각각의 `@Test`메서드** 가 실행되기 직전에 매번 실행됩니다. (테스트 환경 초기화)
* `@AfterEach`: 각각의 테스트가 종료된 직후에 매번 실행됩니다. (임시 데이터 정리)
* `@AfterAll`: 모든 테스트가 끝난 후 단 한 번만 실행됩니다.

**3step: 결과 검증하기 (Assertions)** 
테스트의 핵심은 "기대하는 값(Expected)"와 "실제 실행 결과(Actual)"가 일치하는지 단언(Assert)하는 것입니다.
`org.junit.jupiter.api.Assertions` 클래스에서 다양한 검증 메서드를 제공합니다.
* `assertEquals (expected, actual)`: 두 값이 같은지 확인합니다.
* `assertTrue(condition)`: 조건이 참인지 확인합니다.
* `assertNotNull(object)`: 객체가 Null이 아닌지 확인합니다.
* `assertThrows(Exception.class, executable)`: 특정 코드를 실행했을 때 기대한 예외(Exception)가 발생하는지 검증합니다.

**4step: 테스트 실행 조건 설정(Assumptions & 조건부 실행)**
테스트가 특정 환경에서만 실행되어야 할 때가 있습니다.
* **Assumptions (가정):** `assumeTrue()`등을 사용하여, 특정 조건이 맞을 때만 테스트를 진행하고, 조건이 틀리면 테스트를 '실패'가 아닌 '중단(Aborted/Ignored)' 처리합니다.
* **조건부 실행(Conditional Execution):** `@EnabledOnOs(OS, MAC)`, `@EnabledIfEnvironmentVariable`등을 사용하여 특정 운영체제나 자바 버전, 환경 변수에서만 테스트가 돌아가도록 설정할 수 있습니다.

**5step: 반복 및 파라미터화 테스트**  
동일한 로직을 여러 가지 다른 데이터로 테스트하고 싶을 때 사용합니다.
* `@ParameterizedTest`:하나의 테스트 메서드에 여러 개의 파라미터 셋(`@ValueSource`, `@CsvSource`등)을 주입하여, 데이터만 바꿔가며 수차례 테스트를 자동 실행합니다.
공식 문서에서 강력하게 추천하는 기능 중 하나 입니다.