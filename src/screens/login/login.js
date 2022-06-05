import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import AuthApi from '../../api/auth'

const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = useRef(null)

    useEffect(() => {
        token.current = searchParams.get("request_token")
        const makeReq = async () => {
            try {
                if (!token.current) {
                    const res = await AuthApi.getToken();
                    token.current = res.data.request_token
                    window.location.href = `https://www.themoviedb.org/authenticate/${token.current}?redirect_to=http://localhost:3000/login`
                } else {
                    const res = await AuthApi.getUserSession(token.current);
                    if(res.data.success){
                        localStorage.setItem('session_id',res.data.session_id)
                    }
                    window.location.href = `http://localhost:3000/`
                }
            } catch (err) {
                console.log(err)
            }
        }
        makeReq()
    }, [])

    return (
        <>
            <h1>LOGIN</h1>
        </>
    )
}

export default Login