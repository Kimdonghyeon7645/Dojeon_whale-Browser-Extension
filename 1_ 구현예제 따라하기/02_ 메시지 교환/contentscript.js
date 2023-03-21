for (let i = 0; i < 10; i++) {
    console.log(`>> [contentscript.js] start sending message!`);

    whale.runtime.sendMessage(`message`, response => {
        console.log(`>> [contentscript.js] get response (${response})`);
    });
}