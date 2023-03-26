// for (let i = 0; i < 10; i++) {
//     console.log(`>> [contentscript.js] start sending message!`);
//     whale.runtime.sendMessage(`message`, response => {
//         console.log(`>> [contentscript.js] get response (${response})`);
//     });
// }


const port = whale.runtime.connect({name: `ppap`});

port.onMessage.addListener(message => { // 메시지 받을때 (port.postMessage)
    console.log(`>> [contentscript.js] receive : ${message}`);
});

for (let i = 0; i < 10; i++) {
    let message = i;
    console.log(`>> [contentscript.js] send : ${message}`);
    port.postMessage(message);   // 메시지 보낼때 (port.onMessage)
}