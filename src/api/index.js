import axios from "axios";
class Request {
    static DefaultSettings = {
        BaseUrl: process.env.REACT_APP_BACKEND_URL,
        Headers: {
            "Content-Type": "application/json",
        },
    }

    static basic(
        method,
        url,
        data = null,
        session_id = null,
        page = null,
        query=null
    ) {
        return axios({
            method: method,
            url: `https://${this.DefaultSettings.BaseUrl}${url}?api_key=${process.env.REACT_APP_API_KEY}${session_id ? `&session_id=${session_id}` : ""}${query ? `&query=${query}` : ""}${page != null ? `&page=${page}` : ""}`,
            data: data
        });
    }

    static get(url = {}, session_id, page,query=null) {

        return this.basic("GET", url, null, session_id, page,query);
    }
    static post(url, data = {}, session_id = null) {
        return this.basic("POST", url, data, session_id);
    }
    static delete(url, data = {}) {
        return this.basic("DELETE", url, data);
    }
    static patch(url, data = {}) {
        return this.basic("PATCH", url, data);
    }
}
export default Request;