import Request from "..";

class MoviesApi {

    static path = "/movie";
    static page = 1;

    static getMovie(id) {
        return Request.get(`${this.path}/${id}`);
    }
    static getPopular() {
        return Request.get(`${this.path}/popular`, this.page);
    }
    static getTopRated() {
        return Request.get(`${this.path}/top_rated`, this.page);
    }
    static getNowPlaying() {
        return Request.get(`${this.path}/now_playing`, this.page);
    }
    static getUpcoming() {
        return Request.get(`${this.path}/upcoming`, this.page);
    }
}

export default MoviesApi;