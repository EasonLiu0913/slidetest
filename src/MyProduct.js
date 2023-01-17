import "./MyProduct.css"

function MyProduct(props) {
  console.log("props", props)
  return (
    <div className="img-wrap">
      <img src={"./images/" + props.item.image} alt="" />
    </div>
  )
}

export default MyProduct
