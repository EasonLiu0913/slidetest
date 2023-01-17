import React from "react"

const PerBanner = React.forwardRef((props, ref) => {
  const { pathname, banner } = props
  console.log("perBanner", props)
  return (
    <div style={{ width: "100%", flexShrink: 0 }}>
      <img src={pathname + banner.img} style={{ width: "100%" }} alt="" />
    </div>
  )
})

export default PerBanner
