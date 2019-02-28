

const initialState = { favoritesFilm: [] }
// on cree initalState avec un tableau vide -> on mets le state nul initialiseé avec notre inialState
function toggleFavorite(state = initialState, action) {//(state, action) { // Creation de notre REDUCER
    let nextState
    switch (action.type) {  /*une action est un objet avec 2 parametres -> type(type d'action) &&
                            une value (objet aue l'on souhaite modifier ds le state) (pas obligatoire)*/
        case 'TOGGLE_FAVORITE':
            const favoritesFilmIndex = state.favoritesFilm.findIndex(item => item.id ===
                action.value.id ) //findIndex retourne l'index s'il existe sinon -1
            if (favoritesFilmIndex !== -1) {
                //le film est deja ds les favoris, on l'supp de la liste
                nextState = {
                    ...state, // on copie le state dans notre objet nextState
                    favoritesFilm: state.favoritesFilm.filter((item, index) => index !== 
                    favoritesFilmIndex)// filter enleve le film a l'index spécifié
                }
            }
            else {
                //le film n'est pas ds les favoris, on l'ajoute a la liste
                nextState = {
                    ...state,
                    /*on va créer une copie du tableau de film favoris  
                    "...state.favoritesFilm"  , auquel on ajoute le film passé via l'action*/
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }
            return nextState || state // selon si le nextState est rempli sinon on return state par default
        default:
            return state
    }
}

export default toggleFavorite