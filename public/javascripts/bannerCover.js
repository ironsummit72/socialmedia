let banner=document.getElementById('banner')
banner.loop=true
banner.muted=true
banner.addEventListener('mouseover',()=>{
    banner.play()
})
banner.addEventListener('mouseout',()=>{
    banner.pause()
})