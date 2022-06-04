import Request from "..";

class TvShowsApi {

    static path = "/tv";
    static page = 1;
    static getShow(id) {
        return Request.get(`${this.path}/${id}`);
    }
    static getPopular() {
        return Request.get(`${this.path}/popular`, this.page);
    }
    static getTopRated() {
        return Request.get(`${this.path}/top_rated`, this.page);
    }
    static getOnTheAir() {
        return Request.get(`${this.path}/on_the_air`, this.page);
    }
}

export default TvShowsApi;