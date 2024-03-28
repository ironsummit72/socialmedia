const getCaptionList = document.querySelectorAll('.getcaption')
const captionList = document.querySelectorAll('.caption')
const reUrl = /#(\w+)/gi
const captionTextList = getCaptionList.forEach((caption, index) => {
	const newCaption = document.createElement('div')
	newCaption.innerHTML = linkify(caption.textContent)
	captionList[index].appendChild(newCaption)
})
function linkify(str) {
	const regexUsername = /(^|\s)@([a-zA-Z0-9_]+)/g;
	const regexHashtag = /#([a-zA-Z0-9_]+)/g;
  
	let linkedStr = str;
  
	linkedStr = linkedStr.replace(regexUsername, (match, preceedingChar) => {
	  const username = match.slice(preceedingChar === " " ? 2 : 1); 
	  return `<a style="color:blue;" href="../profile/${username}">${match}</a>`;
	});
  

	linkedStr = linkedStr.replace(regexHashtag, (match) => {
	  const hashtag = match.slice(1); 
	  return `<a style="color:blue;" href="../tags/${hashtag}">${match}</a>`;
	});
  
	return linkedStr;
  }
