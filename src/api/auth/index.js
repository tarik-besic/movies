import Request from "..";

class AuthApi {

    static path = "/authentication";

    static getToken() {
        return Request.get(`${this.path}/token/new`);
    }
    static getUserSession(token) {
        const data={
            request_token:token
        }
        return Request.post(`${this.path}/session/new`,data);
    }

}

export default AuthApi;