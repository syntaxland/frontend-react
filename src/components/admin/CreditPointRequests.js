// CreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { getCreditPointAllList } from "../../actions/creditPointActions";
import Message from "../Message";
import Loader from "../Loader";

const CreditPointRequests = () => {
  const dispatch = useDispatch();
  const creditPointAllList = useSelector((state) => state.creditPointAllList);
  const { loading, creditPointAllRequests, error } = creditPointAllList;

  useEffect(() => {
    dispatch(getCreditPointAllList());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = creditPointAllRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(creditPointAllRequests.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={12}>
          <h2 className="py-3 text-center">
            Credit Point Requests (All Users)
          </h2>
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
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Account Name</th>
                    <th>Account Number</th>
                    <th>Bank</th>
                    <th>Amount</th>
                    <th>Paid</th>
                    <th>Paid At</th>
                    <th>Delivered</th>
                    <th>Delivered At</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((creditPoint, index) => (
                    <tr key={creditPoint.id}>
                      <td>{index + 1}</td>
                      <td>{creditPoint.email}</td>
                      <td>{creditPoint.phone_number}</td>
                      <td>{creditPoint.account_name}</td>
                      <td>{creditPoint.account_number}</td>
                      <td>{creditPoint.bank_name}</td>
                      <td>{creditPoint.credit_point_amount}</td>
                      {/* <td>{creditPoint.is_paid ? "Yes" : "No"}</td> */}
                      <td>
                        {creditPoint.is_paid ? (
                          <i
                            className="fas fa-check-circle"
                            style={{ fontSize: "16px", color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times-circle"
                            style={{ fontSize: "16px", color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>{creditPoint.paid_at}</td>
                      <td>{creditPoint.is_delivered ? "Yes" : "No"}</td>
                      <td>{creditPoint.delivered_at}</td>
                      <td>
                        {new Date(creditPoint.created_at).toLocaleString()}
                      </td>
                      <td>
                        <Button
                          className="rounded"
                          variant="success"
                          size="sm"
                          disabled
                        >
                          Confirm Payment
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
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
                        currentPage === number ? "active" : ""
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
        </Col>
      </Row>
    </Container>
  );
};

export default CreditPointRequests;
