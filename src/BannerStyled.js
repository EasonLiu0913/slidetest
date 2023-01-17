import React from "react"

const BannerStyled = React.forwardRef((props, ref) => {
  return <div>{props.children}</div>
})

export default BannerStyled
