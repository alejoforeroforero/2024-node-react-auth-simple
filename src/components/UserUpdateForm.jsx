import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/states/authActions";
import { clearRedirect } from "@/redux/states/authSlice";

import { toast } from "react-toastify";

const UserUpdateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { loading, error } = useSelector((state) => state.auth);
  const redirectTo = useSelector(state => state.auth.redirectTo);


  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
      dispatch(clearRedirect()); // Reset the redirectTo state
    }
  }, [redirectTo, navigate, dispatch]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      bio: user?.bio,
      address: user?.address,
      phone_number: user?.phone_number,
      birth_date: user?.birth_date,
    },
  });

  const confirmation = () => {
    toast("User updated!");
    navigate("/");
  };

  const onSubmit = (data) => {
    const dataObj = {
      data,
      callback: confirmation,
    };

    dispatch(updateUser(dataObj));
  };

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            {...register("first_name", { required: "First name is required" })}
          />
          {errors.first_name && <span>{errors.first_name.message}</span>}
        </div>

        {/* <div>
          <label htmlFor="last_name">Last Name</label>
          <input id="last_name" {...register("last_name", {})} />
          {errors.last_name && <span>{errors.last_name.message}</span>}
        </div>

        <div>
          <label htmlFor="bio">Bio</label>
          <input id="bio" type="textArea" {...register("bio", {})} />
          {errors.bio && <span>{errors.bio.message}</span>}
        </div>

        <div>
          <label htmlFor="address">Adress</label>
          <input 
            id="address" 
            type='text'
            {...register("address", {})} />
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        <div>
          <label htmlFor="phone_number">Phone Number</label>
          <input 
            id="phone_number" 
            type='text'
            {...register("phone_number", {})} />
          {errors.phone_number && <span>{errors.phone_number.message}</span>}
        </div>

        <div>
          <label htmlFor="birth_date">Birth Day</label>
          <input
            id="birth_date"
            type="date"
            {...register("birth_date", {
              min: { message: "Must be at least 18" },
            })}
          />
          {errors.birth_date && <span>{errors.birth_date.message}</span>}
        </div> */}

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update User"}
        </button>

        {error && <div>Error: {error}</div>}
      </form>
    </div>
  );
};

export default UserUpdateForm;
