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
        //当前视频进度第一次更新
        if (playControl.first) {
            playControl.duration = e.detail.duration
            playControl.first = false

            // 计算出 0.5秒 占进度条百分比，后面以会以此作为间隔触发width更新，并且css中必须是 transition: 0.5s linear;
            // 时间未到0.5秒，动画先行
            updateFunc(100 / e.detail.duration / 2)
        } else {
            // 等同于节流 ｜｜ 如果播放完毕 直接更新。e.detail.currentTime单位是秒
            let percent = ((e.detail.currentTime / e.detail.duration) * 100).toFixed(1)
            // percent - playControl.percent > 0 达到0.5秒所占比例间隔，修改width，执行下一次0.5秒动画
            if (percent - playControl.percent > 0 || e.detail.currentTime >= e.detail.duration) {
                updateFunc(percent)
            }
        }
    }

    const mockTime = () => {
        // 0.1~0.3
        return Math.random() * 2/10 +0.1;
    }
    window.progressSmooth = (currentTime, duration, $dom, playControl) => {
        if(currentTime==duration) return;
        const updateTime = mockTime();
        setTimeout(() => {
            currentTime+=updateTime;
            if(currentTime>duration) currentTime = duration;
            onProgress({"detail":{"currentTime": currentTime,"duration": duration}}, $dom, playControl);
            progressSmooth(currentTime, duration, $dom, playControl);
        }, updateTime*1000);
    }
})();