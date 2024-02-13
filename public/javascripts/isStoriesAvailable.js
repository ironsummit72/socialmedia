const displaypicture = document.getElementById('displaypicture')
const displayname = document.getElementById('displayname')
const username = displayname.innerText.split('@')[1]
async function checkIfStories() {
	let response = await fetch(`${window.origin}/stories/api/available/${username}`)
	let data = await response.json()
	if (data.length > 0) {
		// data exists
		displaypicture.classList.add('gradientborder')
	} else {
		//  empty
	}
}
checkIfStories()
