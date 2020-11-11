

fetch('https://spreadsheets.google.com/feeds/cells/1vZHQRGxhb8Bukf3iqK4yTrBLtQf3VVDYdLrWYGDYGCU/1/public/full?alt=json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        saveData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });


let dataContainer = [];


function saveData(data) {

  let nbLines = data.feed.entry.length / 2

    for (var i = 0; i < nbLines; i++) {
        let key = "line" + i
        dataContainer.push([]);
    }

    for (var i = 0; i < data.feed.entry.length; i++) {

        let col = data.feed.entry[i].gs$cell.col
        let row = data.feed.entry[i].gs$cell.row-1
        let value = data.feed.entry[i].content.$t

        dataContainer[row].push(value);
    }

    console.log(dataContainer)

    loadWindow()
}

function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}


function loadWindow() {

    console.log('Voici les Keys :')
    let window = document.getElementById("window")

    while (window.firstChild) {
        window.removeChild(window.firstChild);
      }


    for (let key of dataContainer) {

        console.log(key)

        if (key[0] === 'titre') {
            
            var div = document.createElement('div');

            div.innerHTML = key[1];
            div.className = 'titre';

        } else if (key[0] === 'article') {

            var div = document.createElement('div');

            div.innerHTML = key[1];
            div.className = 'article';

        } else if (key[0] === 'vidéo') {

            var div = document.createElement('div');
            var wraper = document.createElement('div');
            var divFrame = document.createElement('iframe');

            divFrame.src = key[1];

            div.className = 'videoDiv';
            wraper.className = 'videoContainer';
            divFrame.className = 'video';

            wraper.appendChild(divFrame);
            div.appendChild(wraper);


        } else if (key[0] === 'téléchargement') {

            var div = document.createElement('div');
            var divButton = document.createElement('input');
            divButton.type = "button";
            divButton.value = "Télécharger";
            
            div.className = 'buttonContainer';

            divButton.onclick = function(){
                openInNewTab(key[1]);
            }
            /*divButton.className = 'bouton';*/

            div.appendChild(divButton);

        } else if (key[0] === 'image') {

            var div = document.createElement('div');
            var divImg = document.createElement('IMG');

            divImg.src = key[1];
            div.className = 'imageContainer';
            divImg.className = 'image';

            div.appendChild(divImg);

        } else {
            break;
        }

        document.body.appendChild(div);

    }
}



/*

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/YakDrsnqpBs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/