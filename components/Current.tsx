import { SubmitHandler, useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import { formatDate } from "../services/FormatDate";
import { useEffect, useState } from "react";
import { CurrentWeatherProps } from "../Interfaces/CurrentWeatherProps.type";
import { Inputs } from "../Interfaces/Form.type";

const Current = (props: CurrentWeatherProps) => {
  const [myDateTime, setDateTime] = useState({
    day: "",
    time: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.sendDataCallback(data);
  };

  useEffect(() => {
    let dateTime = formatDate(props.current.last_updated);
    setDateTime({
      day: dateTime[0],
      time: dateTime[1],
    });
  }, [props]);

  return (
    <>
      <div className="root__body__current__search">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="root__body__current__search__form"
        >
          <input
            type="text"
            className="root__body__current__search__form__myinput"
            placeholder="Enter Place"
            {...register("location", { required: true })}
          />
          <button
            className="root__body__current__search__form__find"
            type="submit"
          >
            <FiSearch />
          </button>
        </form>
      </div>
      <div className="root__body__current__svg">
        {props.current.condition.icon !== "" && (
          <Image
            height={props.isValid ? "177" : "77"}
            width={props.isValid ? "177" : "77"}
            alt="SVG"
            src={
              !props.isValid
                ? `https://${props.current.condition.icon}`
                : props.current.is_day === 1
                ? `${props.svg?.day_link}`
                : `${props.svg?.night_link}`
            }
          />
        )}
      </div>
      <div className="root__body__current__details">
        <p className="root__body__current__details__temp">
          {props.current.temp_c}
        </p>
        <p className="root__body__current__details__datetime">
          {myDateTime.day}, <span>{myDateTime.time}</span>
        </p>
        <hr />
        <p className="root__body__current__details__weather">
          {props.current.condition.text}
        </p>
        <p className="root__body__current__details__precip">
          Rain - {props.current.precip_mm}mm
        </p>
        <h3>{props.location}</h3>
      </div>
    </>
  );
};

export default Current;
