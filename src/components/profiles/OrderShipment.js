// OrderShipment.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getShippingAddress } from '../../actions/orderActions';
import Message from '../Message';
import Loader from '../Loader';

function OrderShipment() {
  const dispatch = useDispatch();

  const shippingAddressState = useSelector((state) => state.shippingAddress);
  const { loading, error, shippingAddress } = shippingAddressState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shippingAddress.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(shippingAddress.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log("Shipping Address Data:", shippingAddress);

  useEffect(() => {
    dispatch(getShippingAddress);
  }, [dispatch]);

  return (
    <div>
      <h2>Shipping Address Details</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>SN</th>
                {/* <th>Order ID</th> */}
                {/* <th>User</th> */}
                {/* <th>Email</th> */}
                <th>Address</th>
                <th>City</th>
                <th>Postal Code</th>
                <th>Country</th>
                <th>Shipping Price</th>
                <th>Is Delivered</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((address, index) => (
                <tr key={address._id}>
                  <td>{index + 1}</td>
                  {/* <td>{address.order.order_id}</td> */}
                  {/* <td>{address.order.user.first_name}</td> */}
                  {/* <td>{address.order.user.email}</td> */}
                  <td>{address.address}</td>
                  <td>{address.city}</td>
                  <td>{address.postalCode}</td>
                  <td>{address.country}</td>
                  <td>{address.shippingPrice}</td>
                  <td>{address.isDelivered ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
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
                    currentPage === number ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === pageNumbers.length ? 'disabled' : ''
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

export default OrderShipment;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getShippingAddress } from '../../actions/orderActions';

// const OrderShipment = () => {
//   const dispatch = useDispatch();
//   const { loading, shippingAddress, error } = useSelector((state) => state.shippingAddress);

//   useEffect(() => {
//     dispatch(getShippingAddress());
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>Shipping Address Details</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <div>
//           <p>Address: {shippingAddress.address}</p>
//           <p>City: {shippingAddress.city}</p>
//           <p>Postal Code: {shippingAddress.postalCode}</p>
//           <p>Country: {shippingAddress.country}</p>
//           {/* Include other fields as needed */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderShipment;
