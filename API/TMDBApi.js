
const API_TOKEN = "aafa278da61d57e096f7ec519fd57bf0"

export function getFilmsFromApiWithSearchedText(text, page)// Permet d'appeler l'api TMDB et retourne les films en fonction d'un texte recherché
{
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' +
                    API_TOKEN + '&page=' + page +'&language=fr&query=' + text
    //url a appeler (on peut pas deviner car elle est ds la doc de l'api) + notre API + langue -> fr et query recherche des films en fonction d'un text
    
    return fetch(url) //fetch -> lib javascript avec 2 optiens : .then -> bien passé et .catch -> mal passé
        .then((response) => response.json()) // renvoi une reponse convertie en json
        .catch((error) => console.log(error)) // error -> on affiche un log avec l'error
}

export function getAllFilms(page)
{
    const url2 = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
                 API_TOKEN + '&page=' + page + '&language=fr&with_genres=10751&sort_by=popularity.desc&include_adult=true' //+ '&vote_count.gte=10000'//&primary_release_date.gte=2014-09-15' + 
    //'&primary_release_date.lte=2020-10-22'
    
    //+ '&sort_by=primary_release_date.desc&primary_release_date.gte=2018-11-25'

    return fetch(url2) //permet d'appeler l'api
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

/*
export function getAllFilms2()
{
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
    API_TOKEN + '&page=2&total_items=50&primary_release_date.gte=2014-09-15' + 
    '&primary_release_date.lte=2020-10-22'

    return fetch(url) //permet d'appeler l'api
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getAllFilms3()
{
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' +
    API_TOKEN + '&page=3&total_items=50&primary_release_date.gte=2014-09-15' + 
    '&primary_release_date.lte=2020-10-22'

    return fetch(url) //permet d'appeler l'api
    .then((response) => response.json())
    .catch((error) => console.error(error));
}*/

export function getImageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
    // pareil on ne pouvait pas savoir car c'est ds la doc de l'api
}

export function getFilmDetailFromApi (id) {
    const url2 = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + 
    '&language=fr'
    return fetch(url2) //permet d'appeler l'api
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
// export permet d'utiliser cette fonction dans nos components