import { Link ,useLocation} from "react-router-dom";
import "./product.css";
import Chart from "../../components/Chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import Sidebar from "../../components/Sidebar/Sidebar";
import {useSelector} from 'react-redux'
import Topbar from "../../components/Topbar/Topbar";
import { useEffect , useState , useMemo } from "react";
import {userRequest} from '../../requestMethods'

export default function Product() {

    //using loction hook to get the id
    const location = useLocation()

    const productId = location.pathname.split("/")[2]
    //creating useState for productSTats
    const [pStats, setPStats] = useState([]);

    //get the product by useSelector
    // we are getting an arrray of products now we using find method to find that if the product is the same id we want to get

    const product = useSelector(state => state.product.products.find((product)=>product._id === productId))

    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );
    
      useEffect(() => {

        //making a function for getSTats

        const getStats = async () => {
          try {
              //fullBAcckend route is  http://localhost:5000//api/orders/income
            const res = await userRequest.get("orders/income?pid=" + productId);

            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            })

            
            list.map((item) =>
              setPStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], Sales: item.total },
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();

        //using productId and months as our dependence
      }, [productId, MONTHS]);
    

  return (
      <>
      <Topbar/>
      <div style={{display:" flex",marginTop:"10px"}} >
    <Sidebar/>
     
        <div className="product">
        <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newproduct">
            <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
            <div className="productTopLeft">
                <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={product.img} alt="" className="productInfoImg" />
                    <span className="productName">{product.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{product._id}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">sales:</span>
                        <span className="productInfoValue">5123</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">in stock:</span>
                        <span className="productInfoValue">{product.inStock}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label>Product Name</label>
                    <input type="text" placeholder={product.title} />
                    <label>Product Description</label>
                        <input type="text" placeholder={product.desc} />
                        <label>Price</label>
                        <input type="text" placeholder={product.price} />
                    <label>In Stock</label>
                    <select name="inStock" id="idStock">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <img src={product.img} alt="" className="productUploadImg" />
                        <label for="file">
                            <Publish/>
                        </label>
                        <input type="file" id="file" style={{display:"none"}} />
                    </div>
                    <button className="productButton">Update</button>
                </div>
            </form>
        </div>
        </div>
    </div>
    </>
  );
}
