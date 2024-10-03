import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Constants
const searchInput = document.getElementById('searchImages');
const searchButton = document.getElementById('searchBtn');

// PixaBay properties
const key = "46332612-74f33d1ba9ca951ac6c22d341";
const image_type = "photo";
const orientation = "horizontal";
const safesearch = "true";

searchButton.addEventListener('click', () => {
    let URL = "https://pixabay.com/api/?key="+key
          +"&q="+encodeURIComponent(`${searchInput.value}`)
          +"&image_type="+image_type
          +"&orientation="+orientation
          +"&safesearch="+safesearch;

    const options = {
        method: "GET"
    };
    
    fetch(URL, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
    })
      .then(data => {
        if (data.total == 0) {
            iziToast.error({message: `Sorry, there are no images matching your search query. Please try again!`});
            return;
        }
        console.log(data);
    })
      .catch(error => {
        console.log(error);
    });
});

