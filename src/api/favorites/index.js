import Request from "..";

class FavoritesApi {

    static path = `/account/0/favorite`;
    static page = 1;

    static getFavorites(media_type,session_id) {
        return Request.get(`${this.path}/${media_type}`,session_id);
    }
    static markFavorite(media_type,media_id,session_id,favorite) {
        const data={
            media_type,
            media_id,
            favorite:favorite
          }
        return Request.post(`${this.path}`,data,session_id);
    }
   
}

export default FavoritesApi;