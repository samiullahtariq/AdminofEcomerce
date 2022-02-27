import "./widgetLg.css";
import {useState ,useEffect} from 'react'
import { userRequest } from "../../requestMethods";
// to format our date
import {format} from 'timeago.js'

export default function WidgetLg() {

  //making a useState hook to fetch user data

  const [orders , setOrders] = useState([])


  //using useEffect to make function in it and fetch data

  useEffect(() => {
     const getOrders = async()=>{
       try{
         //full route of order is http://localhost:5000/api/orders
           const res = await userRequest.get("/orders")
           //setOrder here to get data in order
           setOrders(res.data)
       }catch(err){
         console.log(err)
       }
     }

     //calling getOrders function

     getOrders()
  }, []);
  


  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>

       {/* Mapping the orders */}
        {orders.map((order)=>(

        <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{format(order.createdAt)}</td>
          <td className="widgetLgAmount">${order.amount}</td>
          <td className="widgetLgStatus">
            <Button type={order.status} />
          </td>
        </tr>
        ))}
      </table>
    </div>
  );
}
