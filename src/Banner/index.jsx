import { useEffect, useState } from 'react'
import Image1 from '../images/image1.jpg'
import Image2 from '../images/image2.jpg'
import Image3 from '../images/image3.png'
import Image4 from '../images/image4.jpg'
import Image5 from '../images/image5.jpg'
import Image6 from '../images/image6.jpg'
import Image7 from '../images/image7.jpeg'
import Image8 from '../images/image8.jpeg'
import Image9 from '../images/image9.jpeg'
import Image10 from '../images/image10.jpeg'
import './style.scss'

export default function Banner() {
  const [imageList, setImageList] = useState([Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10])
  const [backgroundImage, setBackgroundImage] = useState(imageList.at(-1))
  const [isAnimating, setIsAnimating] = useState('')

  const onClickPrev = () => {
    if (isAnimating !== '') return
    setBackgroundImage(imageList.at(-2))
    setIsAnimating('prev')
  }

  const onPrevAnimationEnd = () => {
    const arr = [...imageList]
    const lastItem = arr.pop()
    arr.unshift(lastItem)
    setImageList(arr)
    setIsAnimating('')
  }

  const onClickNext = () => {
    if (isAnimating !== '') return
    setIsAnimating('next')
  }

  const onNextAnimationEnd = () => {
    const arr = [...imageList]
    const firstItem = arr.shift()
    arr.push(firstItem)
    setImageList(arr)
    setBackgroundImage(arr.at(-1))
    setIsAnimating('')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      onClickNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [isAnimating])

  return (
    <div className="banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {isAnimating === 'next' ? (
        <img className="image-small" src={imageList[0]} onAnimationEnd={onNextAnimationEnd} />
      ) : isAnimating === 'prev' ? (
        <img className="image-big" src={imageList.at(-1)} onAnimationEnd={onPrevAnimationEnd} />
      ) : (
        ''
      )}

      <div className={`slider ${isAnimating}`}>
        {imageList.map((item) => (
          <img src={item} key={item} />
        ))}
      </div>

      <div className="arrows">
        <button onClick={onClickPrev}>{'<'}</button>
        <button onClick={onClickNext}>{'>'}</button>
      </div>
    </div>
  )
}
