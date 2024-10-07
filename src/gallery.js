import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createListItem } from "./createGallery";   
import axios from "axios";

// Constants
const searchForm = document.querySelector('.searchForm');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const secondLoader = document.getElementById('secondLoader');
const loadMoreBtn = document.querySelector('.loadMore');

// PixaBay properties
const key = "46332612-74f33d1ba9ca951ac6c22d341";
const image_type = "photo";
const orientation = "horizontal";
const safesearch = "true";
let searchValue = "";
let currentPage = 1;
let totalHits = 0;

// Auxiliary functions 
const hideElement = (elem) => {elem.style.display = "none"};
const showBlock = (elem) => {elem.style.display = "block"};
const showFlex = (elem) => {elem.style.display = "flex"};


const fetchImages = async (url) => {
  const response = await axios.get(url); 
  return response.data;
};

const generateImages = async (value, page) => {
  let URL = "https://pixabay.com/api/?key="+key
        +"&q="+encodeURIComponent(`${value}`)
        +"&image_type="+image_type
        +"&orientation="+orientation
        +"&safesearch="+safesearch
        +"&page="+page
        +"&per_page="+39;

  try {
    const images = await fetchImages(URL);
    totalHits = images.totalHits;
    if (images.total === 0 || value === "") {
      hideElement(loader);
      hideElement(loadMoreBtn);
      iziToast.error({message: `Sorry, there are no images matching your search query. Please try again!`});
      return;
    } else if (page * 39 >= totalHits) {
      hideElement(secondLoader);
      hideElement(loadMoreBtn);
      iziToast.info({message: `We're sorry, but you've reached the end of search results.`});
      return;
    }

    hideElement(loader);
    hideElement(secondLoader);
    createListItem(images.hits, gallery);
    showFlex(gallery);
    showBlock(loadMoreBtn);
    const lightBox = new SimpleLightbox("ul.gallery a", {
        captionType: "attr",
        captionsData: "alt",
        sourceAttr: "href",
        overlay: true,
        overlayOpacity: 1,
    });
    lightBox.refresh();
  } catch (error) {
    console.log(error);
  }
};

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  showBlock(loader);
  hideElement(gallery);
  hideElement(loadMoreBtn);
  searchValue = document.getElementById('searchImages').value.trim();
  gallery.innerHTML = "";
  
  generateImages(searchValue, currentPage);
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  hideElement(loadMoreBtn);
  showBlock(secondLoader);

  await generateImages(searchValue, currentPage);

  const galleryItemHeight = document
    .querySelector('.gallery-link')
    .getBoundingClientRect().height;
  window.scrollBy({ top: galleryItemHeight * 2 - 10, behavior: 'smooth' });
});