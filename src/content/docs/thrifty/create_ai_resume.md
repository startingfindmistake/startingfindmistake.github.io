---
title: 이력서 자동으로 만들어보자
description: 이력서를 자동으로 만드는 프로그램을 설계합니다.
draft : true
---

## 전체 데이터 흐름 설계 (Architecture)
---
프로그램의 핵심 로직은 '입력 -> 데이터 수집 -> AI조합 -> 출력'의 단순한 파이프라인으로 구성합니다.

1. 입력(Input): 기본 이력서 텍스트, 지원할 채용 공고 URL, 회사 소개 URL

</br>

2. 데이터 수집(Scraping): URL에서 필요한 텍스트(지원자격, 우대사항, 인재상 등)만 추출

</br>

3. 조합(Prompting): 기본 이력서 + 수집된 회사/직무데이터 + AI지시어(프롬프트)

</br>

4. AI처리(Gemini API): 조합된 텍스트를 Gemini API로 전송하여 결과물 생성

</br>

5. 출력(Output): 회사 맞춤형으로 재작성된 이력서 텍스트 반환


</br>
</br>

## 기술스택선정
---

#### 프로그래밍 언어
빠른 프로토타입으로는 Python(웹 크롤링과 AI API연동에 관련된 라이브러리가 매우 직관적인 장점이 있습니다.)

두번째 대안으로는 이것을 웹 서비스 확장 고려려 시 Java & Spring Boot 추후 웹서비스나 API서버로 확장하기 좋으며, 크롤링은 Jsoup 라이브러리를 활용하면 좋을것 같다.


</br>
</br>

#### 크롤링 라이브러리
* BeautifulSoup (Python)
* Jsoup (java)
* AI API: Google Gemini API (google-generativeai 패키지 또는 REST API)



