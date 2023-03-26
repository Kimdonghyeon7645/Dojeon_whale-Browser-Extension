// whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message == "message") {
//         console.log(`>> [background.js] get message (${message})`);     // 백그라운드 영역이라, 실제 브라우저 콘솔엔 출력안됨
//         sendResponse(`well done!`);
//     }
// });


whale.runtime.onConnect.addListener(port => {
    if (port.name === `ppap`) {
        port.onMessage.addListener(message => { // 메시지 받을때 (port.postMessage)
            port.postMessage(`'receive ${message}, send ${message*2}'`);    // 메시지 보낼때 (port.onMessage)
        });
    }
});