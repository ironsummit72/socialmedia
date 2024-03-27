const getCaptionList = document.querySelectorAll('.getcaption')
const captionList = document.querySelectorAll('.caption')
const reUrlhastag = /#(\w+)/gi
const reUrlusertag = /@(\w+)/gi
const captionTextList = getCaptionList.forEach((caption, index) => {
	const newCaption = document.createElement('div')
	newCaption.innerHTML = linkify(caption.textContent)
	captionList[index].appendChild(newCaption)
})
function linkify(text) {
	return text.replace(reUrlhastag, (url) => `<a style="color:blue;" href="tags/${url.slice(1)}">${url}</a>`)+ text.replace(reUrlusertag, (url) => `<a style="color:blue;" href="profile/${url.slice(1)}">${url}</a>`)
}
