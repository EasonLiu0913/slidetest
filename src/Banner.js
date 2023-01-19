import { useState, useRef, useEffect, forwardRef } from "react"
import BannerStyled from "./BannerStyled"
import PerBanner from "./PerBanner"
import "./Banner.css"

const Banner = forwardRef((props, ref) => {
  const [bannerData, setBannerData] = useState([
    { name: "a", img: "item-1.jpg" },
    { name: "b", img: "item-2.jpg" },
    { name: "c", img: "item-3.jpg" },
  ])
  const [distanceArr, setDistanceArr] = useState([])

  const [distance, setDistance] = useState(0)

  //輪播Banner
  const dragFatherDom = useRef()
  const dragDom = useRef(null)
  const indexRef = useRef(0)
  const maxCount = useRef(0)
  const maxWidth = useRef(0)
  const dragFatherDomWidth = useRef(0)
  const autoPlay = useRef(true)
  const pathname = useRef("./images/")
  const isTransition = useRef(false)

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
      let moveDistance =
        getCurrent(dragFatherDom).clientWidth * getCurrent(indexRef) * -1

      console.log("setInterval", indexRef.current)
      //輪播下一張圖

      if (getCurrent(indexRef) >= getCurrent(maxCount)) {
        direction.current = -1
      }

      if (getCurrent(indexRef) === 0) {
        direction.current = 1
      }

      // changePage(moveDistance)
      setDistance(moveDistance)

      setDistanceArr(
        bannerData.map((v, i) => {
          return moveDistance + getCurrent(dragFatherDom).clientWidth * i
        })
      )

      //計算頁數
      indexRef.current += direction.current
    }, 3000)
    return () => {
      console.log("clear setInterval", indexRef.current)
      clearInterval(carouselBanner)
      changePage()
      autoPlay.current = true
    }
  }, [])

  useEffect(() => {
    console.log("distanceArr", distanceArr)
  }, [distanceArr])

  useEffect(() => {
    console.log("width", dragFatherDom.current)
    dragFatherDomWidth.current = getCurrent(dragFatherDom).clientWidth
    maxCount.current = bannerData.length - 1
  }, [bannerData])

  return bannerData?.length === 0 ? null : (
    <div ref={dragFatherDom} style={{ contain: "paint" }}>
      <div className="baner-container" ref={dragDom}>
        {/* {bannerData?.map((eachBanner, index) => ( */}
        <div
          style={{
            width: dragFatherDomWidth.current,
            flexShrink: 0,
            transform: `translateX(${distance}px)`,
          }}
        >
          <img
            src={pathname.current + bannerData[0].img}
            style={{
              width: dragFatherDomWidth.current,
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: dragFatherDomWidth.current,
            flexShrink: 0,
            transform: `translateX(${distance}px)`,
          }}
        >
          <img
            src={pathname.current + bannerData[1].img}
            style={{
              width: dragFatherDomWidth.current,
            }}
            alt=""
          />
        </div>
        <div
          style={{
            width: dragFatherDomWidth.current,
            flexShrink: 0,
            transform: `translateX(${distance}px)`,
          }}
        >
          <img
            src={pathname.current + bannerData[2].img}
            style={{
              width: dragFatherDomWidth.current,
            }}
            alt=""
          />
        </div>
        {/* ))} */}
        {/* {bannerData[0] && <PerBanner banner={bannerData[0]} />} */}
        {/* {console.log("getCurrent(dragFatherDom)", dragFatherDom.current)} */}
      </div>
    </div>
  )
})
export default Banner
