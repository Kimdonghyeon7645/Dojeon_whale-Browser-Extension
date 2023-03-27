if ('mediaSession' in navigator) {
navigator.mediaSession.metadata = new MediaMetadata({
    title: '제목',      // Optional
    artist: '아티스트명', // Optional
    album: '앨범명',     // Optional
    artwork: [         // Optional
        { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' }
    ]
    });  
}