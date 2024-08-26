import { useSelector } from "react-redux";
import AdSlider from "../components/UI/AdSlider";

const PromotionsPage = () => {
  const ad = useSelector((state) => state.homepage.ads.promotional);
  return <AdSlider ad={ad} height="500px" />;
};

export default PromotionsPage;
