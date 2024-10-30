const CategoryDisplay = ({ category }) => {
   
    return (
      <span
        className={`inline-block  rounded-full px-2 py-1 text-xs font-semibold text-gray-700 }`}
      >
        {category}
      </span>
    );
  };
  
  export default CategoryDisplay;
  