import React from 'react';
import '../styles/LoaderGif.css'; // Certifique-se de que o caminho está correto
import loadingGif from '../assets/loading.gif'; // Importe o GIF de carregamento

const LoaderGif = () => {
  return (
    <div className="loader-gif-container">
      <img src={loadingGif} alt="Loading..." className="loader-gif-image" />
      <p className="loader-gif-text">Loading, please wait...</p>
    </div>
  );
};

export default LoaderGif;
