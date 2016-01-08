$('#server').on('click', function() {
	$.ajax({
		type: 'get',
		url: '/server'
	})
})

$('#problem').on('click', function() {
	$.ajax({
		type: 'get',
		url: '/problem'
	})
})