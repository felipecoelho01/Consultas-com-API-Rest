import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TiLocationOutline } from "react-icons/ti";
import { FaWind , FaRegEye} from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { Snackbar, Alert, Button } from "@mui/material";
import LoadingThreeDotsJumping from "../LoadingThreeDotsJumping/LoadingThreeDotsJumping";

function PesquisaAPI() {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [textError, setTextError] = useState("");
  const [valueCity, setValueCity] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");  
  const [temp, setTemp] = useState("");  
  const [nameCity, setNameCity] = useState("");  
  const [weatherIcon, setWeatherIcon] = useState("");  
  const [countryIcon, setCountryIcon] = useState("");  

  const apiKey = import.meta.env.VITE_API_URL;
  // const apiUnsplash = "https://source.unsplash.com/1600x900/?";

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
    try {
      const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

      const res = await fetch(apiWeatherURL);
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
      setOpen(true);
      setTextError("Erro ao encontrar a cidade.");
    }
  };

  const showWeatherData = async (city) => {
    setVisible(false);

    if (city === "") {
      setOpen(true);
      setTextError("Digite alguma cidade.");
      return;
    }

    setIsLoading(true);

    const data = await getWeatherData(city);

    setIsLoading(false);
    if (!data || data.cod === "404") {
      setOpen(true);
      setTextError("Cidade não encontrada!");
      return;
    }

    console.log("API: " + data);
    setVisible(true);
    setWeatherIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    setCountryIcon(`https://flagcdn.com/w80/${data.sys.country.toLowerCase()}.png`);

    setWind(`${data.wind.speed} km/h`);
    setHumidity(`${data.main.humidity}%`);
    setVisibility(`${data.visibility / 1000} km`);
    setTemp(`${parseInt(data.main.temp)} C°`);
    setNameCity(`${data.name}`);

    // let urlImg = `url('${apiUnsplash + city}')`;

    // enviarMensagem(urlImg);
  };

  const eventEnter = (event) =>{
    if (event.code === "Enter") {
      const city = event.target.value;
  
      showWeatherData(city);
    }
  }

  return (
    <>
      <div className="text-center">
        <h2 className="mb-4 text-xl">Veja o clima de uma cidade:</h2>
        <input
          type="text"
          className="p-3 border-0 flex-1 rounded-sm bg-amber-50"
          aria-label="Digite o nome da cidade"
          onChange={handleChange}
          onKeyUp={eventEnter}
        ></input>
        <button
          className="p-3 ml-8 bg-[#8dd0f5] text-black border-0 cursor-pointer rounded-sm"
          aria-label="Buscar clima da cidade"
          onClick={() => showWeatherData(valueCity)}
        >
          <FaSearch></FaSearch>
        </button>
      </div>
      
      {isLoading && <div key="dvLoading" className="w-full mt-25 ml-25"><LoadingThreeDotsJumping></LoadingThreeDotsJumping></div>}
      {isVisible && (
        <div
          key="weatherBox"
          className="border-t-3 border-t-white mt-6 text-center"
        >
          <div className="flex items-center justify-center w-full">
          <img src={weatherIcon} alt="Condições atuais" className="w-20 h-20" />
          </div>
          <h2 className="ml-2.5 text-3xl text-white">{temp}</h2>
          <h2 className="flex justify-center place-items-center mb-2.5 text-2xl text-white">
            <TiLocationOutline></TiLocationOutline>{nameCity}&nbsp;&nbsp;<img src={countryIcon} alt="Bandeira do país" className="h-5 w-8"></img>
          </h2>
          <div className="grid grid-cols-3 gap-3 p-3">
            <div className="bg-white rounded-md text-center flex flex-col justify-center items-center shadow-md shadow-black p-0.5">
              <h4>Vento</h4>
              <FaWind size={30} className="mt-0.5 mb-0.5"></FaWind>
              <span>{wind}</span>
            </div>
            <div className="bg-white rounded-md text-center flex flex-col justify-center items-center shadow-md shadow-black p-0.5">
              <h4>Umidade</h4>
              <FaDroplet size={30} className="mt-0.5 mb-0.5"></FaDroplet>
              <span>{humidity}</span>
            </div>
            <div className="bg-white rounded-md text-center flex flex-col justify-center items-center shadow-md shadow-black p-0.5">
              <h4>Visibilidade</h4>
              <FaRegEye size={30} className="mt-0.5 mb-0.5"></FaRegEye>
              <span>{visibility}</span>
            </div>
          </div>
        </div>
      )}
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
