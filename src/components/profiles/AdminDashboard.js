import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { listAdminPayments } from '../../actions/paymentActions';
import Loader from '../Loader';
import Message from '../Message';
import { Bar } from 'react-chartjs-2';

function AdminDashboard() {
  const dispatch = useDispatch();

  const adminPaymentList = useSelector((state) => state.adminPaymentList);
  const { loading, error, payments } = adminPaymentList;

  useEffect(() => {
    dispatch(listAdminPayments());
  }, [dispatch]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Payments',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const userLabels = payments.map((payment) => payment.user);
    const totalPayments = payments.map((payment) => payment.total);

    setChartData((prevState) => ({
      ...prevState,
      labels: userLabels,
      datasets: [
        {
          ...prevState.datasets[0],
          data: totalPayments,
        },
      ],
    }));
  }, [payments]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          <Table striped bordered hover responsive className="table-sm mt-3">
            <thead>
              <tr>
                <th>User</th>
                <th>Total Payments</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.user}>
                  <td>{payment.user}</td>
                  <td>{payment.total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;


// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Table } from 'react-bootstrap';
// import { listAdminPayments } from '../../actions/paymentActions';
// import Loader from '../Loader';
// import Message from '../Message';

// function AdminDashboard() {
//   const dispatch = useDispatch();

//   const adminPaymentList = useSelector((state) => state.adminPaymentList);
//   const { loading, error, payments } = adminPaymentList;

//   useEffect(() => {
//     dispatch(listAdminPayments());
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <Table striped bordered hover responsive className="table-sm">
//           <thead>
//             <tr>
//               <th>User</th>
//               <th>Total Payments</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment) => (
//               <tr key={payment.user}>
//                 <td>{payment.user}</td>
//                 <td>{payment.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// }

// export default AdminDashboard;
