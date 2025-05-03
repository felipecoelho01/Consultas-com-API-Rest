import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";
import { TiLocationOutline } from "react-icons/ti";
import { FaWind } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Snackbar, Alert, Button } from "@mui/material";


function PesquisaAPI() {
    const [isVisible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [textError, setTextError] = useState('');
    const [valueCity, setValueCity] = useState('');
    const txtVisibility = document.querySelector("#txtVisibility");
    const txtHumidity = document.querySelector("#txtHumidity");
    const txtWind = document.querySelector("#txtWind");
    const apiKey = import.meta.env.VITE_API_URL;

    const handleChange = (event) => {
      setValueCity(event.target.value);
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false); // Fecha o alerta
    };

  const getWeatherData = async (city) => {
    try{
      const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

      const res = await fetch(apiWeatherURL);
      const data = await res.json();
  
      return data;
    }catch (error){
      console.log(error);
      setOpen(true);
      setTextError('Erro ao encontrar a cidade.');
    }
    
  };

  const showWeatherData = async (city) => {
    setVisible(!isVisible)
console.log("ver " + isVisible);
    if(city === ''){
      setOpen(true);
      setTextError('Digite alguma cidade');
        return;
    }
  
    const data = await getWeatherData(city);
  
    if (data.cod === "404") {
      return;
    }
  
    console.log("API: " + data);
    
    // cityElement.innerText = data.name;
    // tempElement.innerText = parseInt(data.main.temp);
    // descElement.innerText = data.weather[0].description;
    // weatherIconElement.setAttribute(
    //   "src",
    //   `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    // );
    // countryElement.setAttribute("src", apiCountryURL + data.sys.country);
    // txtHumidity.innerText = `${data.main.humidity}%`;
    // txtWind.innerText = `${data.wind.speed}km/h`;
  
    // // Change bg image
    // document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
  if(isVisible === false){
    setVisible(true)
    console.log("ver2 " + isVisible);
  }
    // weatherContainer.classList.remove("hide");
  };

  return (
    <>
      <div className="text-center">
        <h2 className="mb-4 text-xl">Veja o clima de uma cidade:</h2>
        <input
          type="text"
          className="p-3 border-0 flex-1 rounded-sm bg-amber-50"
          onChange={handleChange}
        ></input>
        <motion.button className="p-3 ml-8 bg-[#8dd0f5] text-black border-0 cursor-pointer rounded-sm"
        onClick={() => showWeatherData(valueCity)} layout>
          <FaSearch></FaSearch>
        </motion.button>
      </div>
      <AnimatePresence mode="popLayout">
        {console.log("pqp: " + isVisible)}
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} 
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {textError}
        </Alert>
      </Snackbar>
    </>
  );
}

export default PesquisaAPI;
