import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";
import { TiLocationOutline } from "react-icons/ti";
import { FaWind } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


function PesquisaAPI() {
    const [isVisible, setVisible] = useState(false);


  const apiKey = import.meta.env.VITE_API_URL;

  const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
  };

  return (
    <>
      <div>
        <h2 className="mb-4 text-xl">Veja o clima de uma cidade:</h2>
        <input
          type="text"
          className="p-3 border-0 flex-1 rounded-sm bg-amber-50"
        ></input>
        <motion.button className="p-3 ml-8 bg-[#8dd0f5] text-black border-0 cursor-pointer rounded-sm"
        onClick={() => setVisible(!isVisible)} layout>
          <FaSearch></FaSearch>
        </motion.button>
      </div>
      <AnimatePresence mode="popLayout">
      {isVisible && (<motion.div key="weatherBox"
      className="border-t-3 border-t-white mt-6 pt-6 text-center"
      initial={{
        rotate: "0deg",
        scale: 0,
        y: 0,
      }}
      animate={{
        rotate: "360deg",
        scale: 1,
        y: [0, 150, -150, -150, 0],
      }}
      exit={{
        rotate: "0deg",
        scale: 0,
        y: 0,
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
        times: [0, 0.25, 0.5, 0.85, 1],
      }}>
        <h2 className="ml-2.5 text-3xl text-white">25 C°</h2>
        <h2 className="flex justify-center place-items-center mb-2.5 text-2xl text-white">
          <TiLocationOutline></TiLocationOutline>Tokyo
        </h2>
        <div className="grid grid-cols-3 gap-3 p-3">
          <div className="bg-white rounded-md text-center flex flex-col justify-center items-center shadow-md shadow-black">
            <h4>Vento</h4>
            <FaWind size={30} className="mt-0.5 mb-0.5"></FaWind>
            <span id="txtWind">8 km/h</span>
          </div>
          <div className="bg-white rounded-md text-center flex flex-col justify-center items-center shadow-md shadow-black">
            <h4>Umidade</h4>
            <FaDroplet size={30} className="mt-0.5 mb-0.5"></FaDroplet>
            <span id="txtHumidity">58 %</span>
          </div>
          <div className="bg-white rounded-md text-center flex flex-col justify-center items-center shadow-md shadow-black">
            <h4>Visibilidade</h4>
            <FaRegEye size={30} className="mt-0.5 mb-0.5"></FaRegEye>
            <span id="txtVisibility">10 km</span>
          </div>
        </div>
      </motion.div>)}
      </AnimatePresence>
    </>
  );
}

export default PesquisaAPI;
