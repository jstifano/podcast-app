import { FC, useState } from 'react';
import AppRoutes from './routes/index'
import Header from './components/Header'
import LoadingHandler from './components/LoadingHandler';

const App: FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header loading={loading} />
      <LoadingHandler setLoading={setLoading} />
      <div className="pt-1">
        <AppRoutes />
      </div>
    </>
  )
}

export default App
