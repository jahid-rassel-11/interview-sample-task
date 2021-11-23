import { useEffect, useState } from 'react';
import './App.css';

//  For Routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navigation from './components/Navigation';
import ProductList from './components/ProductList';
import BookProduct from './components/BookProduct';


import useFetchDataHook from './FetchDataHook';

function App() {
  const [title, setTitle] = useState("Title");

  //  Product List Static
  /*
  const [products, setProduct] = useState([
    {
      "code":"p1",
      "name":"Air Compressor 12 GAS",
      "type":"plain",
      "availability":true,
      "needing_repair":false,
      "durability":3000,
      "max_durability":3000,
      "mileage":null,
      "price": 4500,
      "minimum_rent_period":1
    },
    {
      "code":"p2",
      "name":"Air Compressor 5 Electric",
      "type":"plain",
      "availability":true,
      "needing_repair":false,
      "durability":1500,
      "max_durability":2000,
      "mileage":null,
      "price": 6500,
      "minimum_rent_period":1
    },
    {
      "code":"p3",
      "name":"Dia Blade 14 inch",
      "type":"plain",
      "availability":true,
      "needing_repair":false,
      "durability":40000,
      "max_durability":50000,
      "mileage":null,
      "price": 3000,
      "minimum_rent_period":2
    },
    {
      "code":"p4",
      "name":"Copper Blade 5 inch",
      "type":"plain",
      "availability":false,
      "needing_repair":true,
      "durability":0,
      "max_durability":2000,
      "mileage":null,
      "price": 200,
      "minimum_rent_period":2
    },
    {
      "code":"p5",
      "name":"Copper Blade 5 inch",
      "type":"plain",
      "availability":false,
      "needing_repair":true,
      "durability":0,
      "max_durability":2000,
      "mileage":null,
      "price": 200,
      "minimum_rent_period":2
    },
    {
      "code":"p6",
      "name":"Copper Blade 8 inch",
      "type":"plain",
      "availability":true,
      "needing_repair":false,
      "durability":1500,
      "max_durability":2000,
      "mileage":null,
      "price": 300,
      "minimum_rent_period":2
    },
    {
      "code":"p7",
      "name":"Beam Clamp",
      "type":"plain",
      "availability":true,
      "needing_repair":false,
      "durability":15000,
      "max_durability":20000,
      "mileage":null,
      "price": 800,
      "minimum_rent_period":30
    },
    {
      "code":"p8",
      "name":"Beam Clamp",
      "type":"plain",
      "availability":true,
      "needing_repair":false,
      "durability":10000,
      "max_durability":20000,
      "mileage":null,
      "price": 800,
      "minimum_rent_period":30
    },
    {
      "code":"p9",
      "name":"Beam Clamp",
      "type":"plain",
      "availability":false,
      "needing_repair":false,
      "durability":5000,
      "max_durability":20000,
      "mileage":null,
      "price": 800,
      "minimum_rent_period":30
    },
    {
      "code":"m1",
      "name":"Boom lift 40",
      "type":"meter",
      "availability":true,
      "needing_repair":false,
      "durability":4000,
      "max_durability":8000,
      "mileage":10000,
      "price": 1000,
      "minimum_rent_period":4
    },
    {
      "code":"m2",
      "name":"Boom lift 60",
      "type":"meter",
      "availability":true,
      "needing_repair":false,
      "durability":8000,
      "max_durability":10000,
      "mileage":5000,
      "price": 1500,
      "minimum_rent_period":4
    },
    {
      "code":"m3",
      "name":"Boom lift 80",
      "type":"meter",
      "availability":false,
      "needing_repair":true,
      "durability":500,
      "max_durability":12000,
      "mileage":200,
      "price": 2000,
      "minimum_rent_period":2
    },
    {
      "code":"m4",
      "name":"Boom lift 100",
      "type":"meter",
      "availability":true,
      "needing_repair":false,
      "durability":4000,
      "max_durability":12000,
      "mileage":8500,
      "price": 2500,
      "minimum_rent_period":2
    },
    {
      "code":"m5",
      "name":"Boom lift 20",
      "type":"meter",
      "availability":true,
      "needing_repair":false,
      "durability":1200,
      "max_durability":8000,
      "mileage":600,
      "price": 500,
      "minimum_rent_period":1
    },
    {
      "code":"m6",
      "name":"Boom lift 20",
      "type":"meter",
      "availability":true,
      "needing_repair":false,
      "durability":8000,
      "max_durability":8000,
      "mileage":0,
      "price": 500,
      "minimum_rent_period":1
    },
    {
      "code":"m7",
      "name":"Boom lift 20",
      "type":"meter",
      "availability":true,
      "needing_repair":false,
      "durability":5000,
      "max_durability":8000,
      "mileage":1200,
      "price": 500,
      "minimum_rent_period":1
    },
    {
      "code":"m8",
      "name":"Boom lift 40",
      "type":"meter",
      "availability":true,
      "needing_repair":false,
      "durability":8000,
      "max_durability":10000,
      "mileage":2500,
      "price": 1000,
      "minimum_rent_period":2
    }
  ]);


  const [searchProductList, setSearchProductList] = useState(products);
  */
  
  //  Product List JSON Server Phase 2 [ Start 
  const [products, setProduct] = useState();
  const [searchProductList, setSearchProductList] = useState();

  //  Data File Location: data/data.json
  //  Run Command: npx json-server --watch data/jsonData.json --port 8000  
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState();

  useEffect(() => {
    console.log("Running 1 time");
    
    //fetch("http://1111localhost:8000/products123")
    fetch("http://localhost:8000/products")
      .then( (res) => {
        //console.log(res);
        if( !res.ok ) {
          setErrorText("Data Fetch Error");    
        }
        return res.json();
      })
      .then((result) => {
          setIsLoading(false);

          setProduct(result);
          setSearchProductList(result);
        })
      .catch( (error) => {
        setErrorText(error.message);
      })

  }, []);

  //////////////////////////////////////////////////////
  //    By Common File [ WILL COME BACK TO THIS ]     //
  //var { isPending, errorMessage, returnData: arrProducts } = useFetchDataHook('http://localhost:8000/products');

  //  Product List JSON Server Phase 2 [ End ]

  const [searchKeyWord, setSearchKeyWord] = useState();

  function search(event) {
    setSearchKeyWord(event.target.value.trim());  
    setSearchProductList( products.filter((product) => (product.code.toLowerCase().includes(event.target.value.toLowerCase()) || product.name.toLowerCase().includes(event.target.value.toLowerCase()))) );
  }

  function handleClick() {
    alert("handleClick");
  }

  return (
    <Router>
    <div className="App">
      
      {/*     Navigation [ Start ]    */}
      <Navigation></Navigation>
      {/*     Navigation [ End ]      */}
      

      <div className="container">

        <Switch>
          <Route exact path="/">
            <div className="px-4 py-2 my-2 text-center">
              <h1 className="display-5 fw-bold">{ title }</h1>

              <div className="row">
                <div className="col">
                  <div className="input-group mb-3">
                    { (searchKeyWord) ? "Part 2: "+searchKeyWord : "" }

                    <input type="text" className="form-control" onKeyUp={search} placeholder="Search By Code or Name" aria-label="Search By Code or Name" aria-describedby="button-addon2" />
                  </div>
                </div>
                
                <div className="col">
                  <Link class="btn btn-primary" to="/book-product" role="button">Book</Link>
                </div>
                <div className="col">
                  Column
                </div>
              </div>
              
              { isLoading && <p>Loading.....</p>  } 

              { errorText && <p>Something is very wrong.</p>  } 
              { searchProductList && <ProductList products={searchProductList}></ProductList> }
            </div>
          </Route>
        </Switch>


        <Switch>
          <Route exact path="/book-product">
            { products && <BookProduct products = {
                products.filter((product) => 
                  product.availability === true        
                )
              }
              ></BookProduct> 
            }
          </Route>
        </Switch>


        

      </div>
      
    </div>
    </Router>

    


  );
}

export default App;
