import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LoadingHandlerProps } from '../types/index'

const LoadingHandler: FC<LoadingHandlerProps> = ({ setLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading time
    return () => clearTimeout(timer);
  }, [location])

  return null
}

export default LoadingHandler