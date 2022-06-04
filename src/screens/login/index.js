import React, { useEffect, useState } from 'react'

const Login = () => {
    const [select, setselect] = useState(1)

    useEffect(() => {

        console.log("I run", select)

    }, [select])

    return (
        <div className='screen login-screen'>
            <buton onClick={() => { setselect(select) }}>Hit</buton>
        </div>
    )
}

export default Login