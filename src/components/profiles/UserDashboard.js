import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2"; 
// import { CategoryScale } from "chart.js";
import { listPayments } from "../../actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";

function UserDashboard() {
  const dispatch = useDispatch(); 

  const paymentList = useSelector((state) => state.paymentList);
  const { loading, error, payments } = paymentList;

  useEffect(() => {
    dispatch(listPayments());
  }, [dispatch]);

  const getTotalPayment = () => {
    let totalPayment = 0;
    payments.forEach((payment) => {
      totalPayment += payment.amount;
    });
    return totalPayment;
  };

  const chartData = {
    labels: ["Total Payment"],
    datasets: [
      {
        label: "Total Payment",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [getTotalPayment()],
      },
    ],
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <div>
              <Bar
                data={chartData}
                width={100}
                height={50}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default UserDashboard;
