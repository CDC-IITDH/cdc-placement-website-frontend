import React from "react";
import "./tiertable.css";
function TierTable() {
  return (
    <>
      <table>
        <tr>
          <th>Tier</th>
          <th>Gross pay(in Rs.)LPA=Lakhs per annum</th>
        </tr>
        <tr>
          <td>Tier-1</td>
          <td>&ge;18 LPA</td>
        </tr>
        <tr>
          <td>Tier-2</td>
          <td>&ge;15 LPA but &lt;18 LPA</td>
        </tr>
        <tr>
          <td>Tier-3</td>
          <td>&ge;12 LPA but &lt;15 LPA</td>
        </tr>
        <tr>
          <td>Tier-4</td>
          <td>&ge;9 LPA but &lt;12 LPA</td>
        </tr>
        <tr>
          <td>Tier-5</td>
          <td>&ge;6 LPA but &lt;9 LPA</td>
        </tr>
        <tr>
          <td>Tier-6</td>
          <td>&ge;6 LPA</td>
        </tr>
      </table>
      <br></br>
    </>
  );
}

export default TierTable;
