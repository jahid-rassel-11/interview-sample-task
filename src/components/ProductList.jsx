const ProductList = ({products}) => {
    function CreateProducyTableRow(objProduct, index) {
       return (
            <tr key={index}>
                <th scope="row">{ index+1 }</th>
                <td>{ objProduct.code }</td>
                <td>{ objProduct.name }</td>
                <td>{ objProduct.type }</td>
                <td>{ objProduct.availability ? "yes" : "no" }</td>
                <td>
                    { objProduct.durability }
                    <br />Max: { objProduct.max_durability }
                </td>
                <td>{ objProduct.price }</td>
            </tr>
       )
    }  

    function CreateProducyTable(arrProducts) {
        return (
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Availability</th>
                    <th scope="col">Durability</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrProducts.map( (objProduct, index) => CreateProducyTableRow(objProduct, index))
                    }
                </tbody>
            </table>
        );
    } 
    
    
    
    return (
        CreateProducyTable(products)
     );
}
 
export default ProductList;