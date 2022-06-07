import Request from "..";

class SearchApi {

    static path = "/search";
    static page = 1;

    static getMedia(query, media, append) {
        if (media === "movies") {
            if (append) {
                return Request.get(`${this.path}/movie`, null, this.page, query);
            }
            return Request.get(`${this.path}/movie`, null, 1, query);
        }
        if (append)
            return Request.get(`${this.path}/tv`, null, this.page, query);
        return Request.get(`${this.path}/tv`, null, 1, query);
    }
}

export default SearchApi