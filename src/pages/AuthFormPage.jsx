import { useSelector } from "react-redux";
import UserUpdateForm from "@/components/UserUpdateForm";

const AuthFormPage = () => {
  // const user = useSelector((state) => state.auth.user);
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user && <UserUpdateForm />}
      {!user && <p>No tienes permisos</p>}
    </div>
  );
};

export default AuthFormPage;
