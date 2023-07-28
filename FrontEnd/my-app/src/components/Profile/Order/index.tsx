import React, { useRef, useState } from 'react';
import SideBar from '.././SideBarProf';
import { RiDeleteBin6Line } from "react-icons/ri";
import Order from "./orderitem";


const ProfOrders: React.FC = () => {
  interface Order {
    id: number;
    data: string;
    isDelivered: boolean;
    productName: string;
  }

  const initialOrders: Order[] = [
    { id: 1, data: '2023-07-10', isDelivered: true, productName: 'Смартфон Samsung S21' },
    { id: 2, data: '2023-07-15', isDelivered: false, productName: 'Навушники AirPods' },
    { id: 3, data: '2023-07-18', isDelivered: true, productName: 'Планшет Lenovo Tab 5' },
    { id: 4, data: '2023-07-20', isDelivered: true, productName: 'Книга "Майстер і Маргарита"' },
    { id: 5, data: '2023-07-22', isDelivered: false, productName: 'Камера GoPro Hero 9' },
  ];
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleToggleDelivered = (id: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, isDelivered: !order.isDelivered } : order
      )
    );
  };

  return (
    <div className="flex bg-slate-100" >

      <SideBar></SideBar>
      <div className="">
        <div className="ordersheader" >
          <div className="divorderlist">
            <a className="ordersa">ALL</a>
            <a className="ordersa">Unpaid</a>
            <a className="ordersa">Processing</a>
            <a className="ordersa">ShiPped</a>
            <a className="ordersa">Completed</a>
            <div className="deleted">
              <RiDeleteBin6Line className="deleteico"></RiDeleteBin6Line>
              <a className="dela">Deleted Orders</a>
            </div>


          </div>
          <div className="ordersearcher">
            <div className="overselec">
              <select id="countries" className="orderselect bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 ">
                <option selected>Order</option>
                <option value="US">Track</option>

              </select>

            </div>
          </div>





        </div>
        <div className="orderbody">

          <div>

            <table>
              <thead>
                <tr>
                  <th className="ordertableth">ID</th>
                  <th className="ordertableth">Data</th>
                  <th className="ordertableth">Назва товару</th>
                  <th className="ordertableth">Доставлено</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="ordertabletd">{order.id}</td>
                    <td className="ordertabletd">{order.data}</td>

                    <td className="ordertabletd">{order.productName}</td>
                    <td className="ordertabletd">
                      <input
                        type="checkbox"
                        checked={order.isDelivered}
                        onChange={() => handleToggleDelivered(order.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>



        </div>
      </div>
    </div>


  );
};
export default ProfOrders;


