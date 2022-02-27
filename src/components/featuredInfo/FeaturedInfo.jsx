import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import {useState , useEffect} from 'react'
import {userRequest} from '../../requestMethods'

export default function FeaturedInfo() {

  //making a useState hook
  
  const [income , setIncome] = useState([])

  const [perc, setPerc] = useState(0);
  //using useEffect 

  useEffect(() => {
    
    const getIncome = async()=>{
      try{
         //  full route is http://localhost:5000/api/orders/income
        const res = await userRequest.get("/orders/income")
        //setIncome here 

        setIncome(res.data)
        //console.log(res.data)
         
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);

      }catch(err){
        console.log(err)
      }
    }
    //calling getIncome function here

    getIncome()

  }, []);
  


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
        {/* //writing income */}
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
          {/* //writing percentage */}
            %{Math.floor(perc)} 
            {/* //if perc is samller than zero tan negative icon other wise positive icon */}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
