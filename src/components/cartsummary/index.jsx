export const CartSummary = ({product}) => {
    
    return (
        <div className="d-flex-row flex-sp-btw" style={{borderBottom: "2px solid purple", padding:"5px", margin: "5px"}}>
            <span style={{flex: "7"}}>{product.title}</span>
            <span style={{flex: "1"}}> | </span>
            <span style={{flex: "2"}}>₹{product.price}</span>
        </div>
    )
}