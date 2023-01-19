import { useState, useRef, useEffect, forwardRef } from "react"
import PerBanner from "./PerBanner"
import "./Banner.css"

const Banner = forwardRef((props, ref) => {
  const [bannerData, setBannerData] = useState([
    { name: "a", img: "item-1.jpg" },
    { name: "b", img: "item-2.jpg" },
    { name: "c", img: "item-3.jpg" },
  ])

  const [distance, setDistance] = useState(0)

  //輪播Banner
  const dragFatherDom = useRef(null)
  const dragDom = useRef(null)
  const indexRef = useRef(0)
  const autoPlay = useRef(true)

  const pathname = useRef("./images/")
  const direction = useRef(1)

  const getCurrent = (ref) => ref.current

  //輪播牆
  useEffect(() => {
    if (!bannerData?.length || !getCurrent(dragDom)) return
    const carouselBanner = setInterval(() => {
      //輪播下一張圖

      if (getCurrent(indexRef) >= bannerData.length - 1) {
        direction.current = -1
      }

      if (getCurrent(indexRef) === 0) {
        direction.current = 1
      }

      setDistance(
        getCurrent(dragFatherDom).clientWidth * getCurrent(indexRef) * -1
      )

      //計算頁數
      indexRef.current += direction.current
    }, 3000)
    return () => {
      clearInterval(carouselBanner)
      autoPlay.current = true
    }
  }, [])

  return bannerData?.length === 0 ? null : (
    <div ref={dragFatherDom} style={{ contain: "paint" }}>
      <div className="baner-container" ref={dragDom}>
        {bannerData?.map((eachBanner, index) => (
          <PerBanner
            banner={eachBanner}
            pathname={pathname.current}
            distance={distance}
          />
        ))}
      </div>
    </div>
  )
})
export default Banner
