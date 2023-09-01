// CreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { getCreditPointList } from "../../actions/creditPointActions";
import Message from "../Message";
import Loader from "../Loader";

const CreditPoint = () => {
  const dispatch = useDispatch();
  const creditPointList = useSelector((state) => state.creditPointList);
  const { loading, creditPointRequests, error } = creditPointList;

  useEffect(() => {
    dispatch(getCreditPointList());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = creditPointRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(creditPointRequests.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row>
        <div className="justify-content-md-center">
          <Col>
            <h2 className="py-3 text-center">Credit Point Requests</h2>

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
                      {/* <th>Email</th> */}
                      {/* <th>Account Name</th> */}
                      {/* <th>Account Number</th> */}
                      {/* <th>Bank</th> */}
                      <th>Amount</th>
                      <th>Request Ref</th>
                      <th>Paid</th>
                      <th>Paid At</th>
                      <th>Delivered</th>
                      <th>Delivered At</th>
                      <th>Request Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((creditPoint, index) => (
                      <tr key={creditPoint.id}>
                        <td>{index + 1}</td>
                        {/* <td>{creditPoint.email}</td> */}
                        {/* <td>{creditPoint.account_name}</td> */}
                        {/* <td>{creditPoint.account_number}</td> */}
                        {/* <td>{creditPoint.bank_name}</td> */}
                        <td>{creditPoint.credit_point_amount}</td>
                        <td>{creditPoint.request_ref}</td>
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
        </div>
      </Row>
    </Container>
  );
};

export default CreditPoint;
