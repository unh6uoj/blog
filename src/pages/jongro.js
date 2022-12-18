import React, { useEffect, useRef, useState } from 'react'
import "./jongro.scss";
function Jongro() {

    const aaas = (e) => {
        document.getElementById('ww').classList.toggle("on");
    }
    return (
        <div>
            <div>
                윤영,,,빨리 나와,,, 집에서 고독사 할 일 있어?,,<br />
                우리 너무 심심해,,,, ㅠㅠ 밖에 피크닉 하기 너무 좋은 날씨라구우<br />
                너 나오면 우리가 혼내지 않을게 ㅠ<br />
                잘 대우해 줄게,,, 안울릴게,,,<br />
                그럼,,<br />
                ,,,<br />
                ,<br />
                ,<br />
                연락 기다린다,,,🫵 🙏<br />
            </div>
            <button onClick={aaas}>여길 눌러봐 !</button>
            <h1 id="ww">윤영바보</h1>
        </div>
    )
}

export default Jongro;