---
layout: post
title: "github연결 git clone"
categories: Github setup
excerpt_image: /assets/images/i_posts/github_clone.png
author: "YeongHo-Jung"
meta: "Springfield"
tags: [github, gitClone]
---

![banner](/assets/images/i_posts/github_clone.png)

Git user name과 user email 설정 방법에 대해 알아보자

# Git user name과 user email 설정 방법

### 전체 저장소의 <span style="color:yellowgreen"> User Name </span>과 <span style="color:yellowgreen"> User Email </span>

<span style="color:yellowgreen"> yellowgreen </span>

```ruby
$ git config --global user.name "Your Name"
$ git config --global user.email "Your.email@example.com"
```


### 특정 저장소의 user name과 user email 바꾸기
만약 해당 저장소의 user name과 user email을 변경하고 싶다면 위에서 --global옵션을 생략하면 된다.
--global 옵션을 생략하면 해당 저장소(Repository)에서만 적용된다.


~~~ruby
$ git config user.name "Your Name"
$ git config user.email "Your.email@example.com"
~~~


