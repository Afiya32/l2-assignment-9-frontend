import Banner from "../components/Banner";
import HomeProduct from "../components/HomeProduct";


const Home = () => {


  return (
    <div>
      <div className="mt-2 w-[110vh] h-[75vh] mx-auto">

     <Banner/>
      </div>
      <div className="mt-2">
        <HomeProduct/>
      </div>
      
     
    </div>
  );
};

export default Home;