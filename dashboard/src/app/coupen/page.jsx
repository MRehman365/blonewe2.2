// pages/admin/discounts.tsx
'use client';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { createCoupon, deleteCoupon, getAllCoupons } from '@/store/reducers/coupenReducer';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AdminDiscountsPage = () => {
    const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state) => state.coupen);
  const [code, setCode] = useState('');
  const [discount, setDiscountPercent] = useState(0);
  const [limit, setUserLimit] = useState(1);

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  const data = Array.isArray(coupons) ? coupons : coupons?.coupons || [];

  const handleAddCoupon = async() => {
    if (!code || discount <= 0 || limit <= 0) {
      alert('Please fill all fields correctly.');
      return;
    }

   await dispatch(createCoupon({ code, discount, limit }))
    dispatch(getAllCoupons());
  };

  const handleDeleteCoupon = async(id) => {
   await dispatch(deleteCoupon(id));
    dispatch(getAllCoupons());
  };

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold mb-4">Admin Discount Coupons</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount Percent</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">User Limit</label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setUserLimit(parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            onClick={handleAddCoupon}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Coupon
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Coupons List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Coupon Code</th>
                <th className="py-2 px-4 border-b">Discount (%)</th>
                <th className="py-2 px-4 border-b">User Limit</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((coupon, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-center">{coupon.code}</td>
                  <td className="py-2 px-4 border-b text-center">{coupon.discount}%</td>
                  <td className="py-2 px-4 border-b text-center">{coupon.limit}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDeleteCoupon(coupon._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DefaultLayout>
  );
};

export default AdminDiscountsPage;