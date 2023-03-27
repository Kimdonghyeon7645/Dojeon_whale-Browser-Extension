# [04_ 사이드바앱 만들기](https://developers.whale.naver.com/tutorials/sidebarAction/)
> 참고문서는 매니페스트 v2 기준으로 정리되어 있어 v2, v3 같이 정리함 (사용할땐 v3으로, v2는 사용불가)

웨일 브라우저의 매력적인 확장앱 유형, [사이드바 액션 (Sidebar Action)](https://developers.whale.naver.com/api/extensions/sidebarAction/)

## 1. 기본 구성
```json
  "sidebar_action": {
    // 1. 필수로 들어가야되는 속성
    "default_page": "sidebar.html",
    "default_icon": {
        "16": "images/icon16.png"
    },

    // 2. 필수는 아닌 속성
    "default_title": "사이드바앱",  // 사이드바 아이콘 마우스 호버시 툴팁 내용
    "use_navigation_bar": true      // 사이드바 페이지 하단에 네비게이션바 표시 여부
  }
```

## 2. 버튼 클릭 시 동작
사이드바 버튼 클릭시 이벤트 핸들링은 2개 가능
1. `whale.sidebarAction.onClicked.addListener(res => {})` : `result.opened` 으로 사이드바 열렸는지 여부 확인
2. `document.addEventListener('visibilitychange', () => {}` : `document.visibilityState === 'visible'` 으로 사이드바 열렸는지 여부 확인

