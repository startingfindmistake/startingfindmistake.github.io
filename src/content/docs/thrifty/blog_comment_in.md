---
title: 블로그 댓글 기능 직접 추가해보기
description: 블로그에 댓글 기능 직접 추가하는 방법
draft: true
---


블로그 댓글 기능에Giscus(지스커스)를 추가해 보기로 결정하였다.
그 이유에 대해서는 이전 페이지를 읽어보시길 바랍니다.

**anyway**

## 📚 먼저 알아두어야 할 기본 지식

#### 1. GitHub Discussions의 개념

* Giscus는 블로그에 댓글이 달리면 해당 댓글을 연결된 GitHub 저장소의 'Discussions(토론)' 탭에 저장합니다.  
따라서 GitHub 저장소가 공개(Public) 상태여야 하고, Discussions 기능이 활성화되어 있어야 합니다.

check

* [ ] 저장소가 공개(Public) 상태여야 하고, Discussions 기능이 활성화되어 있어야 한다.

#### 2. Giscus 작동원리

* Giscus는 웹사이트에 `<script>` 태글르 삽입하여 작동합니다.  
이 스크립트가 GitHub API와 통신하며 댓글 UI를 `<iframe>`형태로 렌더링해 줍니다.  

## 🗺️ Giscus 연동 초반 계획

##### 1단계: GitHub 저장소 설정 변경

* 목표: Giscus가 데이터를 저장할 수 있는 공간 마련

![Github_settings_menubar_image](../../../assets/thrifty_posts/blog_comment_in_assets/command_image1.png)

* 자신의 블로그 레포레지토리(**Example**:startingfindmistake.github.io) 저장소의 `GitHub Settings` 탭으로 이동합니다.
![Github_settings_discussions_check_image](../../../assets/thrifty_posts/blog_comment_in_assets/command_image2.png)
Features 섹션에서 Discussions 체크박스를 활성화합니다. (보통 기본 카테고리로 General, Announcements 등이 생성됩니다.)

</br>
</br>

##### 2단계: GitHub에 Giscus App 설치

이 단계는 사용자님의 GitHub 계정과 저장소를 Giscus가 안전하게 연결하도록 권한을 주는 과정입니다.



1. `Github대시보드`에서 => `≡`메뉴바 클릭 => `Marketplace`메뉴로 이동 => `giscus`검색 `https://github.com/marketplace/giscus`=> `Add`버튼 클릭 =>`install for free`

![giscus_install_it_for_free_image](../../../assets/thrifty_posts/blog_comment_in_assets/command_image3.png)


</br>
</br>

`Install it for free`를 클릭하고 나면은 모든 저장소에 giscus를 적용할지 아니면 내가 선택한 저장소만 giscus를 선택할지 선택지를 준다.  
여기서 나는 블로그 댓글 기능으로 giscus를 활용할 계획이기 때문에 블로그 레포레지토리에만 giscus를 적용하기를 선택하였다.


![giscus_install_it_for_free_image](../../../assets/thrifty_posts/blog_comment_in_assets/command_image4.png)

`install(설치)` 누르고 나면 최종적으로 설치가 완료 된다.

</br>
</br>

**Giscus가 잘 설치되었는지 확인하려면**

`오른쪽 상단 프로필` 클릭 => `settings`선택 => 왼쪽 메뉴바에서 Integrations카테고리에 `Applications`선택  
</br>
![giscus_install_it_for_free_image](../../../assets/thrifty_posts/blog_comment_in_assets/command_image5.png)

그러면여기서 앱에 대한 세세한 정보를 확인할수 있습니다.

</br>
</br>

#### 3단계: 나만의 Giscus 스크립트 코드 생성하기

1. Giscus 공식 웹사이트 한국어 페이지(giscus.app/ko) 에 접속합니다.
2. 스크롤을 내리면서 아래 항목들을 순서대로 채워 넣습니다.
![giscus_install_it_for_free_image](../../../assets/thrifty_posts/blog_comment_in_assets/command_image6.png)

저장소 (Repository): startingfindmistake/startingfindmistake.github.io 라고 정확히 입력합니다. (입력 후 아래에 '성공'이라는 초록색 메시지가 뜨는지 확인하세요. 안 뜬다면 1단계 Discussions 활성화나 2단계 앱 설치가 안 된 것입니다.)
페이지 ↔ 토론 연결 (Page ↔️ Discussions Mapping): 첫 번째 옵션인 제목에 특정 용어 포함 (pathname) 을 선택합니다. (각 블로그 글의 URL 경로를 기준으로 댓글창이 나뉘게 됩니다.)
토론 카테고리 (Discussion Category): 드롭다운에서 General 또는 Announcements 를 선택합니다.
기능 (Features): 특별히 건드릴 것은 없지만, '댓글 지연 로딩(Lazy load)'을 체크하시면 블로그 로딩 속도 향상에 도움이 됩니다.
테마 (Theme): 블로그의 디자인에 맞춰 선택합니다. 블로그가 라이트/다크 모드를 모두 지원한다면 OS 설정 기준 (preferred_color_scheme) 이 가장 무난합니다.

## 📌 결론
