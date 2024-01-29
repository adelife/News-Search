/**
 * Отримуємо ключ https://newsapi.org/
 * Запити робитимемо на http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
 * dd82ff3604224bf1b224da3ef75c9135
 * Пагінація: номер групи та кількість елементів групи
 * - Завантажуємо статті при самітті форми
 * - Завантажуємо статті при натисканні на кнопку «Завантажити ще»
 * - Оновлюємо групу в параметрах запиту
 * - Рендерим статті
 * - Скидання значення при пошуку за новим критерієм
 * - Показуємо спинер поки йде запит
 */
import appendArticlesMarkup from "./templates/articles.js";
import {getNews } from "./services/newsAPI.js";
// import buttonService from "./services/buttonService.js";

const refs = {
  searchForm: document.querySelector(".search-form"),
  articlesContainer: document.querySelector(".articles"),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  preloader: document.getElementById("preloader"),
};
const hiddenClass=  "is-hidden";
let query = "";
let page = 1;

// обʼєкт з інформацією, яка нам потрібна для запиту
// const queryParams = {
//   query: "",
//   page: 1,
//   maxPage: 0,
//   pageSize: 5,
// };

refs.searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event){
    event.preventDefault();
    refs.articlesContainer.innerHTML = "";
    page = 1;
    const form = event.currentTarget;
    query = form.elements.query.value.trim();
   
    if(!query){
        return;    //раннє повернення
    }
try {
    const {articles} = await getNews(query);
    appendArticlesMarkup(articles, refs.articlesContainer);
if(articles.length > 0){
    refs.loadMoreBtn.classList.remove(hiddenClass);
    refs.loadMoreBtn.addEventListener("click", handleLoadMore);
}else{
    refs.loadMoreBtn.classList.add(hiddenClass);
    


}



} catch (error) {
    console.log(error);
    
}finally {
    form.reset()
}
   

async function handleLoadMore(){
    page += 1
    try {
        const {articles} = await getNews(query, page);
        appendArticlesMarkup(articles, refs.articlesContainer);
}catch (error) {
    console.log(error);
}
}
}