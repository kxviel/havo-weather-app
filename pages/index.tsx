import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Inputs } from "../Interfaces/Form.type";
import { FiSearch } from "react-icons/fi";

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
            <strong className="label">City</strong>
            <input type="text" {...register("location", { required: true })} />
            {errors.location && <p className="err">This field is required</p>}
            <button className="find">
              <FiSearch />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
