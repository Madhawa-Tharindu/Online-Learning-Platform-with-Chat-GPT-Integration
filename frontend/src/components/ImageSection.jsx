/* eslint-disable react/prop-types */
// import { FaSearch } from 'react-icons/fa'; // Importing search icon
// import dashboardImage from '../assets/dashboard-slide.png'; // Update the path if necessary

// const ImageSection = () => {
//   return (
//     <div className="w-full h-64 bg-cover bg-center mb-8" style={{ backgroundImage: `url(${dashboardImage})` }}>
//       <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
//         {/* Search Field */}
//         <div className="relative">
//           <FaSearch className="absolute top-2 left-3 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search for what you want to learn"
//             className="pl-10 pr-4 py-2 rounded-full bg-white text-gray-800 w-[32rem] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageSection;



// import { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import dashboardImage from '../assets/dashboard-slide.png'; // Update the path if necessary

// const ImageSection = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       await onSearch(searchQuery);
//     }
//   };

//   return (
//     <div className="w-full h-64 bg-cover bg-center mb-8" style={{ backgroundImage: `url(${dashboardImage})` }}>
//       <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
//         <form onSubmit={handleSearch} className="relative">
//           <FaSearch className="absolute top-2 left-3 text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search for what you want to learn"
//             className="pl-10 pr-4 py-2 rounded-full bg-white text-gray-800 w-[32rem] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ImageSection;






import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import dashboardImage from '../assets/dashboard-slide.png';

const ImageSection = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery); // Pass the search query to the parent component
  };

  return (
    <div className="w-full h-64 bg-cover bg-center mb-8" style={{ backgroundImage: `url(${dashboardImage})` }}>
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="relative">
          <FaSearch className="absolute top-2 left-3 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for what you want to learn"
            className="pl-10 pr-4 py-2 rounded-full bg-white text-gray-800 w-96 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSection;



