import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {imagesSearchService} from "./services";
import {createMarkup} from "./markup"

const refs = {
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery')
}

refs.searchForm.addEventListener('submit', onSearchSubmit)
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick)


refs.loadMoreBtn.classList.add('is-hidden')
let page = 1;
let perPage = 40
let query = '';
let simpleLightBox = new SimpleLightbox('.gallery a')


async function onSearchSubmit(e) {
    e.preventDefault()
    refs.galleryContainer.innerHTML = ""
    page = 1

    query = e.target.elements.searchQuery.value.trim()
    if (query === '') {
        Notiflix.Notify.failure(
          'The search string cannot be empty. Please specify your search query.'
        );
        return;
    }

    try {
        const fetchResault = await imagesSearchService(query, page)
        const {data: {hits, totalHits}} = fetchResault
    if (totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return
      }
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    refs.galleryContainer.innerHTML = createMarkup(hits)
    simpleLightBox.refresh()
    refs.loadMoreBtn.classList.remove('is-hidden')
    e.target.reset()
    } catch (error) {
        Notiflix.Notify.failure(`Oops, something went wrong! ${error.message}`);
    }

    
}

async function onLoadMoreClick() {
    page += 1
    try {
        const loadMoreImages = await imagesSearchService(query, page)
        const {data: {hits, totalHits}} = loadMoreImages
        const loadedImages = page * 40
        refs.galleryContainer.insertAdjacentHTML('beforeend', createMarkup(hits))
        if (loadedImages > totalHits) {
        
            Notiflix.Notify.failure(
                "We're sorry, but you've reached the end of search results."
            );
            refs.loadMoreBtn.classList.add('is-hidden')
            return
        }
        simpleLightBox.refresh();
    } catch (error) {
        Notiflix.Notify.failure(`Oops, something went wrong! ${error.message}`);
    }
}