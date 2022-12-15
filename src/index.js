import {fetchImages} from './fetchImages'
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const input = document.querySelector("[name=searchQuery]");
const searchBtn = document.querySelector(".search-form__button");
const gallery = document.querySelector(".gallery");
const loadBtn = document.querySelector(".load-more");

loadBtn.style.display = "none";


let pageNumber = 1;
let searchInput = '';
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    gallery.innerHTML = '';
    pageNumber = 1;
    loadBtn.style.display = 'none';
    searchInput = input.value.trim();
    if (searchInput.length !== 0) {
        fetchImages(searchInput, pageNumber).then(response => {
            if (response.hits.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            } else {
                createGallery(response.hits);
                Notify.success(`Hooray! We found ${response.totalHits} images.`);
                if (response.totalHits > 40) {
                   loadBtn.style.display = 'block'; 
                }  
                gallerySimpleLightbox.refresh();
            }   
        })
        .catch(error => {
            Notify.failure(`Sorry, something went wrong`);
        }) 
        
    }
})

loadBtn.addEventListener("click", () => {
    pageNumber++;
    searchInput = input.value.trim();
    fetchImages(searchInput, pageNumber).then(response => {
        createGallery(response.hits)
        if (response.hits.length < 40) {
            loadBtn.setAttribute('disabled', true);

            window.addEventListener('scroll', () => {
                const offset = window.innerHeight + window.pageYOffset;
                if (offset >= document.body.scrollHeight) {

                    Notify.info(
                        "We're sorry, but you've reached the end of search results."
                    );
                }
            })
                
               
        }
    })
        
        .catch(error => {
            Notify.failure(`Sorry, something went wrong`);
        });
    })
                
                           
                   
function createGallery(images) {
  const markup = images
    .map(image => {
        return `<li class=gallery-list__item><div class="photo-card">
        <a class="photo-card__link" href=${image.largeImageURL}>
  <img class="photo-card__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b> ${image.likes}
    </p>
    <p class="info-item">
      <b>Views:</b> ${image.views}
    </p>
    <p class="info-item">
      <b>Comments:</b> ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b> ${image.downloads}
    </p>
  </div>
</div></li>`;
    })
    .join('');

  gallery.innerHTML += markup;
}

