// ProductPrice.js
import React from "react";
import {formatAmount} from "./FormatAmount";

const ProductPrice = ({ price, promoPrice }) => {
  if (typeof price === "undefined" || typeof promoPrice === "undefined") { 
    return null; 
  }

  const discountPercentage = promoPrice
    ? ((price - promoPrice) / price) * 100
    : 0;

  const formattedPrice = price;
  const formattedPromoPrice = promoPrice;
   
  return (
    <div>
      <div>
        {promoPrice ? (
          <>
            <span style={{ textDecoration: "line-through" }}>
              NGN {formatAmount(formattedPrice)}
            </span>
            {"  "}
            <span style={{ color: "red" }}>
              NGN {formatAmount(formattedPromoPrice)}
            </span>
          </>
        ) : (
          `NGN ${formatAmount(formattedPrice)}`
        )}
      </div>
      {promoPrice && (
        <div>
          <span style={{ color: "green" }}>
            {discountPercentage.toFixed(2)}% Off
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;

