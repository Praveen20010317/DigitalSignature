
function check_file() {
/*	$("document").ready(function() {
		$("#myPdf").click(function() {
			$("html, body").animate({
					scrollTop: innerHeight,
				},
				"slow"
			);
			return false;
		});
	});
*/	
}

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.js';
document.getElementById('myPdf').onchange = function(event) {
  var file = event.target.files[0];
  var fileReader = new FileReader();
  fileReader.onload = function() {
    var typedarray = new Uint8Array(this.result);
    console.log(typedarray);
    const loadingTask = pdfjsLib.getDocument(typedarray);
    loadingTask.promise.then(pdf => {
      pdf.getPage(1).then(function(page) {
        console.log('Page loaded');

        var scale = 1.5;
        var viewport = page.getViewport({
          scale: scale
        });

        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
         	console.log('Page rendered');
        });
      });
    });
  }
  fileReader.readAsArrayBuffer(file);
}

var modal = document.getElementById("myModal");

var btn = document.getElementById("add_sign");

var span = document.getElementsByClassName("close")[0];
 
btn.onclick = function() {
  	modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

jQuery(document).ready(function($){
	var canvas = document.getElementById("signature");
	var signaturePad = new SignaturePad(canvas);
	$('#add-signature').on('click', function() {
		console.log(canvas.toDataURL("image/jpg"));
		const img = document.getElementById('img_v');
		img.src = canvas.toDataURL("image/jpg");
		document.getElementById("add_sign").style.display = "none";
		document.getElementById("download").style.display = "block";
		document.getElementById("img_v").style.display = "block";
		document.getElementById("delete").style.display = "block";
		return img;
	});
	
	$('#clear-signature').on('click', function(){
		signaturePad.clear();
	});
	
});

//Make the DIV element draggagle:
dragElement(document.getElementById("drag_sign"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
   
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

$('#delete').on('click', function() {
	document.getElementById("img_v").style.display = "none";
	document.getElementById("delete").style.display = "none";
	document.getElementById("add_sign").style.display = "block";
	document.getElementById("download").style.display = "none";
});

function download_img() {
	var canvas = document.getElementById("canvas");
	$('#download').on('click', function() {
		console.log(canvas.toDataURL("image/jpg"));
		const img = document.getElementById('img_v1');
		img.src = canvas.toDataURL("image/jpeg",1.0);
		var pdf = new jsPDF();
		pdf.addImage(img, 'JPEG', 0, 0);
		pdf.save("download.pdf");  
		return img;
	});
} 
