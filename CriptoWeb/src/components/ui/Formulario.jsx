import { useState, useEffect } from 'react';
import '../../styles/Formulario.css';
import axios from 'axios';

const Formulario = () => {
    const [moneda, setMoneda] = useState('');
    const [criptomoneda, setCriptomoneda] = useState('');
    const [mostrar, setMostrar] = useState(false);

    const consultarAPI = async () => {
        const apiKey = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY || '';
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
        try {
            // "Apikey (aqui va la variable apikey)"
            // const config = apiKey ? { headers: { authorization: `Apikey ${apiKey}` } } : {};
            // Llamada al API
            const respuesta = await axios.get(`${url}&api_key=${apiKey}`);
            console.log("Esta es la información de la api")
            console.log(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // function consultarAPI

        consultarAPI();
    }, []);

    const handleCotizar = (e) => {
        e.preventDefault();
        setMostrar(true);
    };

    return (
        <form onSubmit={(e) => handleCotizar(e)} className="formulario">
            {mostrar && <p>Formulario creado</p>}
            <div className='campo'>
                <label className="label" htmlFor="moneda">Moneda</label>
                <select
                    id="moneda"
                    className="select"
                    value={moneda}
                    onChange={(e) => setMoneda(e.target.value)}
                >
                    <option value="">- Seleccione -</option>
                    <option value="USD">Dólar USD</option>
                    <option value="MXN">Peso Mexicano MXN</option>
                    <option value="EUR">Euro EUR</option>
                    <option value="GBP">Libra Esterlina GBP</option>
                </select>
            </div>

            <div className='campo'>
                <label className="label" htmlFor="criptomoneda">Criptomoneda</label>
                <select
                    id="criptomoneda"
                    className="select"
                    value={criptomoneda}
                    onChange={(e) => setCriptomoneda(e.target.value)}
                >
                    <option value="">- Seleccione -</option>
                    <option value="BTC">Bitcoin BTC</option>
                    <option value="ETH">Ethereum ETH</option>
                    <option value="LTC">Litecoin LTC</option>
                    <option value="SOL">Solana SOL</option>
                    <option value="DOGE">Dogecoin DOGE</option>
                </select>
            </div>

            <button type="submit" className="btn-cotizar" onClick={() => consultarAPI()}>
                Cotizar
            </button>
        </form>
    );
};

export default Formulario;