// UserDashboard.js
import React, { useEffect,  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { listPayments } from "../../actions/paymentActions";
import { getOrders } from "../../actions/orderActions";
import { Line, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  PointElement
);

function UserDashboard() {
  // const [creditPointEarning, setCreditPointEarning] = useState(0);
  const dispatch = useDispatch();

  const paymentList = useSelector((state) => state.paymentList);
  const {
    loading: paymentLoading,
    error: paymentError,
    payments,
  } = paymentList;
  console.log("payments:", payments);

  const orderList = useSelector((state) => state.orderList);
  const { loading: orderLoading, error: orderError, orders } = orderList;
  console.log("Orders from state:", orders);

  useEffect(() => {
    dispatch(listPayments());
    dispatch(getOrders());
  }, [dispatch]);

  const lineGraphData = {
    labels: payments.map((payment) =>
      new Date(payment.created_at).toLocaleString()
    ),
    datasets: [
      {
        label: "Amount Paid (NGN)",
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        data: payments.map((payment) => payment.amount),
      },
    ],
  };

  const getTotalPayment = () => {
    let totalPayment = 0;

    payments.forEach((payment) => {
      totalPayment += parseFloat(payment.amount);
    });
    return totalPayment;
  };

  // const getCreditPointEarning = () => {
  //   let totalCreditPointEarning = 0;
  //   payments.forEach((payment) => {
  //     totalCreditPointEarning = parseFloat(payment.amount * 0.01);
  //     console.log("paymentAmount:", payment.amount);
  //     console.log("creditPointEarning:", payment.amount * 0.01);
  //   });
  //   // setCreditPointEarning(totalCreditPointEarning);
  //   return totalCreditPointEarning;
  // };

  const totalPayment = getTotalPayment();
  const creditPoints = totalPayment * 0.01;

  console.log("totalPayment:", totalPayment, "creditPoints:", creditPoints);

  const withdrawCreditPoints =
    totalPayment >= 500000 ? (
      <Link
        to={{
          pathname: "/credit-point",
          search: `?creditPoints=${creditPoints}`,
        }}
      >
        <Button variant="success" className="rounded" size="sm">
          Withdraw Points
        </Button>
      </Link>
    ) : (
      <p>
        <Button variant="outline" className="rounded" size="sm" disabled>
          Earned points mature from NGN 5000
        </Button>
      </p>
    );

  const paidOrderRateData = {
    labels: [
      `Paid Orders (${(
        (orders.filter((order) => order.isPaid).length / orders.length) *
        100
      ).toFixed(1)}%)`,
      `Unpaid Orders (${(
        (orders.filter((order) => !order.isPaid).length / orders.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          orders.filter((order) => order.isPaid).length,
          orders.filter((order) => !order.isPaid).length,
        ],
        backgroundColor: ["#1F77B4", "#FF6384"],
      },
    ],
  };

  const unfulfilledOrderRateData = {
    labels: [
      `Delivered Orders (${(
        (orders.filter((order) => order.is_delivered).length / orders.length) *
        100
      ).toFixed(1)}%)`,
      `Undelivered Orders (${(
        (orders.filter((order) => !order.is_delivered).length / orders.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          orders.filter((order) => order.is_delivered).length,
          orders.filter((order) => !order.is_delivered).length,
        ],
        backgroundColor: ["#008000", "#FFA500"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="justify-content-center text-center">
      <div>
        {paymentLoading || orderLoading ? (
          <Loader />
        ) : paymentError || orderError ? (
          <Message variant="danger">{paymentError || orderError}</Message>
        ) : (
          <div>
            <Row>
              <Col>
                <div>
                  <div className="bar-chart">
                    <h2 className="pt-4">Total Payment</h2>
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${(getTotalPayment() / 100) * 200}px`,
                        }}
                      ></div>
                    </div>
                    <p>
                      NGN{" "}
                      {getTotalPayment().toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="line-graph mt-4">
                  <h2 className="py-3">Payments</h2>
                  <Line data={lineGraphData} />
                </div>
              </Col>
              <hr />
              <div className="mt-4 py-3">
                <h2 className="py-3">Orders</h2>
                <Row>
                  <Col>
                    <h5 className="py-3">Paid Order Rate</h5>
                    <div className="chart-container">
                      <Pie
                        data={paidOrderRateData}
                        options={pieChartOptions}
                        width={200}
                        height={200}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h5 className="py-3">Order Fulfilment Rate</h5>
                    <div className="chart-container">
                      <Pie
                        data={unfulfilledOrderRateData}
                        options={pieChartOptions}
                        width={200}
                        height={200}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
              <Col>
                <h2 className="py-3">Credit Point Wallet</h2>
                <p>
                  Balance: NGN{" "}
                  {creditPoints.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <div className="py-3">{withdrawCreditPoints}</div>
              </Col>

              {/* <hr />
              <Col>
                <h2 className="py-3">Credit Point Earning</h2>
                <p>
                  Balance: NGN{" "}
                  {getCreditPointEarning()}

                  {creditPointEarning.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <Button onClick={() => setCreditPointEarning(0)}>
                  Withdraw Earning
                </Button>
              </Col> */}

              <hr />
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
