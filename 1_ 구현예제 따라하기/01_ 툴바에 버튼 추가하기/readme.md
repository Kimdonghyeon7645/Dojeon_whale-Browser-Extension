# [01_ 툴바에 버튼 추가하기](https://developers.whale.naver.com/tutorials/browserAction/)
> 참고문서는 매니페스트 v2 기준으로 정리되어 있어 v2, v3 같이 정리함 (사용할땐 v3으로, v2는 사용불가)

## 1. 액션 API (v2에서의 브라우저 액션&페이지 액션)
오른쪽 상단에 아이콘 뜨는 확장앱 유형은 v2 기준 2가지가 있음 = [*브라우저 액션 (Browser action)*](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_actions) + [*페이지 액션 (Page action)*](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Page_actions)  
(브라우저액션=모든페이지용 vs 페이지액션=특정페이지용)  
-> v3은 이제 Action 1가지로 보면됨

아이콘 클릭시...
- 팝업이 없는 경우 : 클릭 이벤트가 발생, 백그라운드(js)에 이벤트 핸들러로 후처리
- 팝업이 있는 경우 : 해당 팝업 표시(html, css, js 로 구현된 페이지)

### 2. 액션 API 기본 뼈대
```js
{
    "manifest_version": 3,  // 이젠 2 안씀
    "name": "button-demo",  // 이름
    "description": "툴바 버튼 예제",    // 설명 (확장앱 관리자에서 설명으로 나옴)
    "version": "1.0",   // 확장앱 자체 버전(임의 지정)
    "action": {
        "default_icon": {   
            // "default_icon" 이 없으면 기본 아이콘(파란색 퍼즐 아이콘) 뜸 (optional)
            // PNG, GIF, JPG, BMP, ICO 사용가능
            // 픽셀크기에 안맞는 이미지도 비권장하지만 자동으로 크기조정되어 적용 -> 근데 내가하니까 안됨.. 걍 맞는 크기 사용하자
            // 경로는 manifest.js가 있는 루트경로 기준 상대경로로 작성
            "16": "icon/page-16.png",
            "32": "icon/page-32.png"
        }
    },
}
```

## 3. 액션 API - 팝업이 없는 경우 (백그라운드)
**"action"** 프로퍼티의 자식위치에 아래 내용 추가
```js
// 경로는 manifest.js가 있는 루트경로 기준 상대경로로 작성
"default_popup": "popup/index.html",    // 원하는 팝업 html 파일의 경로를 작성
```

실제 추가해준 파일경로대로, 실제 팝업 페이지 소스(index.html)도 추가
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>예제</title>
</head>
<body>
    <div style="width: 100px;"><p id="news_link">네이버뉴스</p></div>
    <script src="popup.js"></script>    <!-- 이렇게 하면 팝업 페이지에서도 자체적으로 필요한 js 호출가능 -->
</body>
</html>
```
```js
document.getElementById("news_link").addEventListener("click", () => {
    whale.tabs.create({
        url: `http://news.naver.com/`
    });
})
```


## 4. 액션 API - 팝업이 있는 경우 (팝업)
**"action"** 프로퍼티의 동생위치에 아래 내용 추가
```js
"background": {
    "service_worker": "background.js"
//   "scripts": ["background.js"]   // v2 문법
}
```

실제 추가해준 파일명대로, 백그라운드 소스(background.js)도 추가  
-> 이걸 ['서비스 워커'](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API) 라고 함
```js
whale.browserAction.onClicked.addListener(() => {
    whale.tabs.create({
        url: `http://news.naver.com/`
    });
})
```