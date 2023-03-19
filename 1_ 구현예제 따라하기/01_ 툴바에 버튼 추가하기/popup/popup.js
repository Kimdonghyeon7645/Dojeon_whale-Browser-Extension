document.getElementById("news_link").addEventListener("click", () => {
    whale.tabs.create({
        url: `http://news.naver.com/`
    });
})