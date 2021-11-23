import { useState } from "react";
import {
    Link
  } from "react-router-dom";
  
 const BookProduct = ({products}) => {
    const [ dropDataSelector, setDropDataSelector ] = useState();

    const productMap = Array();

    products.forEach((producObj, objIdx)=>{
        productMap[producObj.code] = Array();
        productMap[producObj.code]['price'] = producObj.price;
        productMap[producObj.code]['durability'] = producObj.durability;        
        
    })
    
    function changeEventFunc( event ) {
        console.log(event.target.value);

        setDropDataSelector("Price: "+productMap[event.target.value]['price']+" durability : "+productMap[event.target.value]['durability'])
    }

    console.log("I AM HERE");
    console.log(productMap);

    return ( 
        <div className="mx-auto">
            <p className="lead mb-4">Hello, Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>

            <div className="dropdown">
                <label htmlFor="cars">Products List:</label>

                <select name="cars" id="cars" onChange={ (event) => { changeEventFunc(event) } } >
                    <option key="nan" value="">Select Product</option>               
                    {
                        products.map( (objProduct, index) => (
                            <option key={ index } value={ objProduct.code }>{ objProduct.name }</option>               
                        ))
                    }
                </select>

                <br />Only the Available Products are being Genarated on Drop Down.

                <br /><br /><br /><br />{dropDataSelector}
            </div>

            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link class="btn btn-primary" to="/" role="button">Home</Link>
            </div>
        </div>
     );
}
 
export default BookProduct;