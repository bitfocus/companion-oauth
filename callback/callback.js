let companionUrl = ''
let instanceId = ''

function updateUrl(newUrl) {
	companionUrl = newUrl

	document.querySelector('#companion_url').textContent = companionUrl
	document.querySelector('#edit_url_field').value = companionUrl
}

function showEdit(editMode) {
	document.querySelector('#show_url').style.display = editMode ? 'none' : 'block'
	document.querySelector('#edit_url').style.display = editMode ? 'block' : 'none'
}

window.addEventListener('load', (event) => {
	console.log('page is fully loaded')

	const searchParams = new URLSearchParams(window.location.search)
	instanceId = searchParams.get('state')

	// Setup url shown in page
	companionUrl = window.localStorage.getItem('companionUrl') || 'http://localhost:8000'
	updateUrl(companionUrl)

	document.querySelector('#companion_url_edit').addEventListener('click', (e) => {
		e.preventDefault()

		showEdit(true)
	})
	document.querySelector('#save_url').addEventListener('click', (e) => {
		e.preventDefault()

		const newUrl = document.querySelector('#edit_url_field').value
		updateUrl(newUrl)

		showEdit(false)
	})

	const openUrlButton = document.querySelector('#open_url')
	openUrlButton.addEventListener('click', (e) => {
		e.preventDefault()

		console.log('opening')

		window.location = companionUrl + '/instance/' + instanceId + '/oauth/callback?code=' + searchParams.get('code')
	})

	if (instanceId) {
		openUrlButton.disabled = false
	} else {
		document.querySelector('#fail').style.display = 'block'
		// openUrlButton.title = 'Invalid response data'
	}
})
