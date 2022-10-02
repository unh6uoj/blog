import React, { useEffect, useRef, useState } from 'react'

function No() {
    const onClickNo = () => {
        alert('바보')
    }
    return (
        <div>
            <h1>
                노뿡빵
            </h1>
            <button onClick={onClickNo}>
                여기를 눌러보세요
            </button>
        </div>
    )
}

export default No;