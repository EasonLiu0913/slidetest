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
  const dragFatherDom = useRef()
  const dragDom = useRef(null)
  const indexRef = useRef(0)
  const maxCount = useRef(0)
  const maxWidth = useRef(0)
  const autoPlay = useRef(true)

  const pathname = useRef("./images/")
  const direction = useRef(1)

  const getCurrent = (ref) => ref.current

  const changePage = (distance = 0) => {
    if (!getCurrent(dragDom)) return
    try {
      isTransition.current = true
      // getCurrent(dragDom).style.transform = `translateX(${distance}px)`
    } catch (e) {
      console.log("changePage err:", e)
    }
  }
  //輪播牆
  useEffect(() => {
    if (!bannerData?.length || !getCurrent(dragDom)) return
    const carouselBanner = setInterval(() => {
      //輪播下一張圖

      if (getCurrent(indexRef) >= getCurrent(maxCount)) {
        direction.current = -1
      }

      if (getCurrent(indexRef) === 0) {
        direction.current = 1
      }

      const moveDistance =
        getCurrent(dragFatherDom).clientWidth * getCurrent(indexRef) * -1
      setDistance(moveDistance)

      //計算頁數
      indexRef.current += direction.current
    }, 3000)
    return () => {
      clearInterval(carouselBanner)
      changePage()
      autoPlay.current = true
    }
  }, [])

  useEffect(() => {
    maxCount.current = bannerData.length - 1
  }, [bannerData])

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
