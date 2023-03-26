# [02_ 메시지 교환](https://developers.whale.naver.com/tutorials/messagePassing/)
> 참고문서는 매니페스트 v2 기준으로 정리되어 있어 v2, v3 같이 정리함 (사용할땐 v3으로, v2는 사용불가)

## 1. 확장앱 아키텍쳐
> [참고](https://developer.chrome.com/docs/extensions/mv2/architecture-overview/)
5가지 요소로 구성되어 있음
1. Manifest : 확장앱의 메인이 되는 데이터 파일(.json), 유일한 필수 요소로 나머지 요소들도 다 여기서 호출한다.
2. Background Script : 확장앱 백그라운드에 돌아가는 영역 (ex. background.js)
3. UI Elements : 확장앱 자체 페이지 영역 (ex. popup.html, popup.js)
4. Content Script : 브라우저에 열려있는 웹페이지와 연결된 영역 (ex. contentsrcipt.js)
5. Options Page : 확장앱 관련 설정 페이지 영역 (확장앱 관리자 페이지에서 해당 확장앱에 대한 설정 페이지)

이 각각의 요소는 서로 다른 영역이다 보니, 서로간에 데이터를 주고받을 때 **메시지 교환(Message Passing)** 방법이 있음  
(마치 이전페이지에서 다음페이지 넘어갈 때 데이터를 전달해주는 듯이 확장앱도 마찬가지)

## 2. 메시지의 자료형
메시지 교환시 내부적으로 `JSON.stringify() -> JSON.parse()` 와 비슷한 과정을 거침

-> `Number, String, Object, Boolean` 등 JSON 문자열 표현가능한(JSON-ifiable) 정보만 메시지 교환 가능
-> `클래스 인스턴스, 정규식 인스턴스, 함수, DOM 요소` 등은 교환불가, 시도하면 `[Object object]` 등 문자열화 된 상태로 전달

## 3. 메시지 교환 (일회성)
메시지 교환하려는 양쪽에 각각 아래 함수를 사용
- runtime.**sendMessage** : 보내고 회신받는 쪽
- runtime.**onMessage** : 받고 회신주는 쪽

```js
// contentscript.js (보내고 회신받는 쪽 - sendMessage)
for (let i = 0; i < 10; i++) {
    console.log(`>> [contentscript.js] start sending message!`);
    whale.runtime.sendMessage(`message`, response => {
        console.log(`>> [contentscript.js] get response (${response})`);
    });
}
```

```js
// background.js (받고 회신주는 쪽 - onMessage, sendResponse)
whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == "message") {
        console.log(`>> [background.js] get message (${message})`);     // 백그라운드 영역이라, 실제 브라우저 콘솔엔 출력안됨
        sendResponse(`well done!`);
    }
});
```

- (참고1) sendMessage(보내고 회신받는 쪽)은 1곳인데 onMessage(받고 회신주는 쪽)이 여러곳이면, 회신받는 쪽에서 가장 먼저 회신받은 `sendResponse()` 값만 받고 나머지 회신은 무시한다.
- (참고2) onMessage(받고 회신주는 쪽)에서 회신주는 걸(`sendResponse()`) 비동기적으로 하려면, onMessage 핸들러 함수가 명시적으로 true 를 반환해야 한다. (그러지 않으면 `sendResponse()` 함수가 자동으로 실행되어 의도한 비동기처리를 못함)


## 4. 메시지 교환 (지속가능한 연결)
`runtime.connect()` API로 포트(양쪽 간의 채널)를 생성하는 방식을 사용
- 연결 시작하는 쪽 : `runtime.connect({name: "포트명"})` 으로 포트(채널) 생성
- 연결 받는 쪽 : `runtime.onConnect`으로 포트 생성 이벤트를 핸들링

포트(채널)이 생성됐으면 메시지 교환은 양쪽 모두 같은 함수를 사용
- 메시지 보낼때 : `port.onMessage`
- 메시지 받을때 : `port.postMessage`

```js
// contentscript.js (연결 시작하는 쪽 - runtime.connect)
const port = whale.runtime.connect({name: `ppap`});

port.onMessage.addListener(message => { // 메시지 받을때 (port.postMessage)
    console.log(`>> [contentscript.js] receive : ${message}`);
});

for (let i = 0; i < 10; i++) {
    let message = i;
    console.log(`>> [contentscript.js] send : ${message}`);
    port.postMessage(message);   // 메시지 보낼때 (port.onMessage)
}
```

```js
// background.js (연결 받는 쪽 - runtime.onConnect)
whale.runtime.onConnect.addListener(port => {
    if (port.name === `ppap`) {
        port.onMessage.addListener(message => { // 메시지 받을때 (port.postMessage)
            port.postMessage(`'receive ${message}, send ${message*2}'`);    // 메시지 보낼때 (port.onMessage)
        });
    }
});
```

## 5. 더보기

- [확장앱 외부와 메시지 교환하는 법](https://developers.whale.naver.com/tutorials/messagePassing/#확장앱-외부)
- [스토리지에 메시지 담아 교환하는 법](https://developers.whale.naver.com/tutorials/messagePassing/#스토리지-API-활용)
