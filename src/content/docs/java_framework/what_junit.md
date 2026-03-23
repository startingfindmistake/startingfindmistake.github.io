---
title: junit이거 뭔데?
description: junit에 대해서 알아보자
---

>**JUnit**은 자바(Java) 생태계에서 가장 널리 사용되는 **단위 테스트(Unit Testing)프레임워크**입니다.

이 포스팅은 15분⏱️정도 투자하시면 Junit에 대해서 간단하게 알아볼수 있습니다.

>1. JUnit은 왜 나왔을까?
>2. Junit의 현재
>3. Junit 핵심 개념
>4. 처음 Junit을 사용하려고 할때


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

<br />
<br />

## 처음 JUnit을 사용하려고 할때
---
import로 `junit`을 불러 오려고 한다면, 예를들어 `"The import org.junit cannot be resolved"`에러가 날 것이다.

### 🔍 오류의 근본 원인
Java 컴파일러는 코드 상단에 `import org.junit.jupiter.api...`를 만나면, 해당 패키지와 클래스가 프로젝트 내부나 연결된 외부 라이브러리(JAR 파일)에 존재하는지 찾습니다.
라이브러리를 찾지 못하면 "해당 경로를 해석(resolve)할 수 없다"며 컴파일 에러를 발생시킵니다.

JUnit 5 공식 문서에 다르면, JUnit 5는 단일 라이브러리가 아니라 여러 모듈의 조합으로 이루어져 있습니다.
* 코드를 작성하고 컴파일할 때는 `junit-jupiter-api`모듈이 필요합니다. (`@Test`, `@DisplayName`등이 여기에 포함됩니다.)
* 코드를 실행할 때는 `junit-jupiter-engine`모듈이 필요합니다.

>즉, 지금은 프로젝트 설정 파일(Maven, Gradle 등)에 이 `junit-jupiter-api` 의존성(Dependency)이 명시되어 있지 않거나, 선언했음에도 아직 다운로드되지 않아 컴파일러가 라이브러리를 찾지 못하고 있는 상태입니다.

### 🛠️ 해결 방법
이 에러를 해결하기 위해서는 사용하는 환경에 맞게 JUnit 5 라이브러리를 추가해 주면 됩니다.

* **Gradle 빌드 도구를 사용하는 경우(`build.gradle`)**. 
`dependencies`블록 안에 아래 코드가 있는지 확인하고 없으면 추가해 주세요.(추가 후 반드시 build gradle를 꼭 Reload 해서 변경 사항을 동기화해야 합니다)

```gradle
dependencies {
    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.10.0'
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.10.0'
}
```

<br />
<br />

* **Maven 빌드 도구를 사용하는 경우 (`pom.xml`)**. 
`<dependencies>` 태그 안에 아래 코드를 추가하고 Maven 설정을 다시 reload 해주세요.  
```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
</dependency>
```

<br />
<br />

* **빌드 도구 없이 순수 IDE(IntelliJ, Eclipse)만 사용하는 경우**
에러가 난 코드 (예)`@Test`)위에 마우스를 올리거나 클릭한 뒤, IDE가 제공하는 자동 수정 기능 (IntelliJ: `Alt + Enter`, Eclipse: `Ctrl + 1`)을 사용해 **"Add JUnit 5 to classpath"** 옵션을 선택하시면 IDE가 알아서 라이브러리를 추가해 줍니다.

<br />
<br />

* **VS Code 등 터미널에서 순수하게 `javac`와 `java`명령어로 직접 컴파일 할 경우**

VS Code의 "Extension Pack for Java"확장자를 설치한다, 즉 내 프로젝트 폴더 안에 Junit을 설치한다고 보면 된다.


1. 설치하기 위해서
JUnit 5의 다운로드 위치를 알아야 합니다.
Junit 5공식 문서의 Console Launcher 섹션을 보면은
_"An executable `junit-platform-console-standalone-<version>.jar` with all dependencies included is published in the **Maven Central repository...**"_
(tranlate: 모든 의존성이 포함된 실행 가능한 `junit-platform-console-standalone-<버전>.jar`파일은 **Maven Central 저장소**에 배포되어 있습니다.)

즉, 공식 문서에서는 **Maven Central**이라는 전 세계 표준 라이브러리 저장소에서 해당 파일을 다운로드하라고 안내합니다.

2. Maven Central 저장소의 URL 구조
자바 생태계에서 공식적으로 라이브러리르 배포하는 메인 서버 주소가 바로 `https://repo1.maven.org/maven2/` 입니다.
이곳의 파일 경로(URL)는 항상 정해진 규칙을 따릅니다.
* Group ID(그룹명): `org.junit.platform` ➡️ `org/junit/platform/`
* Artifact ID(프로젝트 명): `junit-platform-console-standalone`➡️ `junit-platform-console-standalone/`
* version(버전): `1.10.2` ➡️ `1.10.2/`
* 파일명: `junit-platform-console-standalone-1.10.2.jar`

<br />
<br />

* curl 사용시
```bash
curl -O https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/1.10.2/junit-platform-console-standalone-1.10.2.jar
```

* **wget 사용 시**
```bash
wget https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/1.10.2/junit-platform-console-standalone-1.10.2.jar
```

* **Windows (PowerShell)**
```powershell
Invoke-WebRequest -Uri "https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/1.10.2/junit-platform-console-standalone-1.10.2.jar" -OutFile "junit-platform-console-standalone-1.10.2.jar"
```




2. 프로젝트 폴더 안에 `lib`이라는 이름의 새 폴더를 만듭니다.

3. 다운로드한 `junit-platform-console-standalone-1.10.2.jar`파일을 `lib` 폴더에 안에 넣습니다.

4. VS Code 하단 탐색기(Explorer) 탭의 Java Projects 섹션에서 Referenced Libraries 옆의 `+` 버튼을 눌러 이 JAR 파일을 추가해 줍니다.

그러면 코드의 에러가 사라지는 것을 확인할수 있습니다.