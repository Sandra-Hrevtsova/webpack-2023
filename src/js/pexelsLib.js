import { createClient } from 'pexels';

const API_KEY = '563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2';
const client = createClient(API_KEY);

let query, page;

const form = document.getElementById('searchForm');
const list = document.getElementById('results');
const loadMore = document.getElementById('load-more');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target.elements.search.value);
    query = e.target.elements.search.value;
    getFetch(query, '1');
})

loadMore.addEventListener('click', (e) => getFetch(query, page));

function getFetch(value, p) {
    return client.photos.search({query: value, page: p, per_page: 2}).then((result) => {
        page = result.page + 1;
        getResults(result.photos)
    })
}

function createItem(source, description) {
    return `<li>
        <img src=${source} alt=${description}/>
    </li>`
}

function getResults (photos) {
    const result = photos.map(image => createItem(image.src.tiny, image.alt)).join('')
    list.insertAdjacentHTML('beforeend', result)
}