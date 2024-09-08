import React, { useState, useEffect } from 'react';
import Kpay from '../assets/KBZ.png';
import Visa from '../assets/visalogo.jpg';
import Wave from '../assets/Wave.jpg';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Fetch the cart items from local storage or any other source
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotalPrice(storedCart);
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setTotalPrice(total);
  };

  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotalPrice(updatedCart);
  };

  const handlePurchase = () => {
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">No.</th>
              <th className="px-4 py-2 border-b">Book Title</th>
              <th className="px-4 py-2 border-b">Price</th>
              <th className="px-4 py-2 border-b">Cancel Order</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{item.title}</td>
                  <td className="px-4 py-2 border-b text-center">Ks.{item.price}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleRemove(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border-b text-center">Your cart is empty.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold">Total Price:</span>
        <span className="text-xl font-bold">Ks.{totalPrice.toFixed(2)}</span>
      </div>
      <div className="mt-4">
        <button
          onClick={handlePurchase}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Purchase
        </button>

        {/* Payment Method Modal */}
        {showPaymentModal && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='bg-white p-6 rounded shadow-lg'>
              <h2 className='text-2xl font-bold mb-4'>Select Payment Method</h2>
              <div className='flex flex-col gap-4'>
                <button className='flex items-center gap-2 bg-[#004B49] text-white py-2 px-4 rounded hover:bg-[#003a38]'>
                  <img src={Kpay} alt="K-pay" className="h-6" />
                  K-pay
                </button>
                <button className='flex items-center gap-2 bg-[#0033A0] text-white py-2 px-4 rounded hover:bg-[#002a7a]'>
                  <img src={Visa} alt="VISA" className="h-6" />
                  VISA
                </button>
                <button className='flex items-center gap-2 bg-[#0066CC] text-white py-2 px-4 rounded hover:bg-[#0052a3]'>
                  <img src={Wave} alt="Wave-pay" className="h-6" />
                  Wave-pay
                </button>
              </div>
              <button
                onClick={handleCloseModal}
                className='mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700'
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
