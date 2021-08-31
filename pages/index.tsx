import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Inputs } from "../Interfaces/Form.type";

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    localStorage.setItem("city", data.location);
    router.push("/main");
  };

  return (
    <>
      <Head>
        <title>Havo | Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        <div className="card">
          <h1 className="title">welcome to havo</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <strong className="label">Enter Your Location</strong>
            <>
              <input
                type="text"
                {...register("location", { required: true })}
              />
            </>
            {errors.location && (
              <p style={{ textAlign: "center", color: "#0099" }}>
                This field is required
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
