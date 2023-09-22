import { useState, useRef, useEffect } from 'react'
import './slider.css'
import './thumb.css'
import { useAppSelector } from '../../../app/hooks'

function Slider({ percentage = 0, onChange }:any) {
  const [position, setPosition] = useState(0)
  const [marginLeft, setMarginLeft] = useState(0)
  const [progressBarWidth, setProgressBarWidth] = useState(0)

  const [visible, setVisible] = useState("invisible")



  const rangeRef:any = useRef()
  const thumbRef:any = useRef()

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar = ((rangeWidth-16) / 100) * percentage ; 
    setPosition(percentage)
    setMarginLeft(centerThumb)
    setProgressBarWidth(centerProgressBar)
  }, [percentage])


  const handleVisibleThumb=(visible:boolean)=>{
    if(visible){
      setVisible("visible");
    }
    else{
      setVisible("invisible");
    }
    console.log(("hi"));
  }



  return (
    <div className='slider-container'>
      <div
        className='progress-bar-cover'
        style={{
          width: `${progressBarWidth}px`
        }}
      ></div>
      <div
        className={'thumb '+visible}
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}
      ></div>
      <input
        type='range'
        value={position}
        ref={rangeRef}
        step='0.01'
        className='range '
        onChange={onChange}
        onMouseEnter={()=>handleVisibleThumb(true)}
        onMouseLeave={()=>handleVisibleThumb(false)}
      />
    </div>
  )
}

export default Slider