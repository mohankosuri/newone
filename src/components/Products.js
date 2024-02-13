import React, { useState, useEffect, useContext } from 'react';
import Grid from './Grid';
import { UserContext } from './UserContext';
import Form1 from './Form1';
 

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { increment } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const json = await res.json();
      setData(json);
      setLoading(false);
      console.log(json);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mx-4 mt-4">
      {loading ? (
        <div className="flex justify-center">

        <div className='flex justify-center ml-[500px]'>
        
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-spinner loading-sm"></span>
        <span className="loading loading-spinner loading-md"></span>
        <span className="loading loading-spinner loading-lg"></span>
        
        
        
        
        </div>
           
        </div>
      ) : (
        data.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="card h-full w-[250px] rounded overflow-hidden shadow-md">
              <img
                src={item.image}
                alt="Product"
                className="w-full h-40 object-cover"
              />
              <div className="card-body p-4">
                <h5 className="card-title text-lg font-semibold mb-2">
                  {item.title}
                </h5>
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-lg font-bold">INR {item.price}</h5>
                  <button
                    className="bg-green-500 text-white px-3 py-1"
                    onClick={increment}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

    
      
    </div>
  );
};

export default Products;
