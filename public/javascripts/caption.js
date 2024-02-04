const getCaptionList = document.querySelectorAll('.getcaption')
const captionList = document.querySelectorAll('.caption')
const reUrl = /#(\w+)/gi
const captionTextList = getCaptionList.forEach((caption, index) => {
	const newCaption = document.createElement('div')
	newCaption.innerHTML = linkify(caption.textContent)
	captionList[index].appendChild(newCaption)
})
function linkify(text) {
	return text.replace(reUrl, (url) => `<a style="color:blue;" href="tags/${url.slice(1)}" target="_blank">${url}</a>`)
}
