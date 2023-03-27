let output1 = document.getElementById("out1"),
    output2 = document.getElementById("out2"),
    output3 = document.getElementById("out3"),
    output4 = document.getElementById("out4");

whale.sidebarAction.onClicked.addListener(result => {
    if (result.opened) {
        output1.textContent = result.opened;
    } else {
        output3.textContent = result.opened;
    }
});

document.addEventListener(`visibilitychange`, () => {
    if (document.visibilityState = `visible`) {
        output2.textContent = document.visibilityState;
    } else {
        output4.textContent = document.visibilityState;
    }
});