import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Main = () => {
  const router = useRouter();
  const [currentCity, setCity] = useState<string | null>("");

  useEffect(() => {
    localStorage.setItem("city", router.query.location as string);
    setCity(localStorage.getItem("city"));
  }, [router.query.location, setCity]);

  return <div></div>;
};

export default Main;
