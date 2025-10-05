import React from "react";
import dayjs from "dayjs";
const TableRowData = ({ pay, idx }) => {
  const dateandtime = dayjs(pay?.timeAndDate, "M/D/YYYY, hh:mm:ss A").format(
    "DD-MM-YYYY, hh:mm:ss A"
  );

  return (
    <tr>
      <th>{idx + 1}</th>
      <td>{dateandtime}</td>
      <td>{pay.transactionID}</td>
      <td>${pay.amount.toFixed(2)}</td>
      <td>
        <p
          className={
            pay.payStatus === "Success"
              ? "bg-green-100 text-center rounded-full text-green-600 font-semibold"
              : "bg-red-100 text-red-600 font-medium text-center rounded-full"
          }
        >
          {pay.payStatus}
        </p>
      </td>
      <td>{pay.cardType || "Cencelled"}</td>
    </tr>
  );
};

export default TableRowData;
