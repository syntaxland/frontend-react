// HomeScreen
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../Product";
import { listProducts } from "../../actions/productAction";
import Loader from "../Loader";
import Message from "../Message";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1 className="text-center">Latest Products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {currentItems.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <button className="page-link" onClick={() => paginate(number)}>
                    {number}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === pageNumbers.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}

export default HomeScreen;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Row, Col } from "react-bootstrap";
// import Product from "../Product";
// import { listProducts } from "../../actions/productAction";
// import Loader from "../Loader";
// import Message from "../Message";

// function HomeScreen() {
//   const dispatch = useDispatch();
//   const productList = useSelector((state) => state.productList);
//   const { error, loading, products } = productList;
//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch]);

//   return (
//     <div>
//       <h1 className="text-center">Latest Products</h1>

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <Row>
//           {products.map((product) => (
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//               {/* <h3>{product.name}</h3> */}
//               <Product product={product} />
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// }

// export default HomeScreen;


// // Import statements...

// function HomeScreen() {
//     // Other code...
  
//     const toggleFavoriteHandler = (product) => {
//       dispatch(toggleFavorite(product));
//     };
  
//     // Other code...
    
//     return (
//       <div>
//         <h1 className="text-center">Latest Products</h1>
  
//         {loading ? (
//           // Loading state...
//         ) : error ? (
//           // Error state...
//         ) : (
//           <Row>
//             {products.map((product) => (
//               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 {/* Product details... */}
//                 <Button
//                   onClick={() => toggleFavoriteHandler(product)}
//                   className="btn-block mt-3"
//                   type="button"
//                   variant={isFavorite(product) ? "danger" : "outline-danger"}
//                 >
//                   <i
//                     className={
//                       isFavorite(product) ? "fas fa-heart" : "far fa-heart"
//                     }
//                   ></i>{" "}
//                   {isFavorite(product)
//                     ? "Remove from Favorites"
//                     : "Add to Favorites"}
//                 </Button>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </div>
//     );
//   }
  
//   export default HomeScreen;



// src code
// import React, {useState,useEffect} from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// import {Row,Col} from "react-bootstrap";
// import Product from '../Product';
// import { listProducts } from '../../actions/productAction';
// import Loader from '../Loader';
// import Message from '../Message';

// function HomeScreen() {
//     const dispatch = useDispatch();
//     const productList = useSelector((state)=>state.productList);
//     const {error,loading,products} =productList
//     useEffect(()=>{
//         dispatch(listProducts());
//     },[dispatch])

//     return (
//         <div>
//             <h1 className="text-center">Latest Products</h1>

//             {loading ?(
//                 <Loader />
//             ):error ?(
//               <Message variant='danger'>{error}</Message>
//             ):

//             <Row>
//                {products.map((product)=>(
//                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>

//                        {/* <h3>{product.name}</h3> */}
//                        <Product  product={product}/>
//                    </Col>
//                ))}
//             </Row>

//             }

//         </div>
//     )
// }

// export default HomeScreen

// import React, {useState, useEffect} from "react";
// // import products from "../../products";
// import { Row, Col } from "react-bootstrap";
// import Product from "../Product";
// import axios from 'axios';
// import { listProducts } from '../../actions/productAction';

// function HomeScreen() {

//   const [products, setProducts] = useState([])
//   useEffect(()=>{
//     async function fetchProducts(){
//       const {data} = await axios.get('/api/products/')
//       setProducts(data)
//     }
//     fetchProducts()
//   },[])

//   return (
//     <div>
//       <h1 className="text-center">Latest Products</h1>
//       <Row>
//         {products.map((product) => (
//           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//             {/* <h3>{product.name}</h3> */}
//             <Product product={product} />
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }

// export default HomeScreen;


