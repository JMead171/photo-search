let photoApi = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=cffc10eef5a0c45efd97962706c866fc&tags=';
let photoApiSuffix = '&safe_search=1&per_page=20&format=json&nojsoncallback=1';
let key = 'cffc10eef5a0c45efd97962706c866fc';
let code = '23dd85085b66eb93';
let searchText = "";
let photoFormEl = document.querySelector('.photo-search');
let searchInputEl = document.querySelector('#search-pic');
let errorSearchEl = document.querySelector('.error-msg');

// Fetch API and create DOM elements from search results
let getPhotos = function(search) {
    let apiUrl = photoApi + search + photoApiSuffix;
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            
            const elements = document.getElementsByClassName("image-id");
            while (elements.length > 0) elements[0].remove();
            let searchName = document.getElementById('span-search');
            searchName.textContent = " " + search;
           
            if (!data["photos"]["photo"] || data["photos"]["photo"].length < 1) {
                errorSearchEl.textContent = "** Sorry no photos found, try again **";
            } else {
                for (let i = 0; i < data["photos"]["photo"].length; i++) {
                    let farmId = data["photos"]["photo"][i]["farm"];
                    let serverId = data["photos"]["photo"][i]["server"];
                    let id = data["photos"]["photo"][i]["id"];
                    let secretId = data["photos"]["photo"][i]["secret"];
                    //Display photo - https://farm66.staticflickr.com/65535/50862216527_e08bc3716f.jpg         
                    let getImage = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + id + "_" + secretId + ".jpg";
                    let imageEl = document.querySelector('#show-photos')
                    let imageTag = document.createElement('img');
                    imageTag.setAttribute('src', getImage);
                    imageTag.classList.add('image-id');
                    imageEl.appendChild(imageTag);
                }
            };
            });
        } else {
            console(response.statustext);
        }
    })
    .catch(function (error) {
        console.error(err);
    });
};

let getSearch = function (event) {
    event.preventDefault();
    errorSearchEl.textContent = "";
    searchText = searchInputEl.value.trim();
    if (searchText) {
        getPhotos(searchText);
        searchInputEl.value ="";
    } else {
        errorSearchEl.textContent = "Please enter a valid photo search";
    }  
}

photoFormEl.addEventListener('submit', getSearch);