import {fetchImages} from './fetchImages'
import { Notify } from 'notiflix';

const input = document.querySelector("[name=searchQuery]");
const searchBtn = document.querySelector(".search-form__button");
const gallery = document.querySelector(".gallery");


let pageNumber = 1;

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    gallery.innerHTML = '';
    pageNumber = 1;
    const searchInput = input.value.trim();
    if (searchInput.length !== 0) {
        fetchImages(searchInput, pageNumber).then(response => {
            if (response.hits.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            } else {
                createGallery(response.hits);
                Notify.success(`Hooray! We found ${response.totalHits} images.`)
                
            }
        })
        .catch(error => {
            Notify.failure(`Sorry, something went wrong`);
        }) 
        
    }
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

/* 
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const btnLoadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

btnLoadMore.style.display = 'none';



btnSearch.addEventListener('click', e => {

      } else {
        makeGallery(foundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    });
  }
});

btnLoadMore.addEventListener('click', () => {
  pageNumber++;
  const trimmedValue = input.value.trim();
  btnLoadMore.style.display = 'none';
  fetchImages(trimmedValue, pageNumber).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      makeGallery(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} images.`
      );
      btnLoadMore.style.display = 'block';
    }
  });
});


function cleanGallery() {

    btnLoadMore.style.display = 'none';
} */