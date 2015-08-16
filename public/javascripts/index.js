var allChamps = data.data;

var champClass = document.getElementsByClassName('champSquare');

for (var i=0;i<champClass.length;i++) {
	champClass[i].addEventListener('click',function(e) {
		var champID = e.currentTarget.dataset.id;
		window.location+=champID;
	})
}

