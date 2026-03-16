---
title: <SpringBoot>Ioc란 무엇인가?
description: SpringBoot의 ioc에 대해서 알아보자
---

스프링 부트를 알기 전에 용어부터 먼저 정리해보자

## 1. IOC(Inversion of Control)란 무엇인가?
공식문서에서는 IOC를 **객체의 생성, 설정, 생명주기 관리의 제어권이 개발자가 아닌 '컨테이너(Container)'로 넘어간 것** 이라고 정의합니다.

- 기존방식 (개발자가 제어):
개발자가 필요한 객체를 코드 내에서 직접 `new`연산자로 생성하고 의존성을 연결합니다.

이렇게 이야기 하면 잘 이해가 안될수도 있겠죠?
일단은 저희는 `pirvate`와 `public`로 나눌 예정입니다. "이것은 공개 범위"를 뜻합니다.
- `private` = "사장님 전용 창고"
- `public` = "가게 정문" 
이라고 생각하시면 편할것 같습니다.



```java
public class CoffeeShop {
	// 1. 가게 창고 (private = 사장님 전용 공간)
    private CoffeeBeans myStock;
    
    public CoffeeShop() {
    	//2. 직접 만든다 (new 연산자)
        // 사장님이 직접 "케냐 원두"를 생성해서 창고에 넣음.
        // 문제점: 만약 "에티오피아 원두"로 바꾸려면 여기 코드를 뜯어 고쳐야 함.
        myStock = new kenyBeans();
    }
}
```


- IoC방식(스프링이 제어):
객체 생성을 개발자가 하지 않습니다. 대신 **스프링 컨테이너**가 객체를 생성하고, 필요한 곳에 넣어줍니다.
```java
public class CoffeeShop {

	// 1. 가게 창고 (private = 내공간, 아직 비어 있음)
    private CoffeeBeans myStock;
    
    // 2. 가게 뒷문 (public 생성자 = 외부에서 들어오는 통로)
    // 'deliveredBeans'는 스프링(배달기사)가 밖에서 들고 온 원두 입니다.
    public CoffeeShop(CoffeeBeans deliveredBeans) {
    
    	// 3. 주입 (Injection)
        // "배달 받은 원두(deliveredBeans)"를 "내 창고(myStock)"에 채워 넣음
        this.myStock = deliveredBeans;
    }
}
```

- `deliverdBenas`는 매개 변수(Parameter)라고 부릅니다.
    - 역활: 외부에서 이 가게(객체)를 만들 때, 잠깐 전달받는 짐 입니다.
    
비교를 해보면
**일반 자바**
```java
public CoffeeShop(new 원두());
```
개발자가 직접 코드를 짤 때 `new`를 붙여 괄호 안에 넣어줍니다.

</br>

**but 스프링(IoC)**
스프링 컨테이너(Spring Container)라는 녀석이 알아서 원두 객체를 만든 다음, 이 가게를 오픈할 때 쓱 밀어 넣어줍니다. (그래서 "주입Injection 받았다고 작성을 하였습니다.)


</br>
</br>

이번에는 `this`부분에 대해 알아보면
```java
this.myStock = deliveredBeans;
```

**"나의(this) 선반(myStock)에다가 = 방금 배달 받은 택배(deliveredBeans)를 넣으세요."**

- `this.myStock`: 나(객체)의 멤버 변수 myStock을 뜻합니다.
- `deliveredBenas`: 외부에서 전달받은 지역변수를 뜻합니다.
- 만약`this`가 없다면? 컴퓨터는 "어느 게 내 선반이고 어느 게 택배인지"헷갈릴수 있습니다. 그래서 이건 내거야 라고 명확히 찍어주는 게 `this` 입니다.



        

> "내가 사용할 객체를 내가 만들지 않는다. 대신 누군가가 만들어서 나에게 준다."

---

## 2. 스프링 IoC 컨테이너(The Spring IoC Container)
스프링 프레임워크의 핵심은 바로 이 '누군가' 역활을 하는 **Ioc 컨테이너** 입니다.
`ApplicationContext`인터페이스가 바로 이 IoC 컨테이너를 나타낸다고 설명합니다.

단계별 동작 원리

1. 설정 메타데이터 읽기(Configuration Metadata)
컨테이너는 먼저 "어떤 객체를 만들고 어떻게 연결할지"에 대한 설계도를 읽습니다.
과거에는 XML을 사용했지만, Spring Boot에서는 주로 **Java 클래스**나 **어노테이션**을 사용합니다.


2. 빈(Bean) 생성 및 등록
컨테이너가 설계도를 보고 객체를 생성합니다.
이렇게 스프링 컨테이너가 관리하는 객체를 **빈(Bean)**이라고 부릅니다.


3. 의존성 주입(DI, Dependency Injection)
생성된 빈들 사이의 관계(의존성)를 컨테이너가 자동으로 연결해줍니다.


## 3. 의존성 주입(DI: Dependency Injection)
DI(Dependency Injection)를 IoC를 구현하는 특정한 패턴이라고 설명합니다.
컨테이너가 빈을 관리하는 가장 중요한 과정입니다.


**스프링이 권장하는 DI 방식: 생성자 주입(Constructor Injection)**
Spring Boot 공식 문서는 **생성자 주입** 방식을 강력하게 권장합니다.

```java
@Service //1. 이 클래스를 빈으로 등록해줘 (설정 메타데이터)
public class OrderService {

	private final MemberRepository memberRepository;
    
    // 2. 생성자 주입: 스프링이 MemberRepository 빈을 찾아서 여기에 넣어줌
    public OrderService(MemberRepository memberRepository) {
    	this.memberRepository = memberRepository;
    }
}
```
왜 생성자 주입인가?
- 불변성(Immutability): 객체가 생성될 때 딱 한 번만 의존성이 주입되므로, 중간에 바뀔 염려가 없습니다.(`final` 키워드 사용 가능).
- 테스트 용이성: 순수 자바 코드로 단위 테스트를 작성할 때, 개발자가 직접 객체를 생성해서 넣어줄 수 있습니다.


## 4. Spring Boot에서의 IoC 자동화
Spring Framework만 쓸 때는 빈 설정을 일일이 해줘야 했지만, Spring Boot는 이 과정을 획기적으로 줄여줍니다.

@SpringBootApplication의 마법
Spring Boot 프로젝트를 만들면 메인 클래스에 `@SpringBootApplication`어노테이션이 붙습니다.
이 어노테이션은 다음 세 가지를 포함하여 IoC 컨테이너를 자동으로 구성합니다.

1. @**ComponentScan**: 현재 패키지와 그 하위 패키지를 다 뒤져서 `@Component`, `@Service`, `@Repository`, `@Controller`가 붙은 클래스를 찾습니다.

2. **@EnableAutoConfiguration**: 스프링 부트가 클래스패스(라이브러리 등)를 보고, " 아, 지금 웹 서버가 필요하구나", "DB 연결이 필요하구나" 라고 추측하여 필요한 빈들을 자동으로 IoC 컨테이너에 등록해줍니다.

3. **@Configuration**: 이 클래스 자체가 설정 파일임을 명시합니다.


---

1. 앱 실행: Spring Boot 애플리케이션(`SpringApplication.run`)이 시작 됩니다.
2. 컨테이너 생성: `ApplicationContext`(IoC 컨테이너)가 생성됩니다.
3. 스캔: 컨테이너가 `@ConponentScan`을 통해 `@Service`, `@Controller`등이 붙은 클래스들을 찾습니다.
4. 빈 생성 (IoC): 찾은 클래스들의 객체(Bean)를 컨테이너가 직접 생성합니다.
5. 의존성 주입(DI): 생성된 빈들끼리 서로 필요한 관계(예: Controller 가 Service를 필요로 함)를 생성자를 통해 연결해줍니다.
6. 사용: 개발자는 이미 모든 연결이 완료된 객체를 가져다가 비즈니스 로직만 수행하면 됩니다.