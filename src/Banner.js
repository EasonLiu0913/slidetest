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

  //輪播Banner
  const dragFatherDom = useRef()
  const dragDom = useRef(null)
  const indexRef = useRef(1)
  const maxCount = useRef(0)
  const maxWidth = useRef(0)
  const autoPlay = useRef(true)
  const pathname = useRef("./images/")

  const getCurrent = (ref) => ref.current

  const changePage = (distance = 0) => {
    if (!getCurrent(dragDom)) return
    try {
      setTimeout(() => {
        getCurrent(dragDom).style.transform = `translateX(${distance}px)`
      }, 100)
    } catch (e) {
      console.log("changePage err:", e)
    }
  }
  //輪播牆
  useEffect(() => {
    if (!bannerData?.length || !getCurrent(dragDom)) return
    const carouselBanner = setInterval(() => {
      //輪播下一張圖
      let moveDistance
      if (getCurrent(indexRef) >= getCurrent(maxCount)) {
        changePage(getCurrent(dragFatherDom).clientWidth * -1)
        indexRef.current = 0
        return
      } else
        moveDistance =
          getCurrent(dragFatherDom)?.clientWidth * getCurrent(indexRef)
      changePage(moveDistance * -1)
      //計算頁數
      indexRef.current++
    }, 3000)
    return () => {
      clearInterval(carouselBanner)
      changePage()
      autoPlay.current = true
    }
  }, [JSON.stringify(bannerData)])

  useEffect(() => {
    console.log("width", dragFatherDom.current)
  }, [bannerData])

  //計算總數跟最大寬度
  useEffect(() => {
    if (bannerData.length === 0) return
    maxCount.current = bannerData?.length ?? 0
    maxWidth.current = getCurrent(dragFatherDom).clientWidth * maxCount.current
  }, [bannerData?.length])

  function handleClick() {
    console.log(dragFatherDom.current.clientWidth)
    console.log(maxWidth.current)
    console.log(maxCount.current)
    // setBannerData([...bannerData, { name: "c", img: "item-3.jpg" }])
  }

  return bannerData?.length === 0 ? null : (
    <div ref={dragFatherDom} style={{ contain: "paint" }}>
      <button onClick={handleClick}>Click</button>
      <div className="baner-container" ref={dragDom}>
        {bannerData?.map((eachBanner, index) => (
          <PerBanner
            key={index}
            banner={eachBanner}
            pathname={pathname.current}
          />
        ))}
        {/* {bannerData[0] && <PerBanner banner={bannerData[0]} />} */}
        {/* {console.log("getCurrent(dragFatherDom)", dragFatherDom.current)} */}
      </div>
    </div>
  )
})
export default Banner
