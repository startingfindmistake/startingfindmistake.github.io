---
layout: post
title: "github연결 git clone"
categories: Github setup
author: "YeongHo-Jung"
meta: "Springfield"
tags: [github, gitClone]
---

Git user name과 user email 설정 방법에 대해 알아보자

# Git user name과 user email 설정 방법

### 전체 저장소의 user name과 user email 설정 하기

<span style="color:yellowgreen"> yellowgreen </span>

```
$ git config --global user.name <span style="color:Your Name"> yellowgreen </span>
$ git config --global user.email "Your.email@example.com"
```


### 특정 저장소의 user name과 user email 바꾸기
만약 해당 저장소의 user name과 user email을 변경하고 싶다면 위에서 --global옵션을 생략하면 된다.
--global 옵션을 생략하면 해당 저장소(Repository)에서만 적용된다.

'''
$ git config user.name "Your Name"
$ git config user.email "Your.email@example.com"
'''

