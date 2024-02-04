// eslint-disable-next-line no-unused-vars
function previewMedia() {
	var preview = document.getElementById('mediaPreview')
	var fileInput = document.getElementById('media')
	var files = fileInput.files

	preview.innerHTML = ''

	for (var i = 0; i < files.length; i++) {
		var file = files[i]
		var reader = new FileReader()

		reader.onload = function (e) {
			var previewItem = document.createElement('div')
			previewItem.classList.add('previewItem')

			if (file.type.startsWith('image/')) {
				var img = document.createElement('img')
				img.src = e.target.result
				previewItem.appendChild(img)
			} else if (file.type.startsWith('video/')) {
				var video = document.createElement('video')
				video.src = e.target.result
				video.setAttribute('autoplay', 'autoplay')
				video.muted=true
				previewItem.appendChild(video)
			}

			preview.appendChild(previewItem)
		}

		reader.readAsDataURL(file)
	}
}
let caption=document.getElementById('caption')
let labelCaptions=document.getElementById('forcaption')
let submitButton=document.getElementById('submit')
caption.onchange=function(e){
	const wordsText=e.target.value.trim().split(' ')
	if(wordsText.length>13)
	{
		labelCaptions.innerText='the caption length should not be more than 13 words'
		labelCaptions.style.color='red'
		submitButton.style.backgroundColor='red'
		submitButton.addEventListener('click',(e)=>{
			e.preventDefault()
		})
	}
	else{
		labelCaptions.innerText='looks good'
		submitButton.style.backgroundColor='green'
		labelCaptions.style.color='green'
	}
}

// eslint-disable-next-line no-unused-vars

