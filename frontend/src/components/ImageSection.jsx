import { FaSearch } from 'react-icons/fa'; // Importing search icon
import dashboardImage from '../assets/dashboard-slide.png'; // Update the path if necessary

const ImageSection = () => {
  return (
    <div className="w-full h-64 bg-cover bg-center mb-8" style={{ backgroundImage: `url(${dashboardImage})` }}>
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        {/* Search Field */}
        <div className="relative">
          <FaSearch className="absolute top-2 left-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search for what you want to learn"
            className="pl-10 pr-4 py-2 rounded-full bg-white text-gray-800 w-[32rem] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSection;

