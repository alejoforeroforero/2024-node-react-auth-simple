import { useSelector } from "react-redux";
import UserInfo from "@/components/userInfo";


const HomePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div>
        {user && <UserInfo />}
        {!user && <p>Demo App for user authentication</p>}
        </div>
    </>
  );
};

export default HomePage;
