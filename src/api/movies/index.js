import Request from "..";

class MoviesApi {

    static path = "/movie";
    static page = 1;

    static getMovie(id) {
        return Request.get(`${this.path}/${id}`);
    }
    static getPopular(append = false) {
        if (append)
            return Request.get(`${this.path}/popular`,null, this.page);
        return Request.get(`${this.path}/popular`);
    }
    static getTopRated(append = false) {
        if (append)
            return Request.get(`${this.path}/top_rated`, null,this.page);
        return Request.get(`${this.path}/top_rated`);
    }
    static getNowPlaying(append = false) {
        if (append)
            return Request.get(`${this.path}/now_playing`,null, this.page);
        return Request.get(`${this.path}/now_playing`);

    }
    static getUpcoming(append = false) {
        if (append)
            return Request.get(`${this.path}/upcoming`, null,this.page);
        return Request.get(`${this.path}/upcoming`);
    }
}

export default MoviesApi;