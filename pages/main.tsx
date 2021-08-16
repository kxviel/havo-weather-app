import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  location: string;
};

const Main = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [currentCity, setCity] = useState<string | null>("");

  useEffect(() => {
    localStorage.setItem("city", router.query.location as string);
    setCity(localStorage.getItem("city"));
  }, [router.query.location, setCity]);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <div className="root">
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
      </div>
    </>
  );
};

export default Main;
