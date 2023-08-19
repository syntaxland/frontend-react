import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, listShippingAddresses, confirmDelivery } from "../../actions/orderActions";
import Pagination from '../components/Pagination';

const Shipments = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const orderId = match.params.id;

  const shippingAddressesList = useSelector((state) => state.shippingAddressesList);
  const { loading: loadingShippingAddresses, error: errorShippingAddresses, shippingAddresses } = shippingAddressesList;

  useEffect(() => {
    dispatch(listShippingAddresses());
  }, [dispatch]);

  const handleConfirmDelivery = (orderId, shippingAddressId) => {
    if (window.confirm('Are you sure you want to confirm delivery for this order?')) {
      dispatch(confirmDelivery(orderId, shippingAddressId));
    }
  };

  const indexOfLastAddress = currentPage * itemsPerPage;
  const indexOfFirstAddress = indexOfLastAddress - itemsPerPage;
  const currentShippingAddresses = shippingAddresses.slice(indexOfFirstAddress, indexOfLastAddress);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Shipping Addresses</h2>
      {loadingShippingAddresses ? (
        <p>Loading...</p>
      ) : errorShippingAddresses ? (
        <p>Error loading shipping addresses: {errorShippingAddresses}</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
                <th>Delivered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentShippingAddresses.map((address) => (
                <tr key={address.id}>
                  <td>{address.id}</td>
                  <td>{address.name}</td>
                  <td>{address.address}</td>
                  <td>{address.city}</td>
                  <td>{address.country}</td>
                  <td>{address.is_delivered ? 'Yes' : 'No'}</td>
                  <td>
                    {!address.is_delivered && (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleConfirmDelivery(orderId, address.id)}
                      >
                        Confirm Delivery
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={shippingAddresses.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Shipments;
