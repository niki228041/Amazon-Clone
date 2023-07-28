import React from 'react';
import { TiTick } from 'react-icons/ti';

interface OrderProps {
  id: number;
  data: string;
  isDelivered: boolean;
  productName: string;
}

const Order: React.FC<OrderProps> = ({ id, data, isDelivered, productName }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{data}</td>
      <td>{isDelivered ? <TiTick /> : null}</td>
      <td>{productName}</td>
    </tr>
  );
};

export default Order;