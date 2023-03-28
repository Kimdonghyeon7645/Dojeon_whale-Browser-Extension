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


## 3. 탐색바(navigation_bar)
manifest.json에서 `use_navigation_bar` 속성값(boolean)에 따라 탐색바 표시 여부 적용
- SPA(단일페이지앱)에선 탐색바가 필요없어도, 사이드바 내에서 URL 이동시 이전URL로 돌아갈 방법이 탐색바밖에 없음


## 4. 버튼 툴팁
- 기본값 : `default_title`
- 동적으로 변경하고 싶으면 `whale.sidebarAction.setTitle({title: '새로운제목'})` 사용


## 5. 버튼 뱃지
아이콘 위에 뱃지를 표시 가능(새 알림, 업데이트 표현때 사용)
- `whale.sidebarAction.setBadgeText()` : 뱃지에 표시될 문자열 변경
- `whale.sidebarAction.setBadgeBackgroundColor()` : 뱃지의 배경색상 변경
```js
whale.sidebarAction.setBadgeText({ text: `5` });

whale.sidebarAction.setBadgeBackgroundColor({
    color: `#ff0000`  //  RGBA 색상값 배열([255, 0, 0, 255]) 혹은 HEX 색상 표현 문자열(#FF0000).
});
```