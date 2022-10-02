import React, { useEffect, useRef, useState } from 'react'
import './hanna.scss';

function Hanna() {
    const onClickHanna = () => {
        document.getElementById('cat').classList.toggle('is-visible');
    }

    const onClickImg = (event) => {
        event.target.classList.toggle('is-rotate');
    }

    return (
        <div>
            <h1>
                한나봉
            </h1>
            <button onClick={onClickHanna}>여기를 눌러보세요</button>
            <img id='cat' src='https://image.edaily.co.kr/images/photo/files/NP/S/2022/04/PS22042501396.jpg' onClick={onClickImg} />
        </div>
    )
}

export default Hanna;