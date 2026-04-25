---
title: GitHub actions 요금이 걱정이 된다.
description: Github actions에 요금을 줄이는 방법을 알아보자
---


> 1. 테스트를 어떤 상황에 테스트가 돌아가게끔 설정할까
> 2. GitHub Actions 트리거 설정 방법

## 1. 테스트를 어떤 상황에 테스트가 돌아가게끔 설정할까

* **상황 A:  주요 브렌치로 Pull Request(PR)를 생성하거나 업데이트 할 때**
  * 개인 작업 브랜치(`feature/login`등)에 커밋을 푸시할 때는 테스트를 돌리지 않습니다.
  * 작업이 끝나고 `main`이나 `develop` 같은 **공용 브랜치로 병합(Merge)하기 위해 PR을 올렸을 때,** 해당 코드가 기존 시스템을 망가뜨리지 않는지 검증하기 위해 실행합니다.

</br>

* **상황 B: 백엔드 핵심 코드가 변경되었을 대만 (경로 필터링)**
  * 단순히 `README.md` 같은 마크다운 문서나, 프론트엔드 관련 코드, 사소한 설정 파일만 수정했는데 무거운 Testcontainer가 돌 필요는 없습니다.
  * `src/` 디렉터리 내의 자바 소스 코드나 `build.gradle` 같은 빌드 설정이 변경되었을 때만 트리거 되도록 제한합니다.

</br>

* **상황 C: 수동으로 테스트를 검증하고 싶을 때**
  * 급하게 확인이 필요하거나, 캐시 문제 등으로 인해 자동 트리거를 타지 않고 개발자가 원할 때 버튼을 눌러서 실행할 수 있는 백도어를 열어둡니다.

## 2. GitHub Actions 트리거 설정 방법

GitHub Actions 공식 문서의 [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) 섹션을 바탕으로 위의 상황들을 조합한 YAML 설정 예시입니다.

* `.github/workflows/test.yml` 파일의 최상단 `on`블록을 다음과 같이 구성할수 있습니다.

```YAML
name: Backend Integration Tests

on:
  # 1. Pull Request 조건 (상황 A)
  pull_request:
    branches:
      - main      # main  브랜치로 PR이 올라왔을 때
      - develop   # develop 브랜치로 PR이 올라왔을 때
    paths:
      - 'src/**'          # src 폴더 안의 파일이 변경되었을 때
      - 'build.gradle'    # 빌드 설정 파일 변경될 때만
      - 'docker-compose.yml'  # 도커 설정 파일 변경될 때만


  # 3. 주요 브랜치에 코드가 병합(Push)되어 최종 확인할 때
  push:
    branches:
      - main
      - develop
    # paths-ignore를 사용하여 특정 파일 변경 시에는 무시할 수도 있습니다.
    paths-ignore:
      - "README.md"   # README가 바뀌어도 테스트 안 함
      - "docs/**"     # 문서 폴더는 무시
      - '**/*.md'     # 마크다운 문서 수정은 무시

```

**⚙️ 설정 요소 상세 설명**

* `on.pull_request.branches`: 지정된 브랜치(`main`, `develop` 등)를 타겟으로 하는 PR이 생성되거나, 해당 PR에 새로운 커밋이 푸시될 때만 워크플로우를 실행합니다.

</br>

* `on.pull_request.paths`: 변경된 파일 목록 중에 명시된 경로의 파일이 하나라도 포함되어 있을 때만 실행합니다. `src/**`는 src 폴더 및 그 하위의 모든 변경 사항을 의미합니다.

</br>

* `on.push.paths-ignore`: `paths`의 반대 개념입니다. 코드에 마크다운 문서 변경만 포함되어 있다면, 브랜치 조건이 맞더라도 워크플로우를 생략하여 요금을 아낄 수 있습니다.

</br>

* `on.workflow_dispatch`: GitHub 레포지토리의 [Actions] 탭에서 `Run workflow` 버튼을 눌러서 수동으로 실행할 수 있게 해주는 키워드입니다. 테스트 환경을 디버깅 할 때 가장 유용합니다.

<br />
<br />

---

### 📚 참고 자료

> 💡 **Tip:** 공식 문서를 확인하시면 더 자세한 트리거 설정 방법과 요금 관련 정책을 확인하실 수 있습니다.

* 🔗 **GitHub Docs:** [Events that trigger workflows](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
* 💳 **GitHub Docs:** [About billing for GitHub Actions](https://docs.github.com/ko/billing/managing-billing-for-github-actions/about-billing-for-github-actions)
