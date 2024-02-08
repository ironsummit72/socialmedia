const like = document.getElementById('like')
const url = window.origin
postId = async function (value) {
	let likepostUrl = `${url}/like/${value}`
	let response = await fetch(likepostUrl, {method: 'POST'})
	let data = await response.json()
	const likeImage = document.getElementById(`likebtn${value}`)
    const likeCount=document.getElementById(`likecount${value}`)
    const [count,text]=likeCount.innerText
	if (data.isLiked) {
		likeImage.src = '/icons/likef.svg'
        likeCount.innerText=`${Number(count)+1} likes`
	} else {
		likeImage.src = '/icons/like.svg'
        likeCount.innerText=`${Number(count)-1} likes`
	}
}
