(function(){
    const onProgress = (e, $dom, playControl) => {
        const updateFunc = (percent) => {
            playControl.percent = percent
            playControl.time = e.detail.currentTime
            //console.log('currentTime:', e.detail.currentTime)
            //console.log('percent:', percent)
            //console.log(progress)
            $dom.style.width = percent+'%'
        }
        let percent = ((e.detail.currentTime / e.detail.duration) * 100).toFixed(1)
        updateFunc(percent)
    }

    const mockTime = () => {
        // 0.1~0.3
        return Math.random() * 2/10 +0.1;
    }
    window.progressNormal = (currentTime, duration, $dom, playControl) => {
        if(currentTime==duration) return;
        const updateTime = mockTime();
        setTimeout(() => {
            currentTime+=updateTime;
            if(currentTime>duration) currentTime = duration;
            onProgress({"detail":{"currentTime": currentTime,"duration": duration}}, $dom, playControl);
            progressNormal(currentTime, duration, $dom, playControl);
        }, updateTime*1000);
    }
})();