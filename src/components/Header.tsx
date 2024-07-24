import { FC } from 'react'
import { Link } from 'react-router-dom'
import { HeaderProps } from '../types/index';

const Header: FC<HeaderProps> = ({ loading }) => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md p-4 mb-10">
      <div className="flex justify-between container mx-auto">
        <Link to={'/'} className="text-2xl font-bold text-cyan-600">
          Podcaster
        </Link>
        {loading && <div className="loader"/>}
      </div>
    </header>
  );
};

export default Header