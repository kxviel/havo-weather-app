import { AppBarProps, Inputs } from "../utils/Interfaces";
import { SubmitHandler, useForm } from "react-hook-form";

const AppBar = (props: AppBarProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.sendDataCallback(data);
  };
  return (
    <>
      <header>
        <div className="brand">
          <h3>Havo | Weather</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input
            type="text"
            placeholder="Enter Your Location"
            {...register("location", { required: true })}
          />
          <button className="find" type="submit">
            Find
          </button>
        </form>
      </header>
    </>
  );
};

export default AppBar;
