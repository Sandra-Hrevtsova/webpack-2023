import './sass/main.scss';
import axios from 'axios';

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
    const API_KEY = '563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2';
    const options = {
        headers: {
            Authorization: API_KEY
        }
    }
    let queryParams = `?query=${value}&orientation=landscape&per_page=1&page=${p}`;
    const url = `https://api.pexels.com/v1/search${queryParams}`;
    return axios.get(url, options).then(({data}) => {
        console.log(data);
        page = data.page + 1;
        getResults(data.photos)
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