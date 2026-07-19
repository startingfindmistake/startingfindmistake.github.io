---
title: 간단 실습 PostGIS 기반 반경 검색 API 및 GeoJSON 시각화
description: PostGIS 기반 반경 검색 API 및 GeoJSON 시각화 실습
---




목표: PostGIS 공간 DB를 구축하고, 특정 좌표 반경 내의 데이터를 조회하여 웹 지도 시각화 툴(geojson.io)에 띄우기

* **📍 1단계: PostGIS 데이터베이스 환경 구성 (예상 소요시간: 1시간)**
  * `docker-compose.yml` 파일을 작성하여 `postgis/postgis`이미지를 활용한 컨테이너를 실행합니다.

DBeaver나 DataGrip 등의 DB 클라이언트로 접속하여, 공간 데이터를 다룰 수 있는 postgis 익스텐션이 DB 내에 정상적으로 활성화되었는지 확인합니다.

📍 2단계: Spring Boot 연동 및 공간 데이터 적재 (예상 소요시간: 1.5시간)
Spring Boot 프로젝트에 hibernate-spatial 라이브러리를 추가하여 JTS(JTS Topology Suite) 객체를 사용할 수 있게 세팅합니다.

위치 정보를 담을 Entity를 생성하고, 위도/경도를 저장할 필드 타입을 일반 Float이나 Double이 아닌 JTS의 Point 타입으로 지정합니다.

임의의 좌표 데이터(예: 근처 시설물이나 카페 위치 5~10개)를 JTS 객체로 가공하여 DB에 Insert 하는 초기화 로직을 작성합니다.

📍 3단계: 반경 검색 API 구현 및 결과 시각화 (예상 소요시간: 1.5시간)
Repository 계층에서 PostGIS의 핵심 공간 함수인 ST_DWithin(특정 반경 내 객체 검색)을 활용하여 "내 위치 기준 반경 N km 이내 데이터 조회" 로직을 구현합니다.

조회된 데이터를 프론트엔드가 요구하는 웹 표준 공간 포맷인 GeoJSON 규격의 텍스트로 변환하여 응답하는 REST API를 완성합니다.

Postman 등으로 API를 호출한 뒤, 응답받은 GeoJSON 텍스트를 별도의 프론트엔드 개발 없이 웹 시각화 툴인 geojson.io에 복사하고 붙여넣어, 지도 위에 마커가 정확히 표시되는지 눈으로 검증합니다.

#### 1.1 실습을 진행할 폴더를 하나 만듭니다

#### 1.2 해당 폴더 내에`docker-compose.yml` 파일 생성

공식 PostGIS 이미지를 사용하여 공간 함수가 미리 세팅된 데이터베이스를 띄우는 설정 입니다.

```yml
version: '3.8'

services:
  postgis:
    image: postgis/postgis:15-3.4
    container_name: postgis_server
    environment:
      POSTGRES_USER: my_user
      POSTGRES_PASSWORD: my_password
      POSTGRES_DB: spatial_db
    ports:
      - "5432:5432"
    volumes:
      - postgis_data:/var/lib/postgresql/data

volumes:
  postgis_data:

```

#### 1.3 컨테이너 실행

터미널을 열고 해당 폴더로 이동한 뒤, 아래 명령어를 입력하여 백그라운드에서 컨테이너를 실행합니다.  
그래야지 저희가 PostGIS이미지를 사용할수 있기 때문입니다.

```bash
docker-compose up -d
```

#### 1.4 DB연결하기

* Host: `localhost`

* Port: `5432`

* Database: `spatial_db`

* Username: `my_user`

* Password: `my_password`

#### 1.5 DB연결 확인 후 postgis version 확인

```sql
SELECT PostGIS_version();
```

#### opensource_spatial_01 이미지 삽입 필요

#### 2. Spring Boot 환경 설정하기

저는 Visual studio code를 사용하기 때문에

* `Cmd + shift+ p`를 눌러 명령 팔레트 open
* 기본값으로 설정하고 java version: 17로 설정
* Dependencies(의존성)선택: `Spring Web`, `Spring Data JPA`, `PostgreSQLDriver`,`Lombok` 총 4가지를 검색해서 체크 합니다.

#### 2.1 공간 데이터 전용 의존성 추가

* `build.gradle` 파일에서
* `dependencies { ... }` 블록안에 GIS 공간 전용 라이브러리를 수동으로 넣어줍니다.

```gradle
dependencies {
    // (기존에 추가된 의존성들...)
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    compileOnly 'org.projectlombok:lombok'
    runtimeOnly 'org.postgresql:postgresql'
    // 여기까지 기존 추가 의존성

    // Hibernate 공간 데이터 전용 라이브러리 추가
    implementation 'org.hibernate.orm:hibernate-spatial'
}

```

</br>
</br>

#### 2.2 application.yml 설정

데이터 베이스 연결 정보와 함께, Hibernate가 PostGIS 공간 함수를 인식할 수 있도록 **Dialect(방언)** 설정을 추가해야 합니다.

* `src/main/resources/` 경로에 있는 `application.properties` 파일을 우클릭하여 이름을 `application.yml` 로 변경 합니다. (계층 구조 보기가 더 편리합니다.)

`application.yml`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/spatial_db
    username: my_user
    password: my_password
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
        show_sql: true
```

#### 2.3 Entitiy 클래스 생성 (Facility.java)

위치 정보를 가질 엔티티를 만듭니다.  
여기서 위도/경도를 `double`이 아닌 공간 객체인 `Point` 타입으로 선언하는 것이 GIS 개발에 중요합니다.

`Facility.java`

```java
// package com.example.demo; // 본인의 패키지명에 맞게 유지해 주세요.

import jakarta.persistence.*;
// ★주의: 반드시 java.awt.Point가 아닌 아래의 JTS Point를 임포트해야 합니다!
import org.locationtech.jts.geom.Point; 

@Entity
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // 시설물 이름 (예: 강남역, 스타벅스 등)

    // 공간 데이터 타입 선언 (Point 객체, 좌표계 4326 = 일반적인 위경도 GPS 좌표계)
    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point location;

    // 기본 생성자
    public Facility() {}

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Point getLocation() { return location; }
    public void setLocation(Point location) { this.location = location; }
}
```

#### 2.4 Facility 테이블 생성 확인

spring Boot의 `ddl-auto: update` 설정으로 서버가 구동되면서 자동으로 테이블이 생성되었습니다.

PostgreSQL의 데이터베이스 구조상, 생성 테이블은 지정하신 `spatial_db` 내의 `public`스키마 안에 생성됩니다.

</br>

**SQL 쿼리로 직접 확인해보기**

```sql
SELECT * FROM facility;
```

* 결과 창에 `id`, `location`, `name` 컬럼을 가진 빈 표가 조회된다면 OK

</br>
</br>
</br>
이제 이 빈 테이블에 진짜 공간 데이터(위도, 경도)를 밀어 넣고, 특정 반경 내의 시설물을 검색하는 공간 쿼리

#### 3.1 FacilityRepository 인터페이스 생성

---
DB에 접근하고 PostGIS의 핵심 공간 함수인 `ST_DWithin`을 실행할 Repository를 만듭니다.

* `Facility.java`와 같은 패키지 경로에 `FacilityRepository.java` 인터페이스를 생성하고 아래 코드를 확인합니다.

```java
// package com.example.demo; // 본인의 패키지명을 유지해 주세요.

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

// [수정 1] class 가 아닌 interface 로 선언합니다.
public interface FacilityRepository extends JpaRepository<Facility, Long> {
    
    // [수정 2] \:\: 문법 대신 CAST( ~ AS geography ) 표준 문법을 사용하여 IDE 에러 표시를 없앱니다.
    @Query(value = "SELECT * FROM facility f WHERE ST_DWithin(CAST(f.location AS geography), CAST(ST_SetSRID(ST_MakePoint(:lon, :lat), 4326) AS geography), :radiusMeter)", nativeQuery = true)
    List<Facility> findFacilitiesWithinRadius(@Param("lon") double lon, @Param("lat") double lat, @Param("radiusMeter") double radiusMeter);
}
```

#### 3.2 테스트용 초기 공간 데이터 적재 (DataInit.java 생성)

API를 테스트하려면 DB에 위도와 경도를 가진 데이터가 있어야 합니다.  
서버가 켜질때 자동으로 테스트용 좌표(의정부 인근)을 JTS `Point` 객체로 변환하여 DB에 Insert 해주는 쵝화 클래스를 생성하겠습니다.

* 같은 패키지 경로에 `DataInit.java` 클래스를 만들고 아래 코드를 작성합니다.

```java
// package com.example.demo;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInit implements CommandLineRunner {

    private final FacilityRepository facilityRepository;

    public DataInit(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    @Override
    public void run(String... args) {
        // SRID 4326(위경도 좌표계)를 사용하는 Geometry(도형) 팩토리 생성
        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

        // 첫 번째 더미 데이터
        Facility f1 = new Facility();
        f1.setName("의정부역");
        // 주의: Coordinate 객체는 (경도 x, 위도 y) 순서로 파라미터를 넣어야 합니다.
        f1.setLocation(geometryFactory.createPoint(new Coordinate(127.0459, 37.7381)));

        // 두 번째 더미 데이터
        Facility f2 = new Facility();
        f2.setName("의정부 제일시장");
        f2.setLocation(geometryFactory.createPoint(new Coordinate(127.0505, 37.7398)));

        facilityRepository.save(f1);
        facilityRepository.save(f2);
        
        System.out.println("✅ 초기 공간 데이터 적재 완료!");
    }
}
```

결과값

```bash
plication in 3.052 seconds (process running for 3.407)

Hibernate: 

    insert 

    into

        facility

        (location, name) 

    values

        (?, ?)

Hibernate: 

    insert 

    into

        facility

        (location, name) 

    values

        (?, ?)

✅ 초기 공간 데이터 적재 완료
```

결과값을 확인해 보면 두 번의 `insert into facility` 로그는 앞서 작성한 더미 데이터(의정부역, 의정부 제일시장)가 JTS Point 객체로 변환되어 PostGIS 데이터베이스에 성공적으로 저장된것을 확인할수 있습니다.  

#### 3.3 반경 검색 API  및 GeoJSON 시각화

저장된 데이터를 바탕으로 " 특정 위치 기준 반경 N미터 이내의 시설"을 검색하고
이를 웹 지도에 띄울 수 있는 GeoJSON 형태로 반환하는 API를 만들어 봅시다

* `Facility.java` 가 있는 패키지 폴더에 `FacilityController.java` 파일을 생성하고 아래 코드를 작성합니다.

```java
// package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/facilities")
public class FacilityController {

    private final FacilityRepository facilityRepository;

    public FacilityController(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    @GetMapping("/search")
    public Map<String, Object> searchFacilities(
            @RequestParam double lon,
            @RequestParam double lat,
            @RequestParam double radius) {

        // 1. PostGIS 공간 쿼리(ST_DWithin)를 통해 반경 내 데이터 검색
        List<Facility> facilities = facilityRepository.findFacilitiesWithinRadius(lon, lat, radius);

        // 2. 검색된 데이터를 지도 시각화 표준 규격인 GeoJSON(FeatureCollection) 형태로 변환
        List<Map<String, Object>> features = facilities.stream().map(f -> {
            Map<String, Object> feature = new HashMap<>();
            feature.put("type", "Feature");

            Map<String, Object> geometry = new HashMap<>();
            geometry.put("type", "Point");
            // GeoJSON 표준은 항상 [경도(X), 위도(Y)] 순서입니다.
            geometry.put("coordinates", new double[]{f.getLocation().getX(), f.getLocation().getY()});
            feature.put("geometry", geometry);

            Map<String, Object> properties = new HashMap<>();
            properties.put("name", f.getName());
            feature.put("properties", properties);

            return feature;
        }).collect(Collectors.toList());

        Map<String, Object> featureCollection = new HashMap<>();
        featureCollection.put("type", "FeatureCollection");
        featureCollection.put("features", features);

        return featureCollection;
    }
}
```

#### 3.4 서버 재실행 및 API 테스트

파일을 저장하고 Spring Boot 서버를 다시 실행해 주세요.

웹 브라우저를 열고 아래 주소를 복사해서 접속해 봅니다. (의정부 시청 인근 좌표를 기준으로 반경 2000m, 즉 2km 이내의 데이터를 검색하는 요청입니다.)

<http://localhost:8080/api/facilities/search?lon=127.0336&lat=37.7387&radius=2000>

브라우저 화면에 괄호 { } 와 [ ] 가 섞인 긴 JSON 문자열이 나타난다면 API 개발 성공입니다!

1. 지도 위에 시각화 (geojson.io 활용)
이제 이 데이터가 지도 위에 어떻게 찍히는지 눈으로 확인해 볼 차례입니다.

브라우저에 출력된 JSON 문자열 전체({"type":"FeatureCollection"... 부터 끝까지)를 복사합니다.

새 탭을 열고 `https://geojson.io/` 에 접속합니다.

화면 오른쪽에 있는 코드 입력창의 기존 내용을 모두 지우고, 방금 복사한 문자열을 붙여넣습니다.

붙여넣는 즉시 왼쪽 지도 위(의정부 부근)에 회색 마커 2개가 짠하고 나타나나요? 마커를 클릭했을 때 '의정부역'과 '의정부 제일시장'이라는 이름이 정상적으로 뜨는지 확인해 보세요!
