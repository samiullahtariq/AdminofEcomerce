import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
//importing useDispatch from react-redux
import {useDispatch , useSelector} from 'react-redux'
import { getProducts  ,deleteProduct} from "../../redux/apiCalls";

export default function ProductList() {
  //defing our useDispatch
  const dispatch = useDispatch()
  //using useSeletor hook
  const products = useSelector(state => state.product.products)

  //using useEffect we will get product every time useEffect is called

  useEffect(() => {
    //as were are only getting data we dont need to pass anything other than dispatch
    getProducts(dispatch)
  
  }, [dispatch]);
  
//we are getting id from line 64 where we have deleteicom
  const handleDelete = (id) => {
   //calling deleteProduct from our apicalls
    deleteProduct(id , dispatch)
  };

  const columns = [
    //we need to define fields as it is as they are in our db if the product is written as product you can not write is as Product with capital p
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
     <Topbar/>
     <div style={{display:" flex",marginTop:"10px"}} >
    <Sidebar/>
     
    <div className="productList">
      <DataGrid
      //passsing products which we are getting from useSelector
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
    </div>
    </>
  );
}
