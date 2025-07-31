import { useEffect, useState } from 'react';
import CriptoList from './CriptoList'
import CriptoOrderForm from './CriptoOrderForm'
import CriptoHeaderUpdateCount from './CriptoHeaderUpdateCount'
import { CriptoCoin } from '../models/CriptoCoin';
import { ResponseObject } from '../models/Response';
import CriptoLoader from './CriptoLoader';

export const Hero: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CriptoCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/crypto');
        const response: ResponseObject<CriptoCoin[]> = await res.json();
        if (isMounted) {
          setCryptoData(response.data);
          setLoading(false);
          setTimer(10); // Reset timer after fetch
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
        }
        console.log(error);
      }
    };

    fetchData(); // Initial fetch

    const fetchInterval = setInterval(fetchData, 10000);

    const timerInterval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 10));
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(fetchInterval);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <>
      <CriptoHeaderUpdateCount timer={timer} />
      <CriptoOrderForm data={cryptoData} />
      {loading ? (
        <CriptoLoader />
      ) : (
        <>
          <CriptoList data={cryptoData} />
        </>
      )}
    </>
  )
}

