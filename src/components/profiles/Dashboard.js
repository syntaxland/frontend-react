// Dashboard.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
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

function Dashboard() {
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
        orderIds: payments.map((payment) => payment.order_id),
      },
    ],
  };

  const lineChartOptions = {
    // ...
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            if (label) {
              const index = context.dataIndex;
              const orderId = context.dataset.orderIds[index];
              return `${label}: NGN ${context.formattedValue} (${orderId})`;
            }
            return null;
          },
        },
      },
    },
  };

  const getTotalPayment = () => {
    let totalPayment = 0;

    payments.forEach((payment) => {
      totalPayment += parseFloat(payment.amount);
    });
    return totalPayment;
  };

  const paidOrderRateData = {
    labels: [
      `Paid Orders (${(
        (orders?.filter((order) => order.isPaid).length / orders?.length) *
        100
      ).toFixed(1)}%)`,
      `Unpaid Orders (${(
        (orders?.filter((order) => !order.isPaid).length / orders?.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          orders?.filter((order) => order.isPaid).length,
          orders?.filter((order) => !order.isPaid).length,
        ],
        backgroundColor: ["#1F77B4", "#FF6384"],
      },
    ],
  };

  const unfulfilledOrderRateData = {
    labels: [
      `Delivered Orders (${(
        (orders?.filter((order) => order.is_delivered).length /
          orders?.length) *
        100
      ).toFixed(1)}%)`,
      `Undelivered Orders (${(
        (orders?.filter((order) => !order.is_delivered).length /
          orders?.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          orders?.filter((order) => order.is_delivered).length,
          orders?.filter((order) => !order.is_delivered).length,
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
                      <i className="	fas fa-money-bill"></i> NGN{" "}
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
                  <Line data={lineGraphData} options={lineChartOptions} />
                </div>
              </Col>
              <hr />
              <div className="mt-4 py-3">
                <h2 className="py-3">
                  Orders <i className="fas fa-luggage-cart"></i>
                </h2>
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
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
