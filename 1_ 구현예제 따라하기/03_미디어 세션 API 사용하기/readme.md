# [03_ 미디어 세션 API 사용하기](https://developers.whale.naver.com/tutorials/mediaSession/)
> 참고문서는 매니페스트 v2 기준으로 정리되어 있어 v2, v3 같이 정리함 (사용할땐 v3으로, v2는 사용불가)

- **미디어 세션(Media Session) API** : GMC UI(Global Media Control User Interface, 전역 미디어 제어 사용자 인터페이스) 제어 가능
1. **메타 정보** : 현재 재생중인 오디오·비디오의 자세한 정보 확인 가능
2. **재생 상태 제어** : (미디어 키 입력 or 전역 미디어 제어 UI의 버튼)으로 입력하는 미디어 제어 동작(재생, 정지, 이전곡, 다음곡 등)에 대한 핸들러를 정의 가능

## 1. 메타 정보
- GMC UI : 해당 페이지의 도메인(호스트명)과 제목, 기본적인 재생/정지 버튼이 제공

