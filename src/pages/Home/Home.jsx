import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./Home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { useState , useEffect , useMemo } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {


  //using useState
  const [userStats, setUserStats] = useState([]);

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
    //creatig a getStats function
    const getStats = async () => {
      try {
        //full route of stats is http://localhost:5000/api/users/stats
        const res = await userRequest.get("/users/stats");
        //we are maping the data which we are getting from res
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
    //We set MONTHS as our dependence or otherwise it will give us error
  }, [MONTHS]);




  return (
    <>
    <Topbar/>

    <div style={{display:" flex",marginTop:"10px"}} >
    
    <Sidebar/>
     
     
        <div className="home">
          <FeaturedInfo />
          {/* Passing userSTats which we are setting in the useState */}
          <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
          <div className="homeWidgets">
            <WidgetSm/>
            <WidgetLg/>
          </div>
        </div>
    </div>
    </>
  );
}
