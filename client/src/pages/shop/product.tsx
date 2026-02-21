import type { IProduct } from "../../models/interfaces"
import "./styles.css"

interface Props{
    product :IProduct
}
export const Product= (props : Props) =>{
    const {productName,description,price,stockQuantity,imageURL} = 
    props.product;
    return (
        <div className="product">
            <img src={imageURL}/>
            <div className="description">
                <h3>{productName}</h3>
                <p>{description}</p>
                <p>₹{price}</p>
            </div> 
            <button className="add-to-cart-bttn">Add to Cart</button>
            <div className="stock-quantity">
                {stockQuantity === 0 && <h1>OUT OF STOCK</h1>}
            </div>
        </div>
    );
}