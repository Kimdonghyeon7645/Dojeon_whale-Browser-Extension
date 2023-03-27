if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
       title: '제목',      // Optional
       artist: '아티스트명', // Optional
       album: '앨범명',     // Optional
       artwork: [         // Optional
         { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' }
       ]
    });

    const skipTime = 10; // Time to skip in seconds

    navigator.mediaSession.setActionHandler('seekbackward', function() {
    // 사용자가 "Seek Backward" 버튼을 클릭한 경우
    audio.currentTime = Math.max(audio.currentTime - skipTime, 0);
    });

    navigator.mediaSession.setActionHandler('seekforward', function() {
    // 사용자가 "Seek Forward" 버튼을 클릭한 경우
    audio.currentTime = Math.min(audio.currentTime + skipTime, audio.duration);
    });
}

