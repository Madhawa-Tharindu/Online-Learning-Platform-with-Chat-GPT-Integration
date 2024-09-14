import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl">Welcome to the Learning Platform</h1>
      <div className="mt-4">
        <Link to="/login" className="mr-4 text-blue-500">Login</Link>
        <Link to="/register" className="text-blue-500">Register</Link>
      </div>
    </div>
  );
};

export default Home;
