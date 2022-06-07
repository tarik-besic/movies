import Request from "..";

class TvShowsApi {

    static path = "/tv";
    static page = 1;
    static getShow(id) {
        return Request.get(`${this.path}/${id}`);
    }
    static getPopular(append = false) {
        if (append)
            return Request.get(`${this.path}/popular`, null, this.page);
        return Request.get(`${this.path}/popular`);
    }
    static getTopRated(append = false) {
        if (append)
            return Request.get(`${this.path}/top_rated`, null, this.page);
        return Request.get(`${this.path}/top_rated`);
    }
    static getOnTheAir(append = false) {
        if (append)
            return Request.get(`${this.path}/on_the_air`, null, this.page);
        return Request.get(`${this.path}/on_the_air`);
    }
}

export default TvShowsApi;