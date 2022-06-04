import axios from "axios";
class Request {
    static DefaultSettings = {
        Protocol: "https",
        BaseUrl: process.env.REACT_APP_BACKEND_URL,
        Headers: {
            "Content-Type": "application/json",
        },
    }

    static basic(
        method,
        url,
        page,
        data = null,
    ) {
        return axios({
            method: method,
            url: `${this.DefaultSettings.Protocol}://${this.DefaultSettings.BaseUrl}${url}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
            data: data
        });
    }

    static get(url = {}, page) {
        console.log("Page",page);
        return this.basic("GET", url, page);
    }
    static post(url, data = {}) {
        return this.basic("POST", url, data);
    }
    static delete(url, data = {}) {
        return this.basic("DELETE", url, data);
    }
    static patch(url, data = {}) {
        return this.basic("PATCH", url, data);
    }
}
export default Request;