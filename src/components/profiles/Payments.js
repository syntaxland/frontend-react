// Payments.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import { listPayments } from '../../actions/paymentActions';

function Payments() {
  const dispatch = useDispatch();

  const paymentList = useSelector((state) => state.paymentList);
  const { loading, error, payments } = paymentList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(payments.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    dispatch(listPayments());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center">Payments</h1>
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
              <th>Order ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Payment Reference</th> 
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((payment, index) => (
              <tr key={payment.id}>
                <td>{index + 1}</td>
                <td>{payment.order_id}</td>
                <td>{payment.user}</td>
                <td>{payment.amount}</td>
                <td>{payment.reference}</td>
                {new Date(payment.created_at).toLocaleString()}
              </tr>
            ))}
          </tbody>
        </Table>
        <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${
                  currentPage === 1 ? 'disabled' : ''
                }`}
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
                  <button className="page-link" onClick={() => paginate(number)}>
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

export default Payments;
