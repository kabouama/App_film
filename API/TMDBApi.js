const API_TOKEN = "aafa278da61d57e096f7ec519fd57bf0"

export function getFilmsFromApiWithSearchedText(text)// Permet d'appeler l'api TMDB et retourne les films en fonction d'un texte recherché
{
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' +
                    API_TOKEN + '&language=fr&query=' + text
    //url a appeler (on peut pas deviner car elle est ds la doc de l'api) + notre API + langue -> fr et query recherche des films en fonction d'un text
    
    return fetch(url) //fetch -> lib javascript avec 2 optiens : .then -> bien passé et .catch -> mal passé
        .then((response) => response.json()) // renvoi une reponse convertie en json
        .catch((error) => console.log(error)) // error -> on affiche un log avec l'error
}

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