---
title: <데이터베이스>배타적 관계(Mutually Exclusive Relationship)
description: 데이터베이스 에서 배타적 관계에 대해서 알아보자
---

이 포스팅은 10분만 투자한다면 데이터베이스 설계에서 배타적 관계에 대해서 간다하게 알수 있습니다.

> 1. 배타적 관계의 기본 개념
> 2. 데이터베이스모델링에서 배타적 관계를 어떻게 찾을까?
> 3. 단계별 설계 및 구현 방법


## 1. 배타적 관계의 기본 개념
---
배타적 관계란 **하나의 엔티티가 여러 다른 엔티티 중 오직 '하나'와만 관계를 맺을 수 있는 상태**를 뜻합니다.
논리적 회로의 XOR(Exclusive OR)와 같습니다.

* example: '결제(Payment)' 테이블을 설계한다고 가정해 봅시다. 사용자는 신용카드, 계좌이체, 포인트 중 하나의 수단으로만 결제할 수 있습니다. 즉, 하나의 결제 건은 세 가지 결제 수단 중 오직 하나와만 배타적 관계를 가집니다. 신용카드이면서 동시에 계좌이체일 수는 없습니다.



## 2. 데이터베이스모델링에서 배타적 관계를 어떻게 찾을까?
* 물리적 테이블 스키마(DDL)에서 제약 조건(Constraint)찾기
    * 다중 외래 키와 CHECK 제약 조건 검색: 한 테이블에 성격이 비슷한 외래 키(FK)가 여러 개 존재하면서 모두 `NULL`을 허용(`NULLABLE`)하는지 확인합니다.
    * **상호 배타적 로직 확인**: 테이블의 제약 조건 목록을 조회했을 때, 특정 외래 키들 중 **오직 하나만 NOT NULL이어야 한다**는 형태의 `CHECK` 제약 조건이 걸려 있다면 이는 아크(Arc)패턴으로 구현된 배타적 관계입니다.

* 테이블 간의 1:1 관계 및 구분자(Discriminator) 컬럼 분석
    * 구분자(Discriminator)컬럼 찾기: 공통 정보를 담은 부모 테이블에 `type_code`, `category`, `kind` 등 과 같은 상태 값 컬럼이 존재하는지 확인합니다.
    * 자식 테이블과의 1:1 외래 키 매핑 검사: 부모 테이블의 기본 키(PK)를 자식 테이블들이 기본 키이자 외래 키(PK/FK)로 그대로 받아오고 있는지 확인합니다.

예를들어
1. 두 개 이상의 외래키(FK)가 하나의 테이블에 공존함
2. 외래키 컬럼들이 모두 `NULL`을 허용함

|id(토큰 PK)| mentor_id | mentee_id | token_value|
|----|-----|-----|-----|
|1 | 5(멘토 A) | `NULL` | eyJhbG...|
|2 | `NULL` | 12(멘티 B)| eyJpc3...|
|3 | 8(멘토 C) | `NULL` | eyJLeH...|

이테이블을 보면
하나의 레코드(행)이 두 개의 부모(멘토, 멘티)중 오직 하나하고만 관계를 맺어야 하고,
나머지는 반드시 비워져야(NULL)하는 상태 입니다.

데이터베이스 모델링 이론에서는 여러 부모 엔티티 중 하나만 선택적으로 참조하는 이 구조와,
그중에서도 반드시 하나의 값을 가져야 하고 나머지는 배척(NULL)하는 특성을 **배타적(Exclusive)아크** 라고 명명합니다.





## 3. 단계별 설계 및 구현 방법
데이터베이스에서 이를 구현하는 가장 대표적인 두 가지 패턴을 알아봅시다.

**방법 A: Arc 관계(다중 외래 키 + CHECK 제약 조건)**
Oracle 데이터 모델러에서는 이 배타적 관계를 공식적으로 Arc(아크) 라고 부릅니다.
1. 컬럼 추가: 자식 테이블(예) 결제)에 연결될 수 있는 모든 부모 테이블(카드, 계좌, 포인트)의 외래 키 (Foreign Key) 컬럼을 각가 만듭니다.
2. Null 허용: 어떤 수단이 쓰일지 모르므로, 이 외래 키 컬럼들은 모두 `NULL`을 허용(`NULLable`) 하도록 설정합니다.
3. CHECK 제약 조건 강제: 데이터베이스의 `CHECK` 제약 조건을 활용해 **"여러 외래 키 중 단 1개만 값이 존재해야 하고(NOT NULL), 나머지는 모두 NULL이어야 한다"**는 규칙을 강제합니다.

**PostgreSQL 구현 방식**: PostgreSQL은 공식적으로 `num_nonnulls`라는 함수를 제공하여 이를 처리합니다.
```sql
ALTER TABLE Payment
ADD CONSTRAINT arc_payment_method
CHECK (num_nonnulls(credit_card_id, bank_transfer_id, point_id) = 1);
```

**Oracle / 표준 SQL 구현 방식**
```sql
ALTER TABLE Payment
ADD CONSTRAINT arc_payment_method
CHECK (
    (credit_card_id IS NOT NULL AND bank_transfer_id IS NULL AND point_id IS NULL) OR
    (credit_card_id IS NULL AND bank_transfer_id IS NOT NULL AND point_id IS NULL) OR
  (credit_card_id IS NULL AND bank_transfer_id IS NULL AND point_id IS NOT NULL)
);
```

배타적 관계를 피하기 위해서
**슈퍼타입/서브타입 (Supertype/Subtype) 상속 패턴**
1. 슈퍼타입 생성: 공통 속성(결제 금액, 결제 일 시 등)을 모아 '결제(슈퍼타입)' 테이블을 만듭니다.
2. 서브타입 생성: 개별 속성을 가진 '신용카드 결제', '계좌이체 결제' 테이블(서브타입)을 각각 만듭니다.
3. 기본키 겸 외래키 매핑: 서브타입 테이블의 기본 키(PK)가 동시에 슈퍼타입 테이블을 참조하는 외래키(FK)가 되도록 1:1관계를 맺어 논리적으로 분리합니다.

<br />
<br />

참고 문헌
> * [Oracle SQL Developer Data Modeler User's Guide](https://docs.oracle.com/en/database/oracle/sql-developer-data-modeler/19.2/dmdug/data-modeler-dialogs.html)
