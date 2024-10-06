import Header from '../Shared/header'
import Footer from '../Shared/Footer';

const HomePage = () => {
  return (
    <div className="text-center py-10">
   
      <h1 className="text-4xl font-bold mb-4">Welcome to Bus App</h1>
      <p className="text-lg">Choose your role to get started:</p>
      <div className="flex justify-center mt-6 space-x-6">
        <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</a>
        <a href="/register" className="bg-green-500 text-white px-4 py-2 rounded">Register</a>
      </div>
      
    </div>
  );
};

export default HomePage;
