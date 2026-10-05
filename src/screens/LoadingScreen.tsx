import CustomScreen from "../components/ui/CustomScreen";
import Heading from "../components/ui/texts/Heading";

const LoadingScreen = () => {
  return (
    <CustomScreen style={{ alignItems: "center", justifyContent: "center" }}>
      <Heading>Loading...</Heading>
    </CustomScreen>
  );
};

export default LoadingScreen;
