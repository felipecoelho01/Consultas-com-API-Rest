import React from "react";
import PesquisaAPI from "./componentes/PesquisaAPI/PesquisaAPI";


const App = () => {

  return (
    <>
      <div className="container-fluid bg-[url('./assets/bg-weather.jpg')] w-screen h-screen flex justify-center items-center">
        <div className="w-auto h-auto bg-[linear-gradient(180deg,_rgba(89,_76,_238,_1)_0%,_#8dd0f5_100%)] border-1 rounded-2xl p-10">
            <PesquisaAPI></PesquisaAPI>
        </div>
      </div>
    </>
  );
};

export default App;
