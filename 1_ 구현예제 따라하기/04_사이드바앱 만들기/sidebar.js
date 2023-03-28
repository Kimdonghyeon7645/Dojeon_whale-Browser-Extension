let output1 = document.getElementById("out1"),
    output2 = document.getElementById("out2"),
    output3 = document.getElementById("out3"),
    output4 = document.getElementById("out4"),
    cnt = 0;

whale.sidebarAction.setBadgeBackgroundColor({ color: `#ff0000` });

whale.sidebarAction.onClicked.addListener(result => {
    let tooltip;
    if (result.opened) {
        output1.textContent = result.opened;
        tooltip = "열린상태";
    } else {
        output3.textContent = result.opened;
        tooltip = "닫힌상태";
    }

    whale.sidebarAction.setTitle({ title: tooltip });
    cnt++;
    whale.sidebarAction.setBadgeText({ text: cnt.toString() });
});

document.addEventListener(`visibilitychange`, () => {
    if (document.visibilityState = `visible`) {
        output2.textContent = document.visibilityState;
    } else {
        output4.textContent = document.visibilityState;
    }
});