// PromoTimer.js
import React, { useEffect, useState } from "react";
import moment from "moment";

const PromoTimer = ({ expirationDate }) => {
  const calculateTimeRemaining = () => {
    const now = moment();
    const expirationDateObj = moment(expirationDate);

    if (expirationDateObj > now) {
      const duration = moment.duration(expirationDateObj.diff(now));
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    return "00:00:00";
    // return "Expired";
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expirationDate]);

  return <span>{timeRemaining}</span>;
};

export default PromoTimer;


// import React, { useEffect, useState } from "react";

// const PromoTimer = ({ expirationDate }) => {
//   const calculateTimeRemaining = () => {
//     const now = new Date();
//     const expirationDateObj = new Date(expirationDate);

//     if (expirationDateObj > now) {
//       const timeDiff = expirationDateObj - now;
//       const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

//       return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//     }

//     return "Expired";
//   };

//   const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeRemaining(calculateTimeRemaining());
//     }, 1000);

//     return () => clearInterval(timer);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [expirationDate]);

//   return <span>{timeRemaining}</span>;
// };

// export default PromoTimer;
