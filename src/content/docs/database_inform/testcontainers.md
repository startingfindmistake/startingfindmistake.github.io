---
title: <데이터베이스>Testcontainers 이건 또 어떤 거야?
description: Testconatiners에 대해 간단하게 살펴보자
---


이 포스팅은 Testcontainers에 대해 간단하게 알아보는 글입니다. 처음 Testcontainers에 대해 궁금하시다면  지금 바로 들어갑시다.

>1. TestContainers를 배우기 전 필요한 사전 지식
>2. Testcontainers란 무엇인가?
>3. Testcontainers의 동작 원리(Life Cycle)


## 1. Testconatiners를 배우기 전 필요한 사전 지식
---
이 도구를 온전히 이해하고 적극적으로 활요하기 위해서는 다음 두 가지 지식을 알고 가시면 쉽게 접근할수 있습니다.
* **Docker(도커)기초**
Testcontainers는 내부적으로 Docker를 좆가하는 라이브러리 입니다. 컨테이너(Container), 이미지(image), 포트 포워딩(Port Forwarding), 환경변수 (Environment Variables)에 대해 무엇인지 이해할 필요가 있습니다.

* **통합 테스트(Integration Test)개념**
데이터 베이스, 메시지 큐(kafka, RabbitMQ등)와 같은 외부 시스템과 내 애플리케이션이 잘 연동되는지 확인하는 테스트에 대한 이해가 필요합니다.(Junit같은 테스트 프레임워크 사용법도 포함됩니다.)
---

## 2. Testcontainers란 무엇인가?
공식 문서에 따르면 Testcontainers는 Docker 컨테이너에 의존하는 통합 테스트를 지원하는 오픈소스 라이브러리 입니다.

기존에는 통합 테스트를 할대 다음과 같은 문제가 있었습니다.

1. **H2 같은 인메모리 DB 사용**
    실제 운영 환경(MySQL, PostgreSQL)과 미묘하게 동작이 달라 버그를 놓칠수 있습니다.

2. **로컬에 직접 DB 설치**
    개발자마다 로컬 환경이 달라 "제 PC에서는 되는데요?" 같은 문제가 발생합니다.

3. **공용 테스트 DB 사용**
여러 개발자나 CI 서버가 동시에 테스트를 돌리면 데이터 충돌이 발생합니다.

**Testcontainers의 해결책**
테스트 코드가 실행될 때, 코드를 통해 Docker에게 "PostgreSQL 컨테이너 하나 띄워줘" 라고 명령합니다.
테스트가 끝나면 띄웠던 컨테이너를 깔끔하게 삭제합니다.
즉, 외부 의존성을 Mocking(가짝 객체)하지 않고,
"진짜" 시스템을 일회용으로 띄워서 테스트하는 완벽히 독립적이고 재현 가능한 환경을 제공합니다.

<br />
<br />

## 3.Testcontainers의 동작 원리(Life Cycle)
---
테스트 코드를 실행했을 때 내부적으로 일어나는 과정은 다음과 같습니다.

1. **Docker 데몬 연결**
Testcontainers 라이브러리가 로컬(또는 CI 환경)에 실행 중인 Docker 데몬(Docker Engine)과 통신을 시작합니다.

2. **Ryuk 컨테이너 실행**
Testcontainers는 가정 먼저 **Ryuk(류크)** 라는 이름의 숨겨진 컨테이너를 띄웁니다. 이 컨테이너의 유일한 목적은 "가비지 컬렉션(Garbage Collection)" 입니다.
텍스트가 성공하든, 실패하든, 심지어 강제로 종료되더라도 띄워진 컨테이너와 네트워크 자원들을 확실하게 정리(삭제)하는 역활을 합니다.

3. **요청한 컨테이너 실행 및 포트 매핑**:
테스트 코드에서 요청한 DB나 서비스(예: PostgreSQL)의 이미지를 Pull 받고 컨테이너를 실행합니다.
이때 포트는 무작위(Random)로 할당됩니다.
(예: 호스트의 5432 포트가 이미 사용 중이더라도 충돌하지 않게 32849 같은 랜덤 포트와 연결합니다.)

4. **Wait Strategy(대기 전략)**:
컨테이너가 실행되었다고 해서 내부에 있는 DB가 즉시 쿼리를 받을 수 있는 것은 아닙니다.
Testcontainers는 DB가 완전히 부팅되어 연결을 수락할 준비가 될 때까지 기다립니다.
(예: 특정 로그가 출력될 때까지 대기, 특정 포트가 열릴 때까지 대기)

5. **테스트 실행:**
애플리케이션이 이 랜덤 포트로 연결하여 테스트 로직을 수행합니다.

6. **자원 정리**:
테스트가 종료되면 Ryuk 컨테이너가 나서서 방금 사용한 컨테이너, 볼륨, 네트워클르 모두 삭제하고 자신도 종료됩니다.

<br />
<br />

## 4. 처음 사용자를 위한 단계별 가이드 (Java/Spring Boot Example)
---
Testconatiners는 Go, Node.js, Python 등 다양한 언어를 지원하지만, 가장 널리 사용되는 Java(Spring Boot)와 JUnit5를 기준으로 작성되었습니다.

#### 1step: 로컬 환경에서 Docker실행
Testcontainers는 Docker에 의존하므로, 컴퓨터에 Docker Desktop이나 Colima, OrbStack 등이 설치되어 있고 실행 중이어야 합니다.

<br />

#### 2step: 의존성(Dependency)추가
프로젝트 `build.gradle` (또는 pom.xml)에 라이브러리를 추가합니다.

```gradle
// Junit5를 위한 Testcontainers 코어
testImplementation 'org.testcontainers:junit-jupiter:1.19.3'
// 사용할 특정 모듈 (예: PostgreSQL)
testImplementation 'org.testcontainers:postgresql:1.19.3'
```
<br />

#### 3step: 테스크 코드 작성
가장 기본적인 통합 테스트 구조입니다.
```java
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@Testcontainers // Testcontainers 확장을 사용하겠다고 선언
class MyRepositoryIntegrationTest {

    // @Container: 이 컨테이너의 생명주기를 테스트 클래스와 맞춤
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine")
            .withDatabaseName("testdb")
            .withUsername("testuser")
            .withPassword("testpass");

    // Spring Boot 애플리케이션에 랜덤으로 할당된 DB 접속 정보를 동적으로 주입
    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    void testDatabaseConnection() {
        // 이 시점에는 실제 PostgreSQL 컨테이너가 띄워져 있고,
        // Spring Boot가 거기에 성공적으로 연결된 상태입니다.
        // 여기에 Repository 저장/조회 검증 로직을 작성합니다.
        System.out.println("컨테이너 DB URL: " + postgres.getJdbcUrl());
    }
}
```

* 