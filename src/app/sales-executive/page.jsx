
import Link from 'next/link';

const ViewOrders = () => {
  const orders = [
    { orderId: '123', customerName: 'John Doe', contactNumber: '9876543210', products: 'Product 1, Product 2', purchase: 'Paid' },
    { orderId: '124', customerName: 'Jane Doe', contactNumber: '9876543211', products: 'Product 3, Product 4', purchase: 'Pending' },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders List</h1>
        <Link href="/sales-executive/create-order">
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Add New Order</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-6 py-4 border-b-2 border-gray-300">Order ID</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Customer Name</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Contact Number</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Products</th>
              <th className="px-6 py-4 border-b-2 border-gray-300">Purchase Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-300">{order.orderId}</td>
                <td className="px-6 py-4 border-b border-gray-300">{order.customerName}</td>
                <td className="px-6 py-4 border-b border-gray-300">{order.contactNumber}</td>
                <td className="px-6 py-4 border-b border-gray-300">{order.products}</td>
                <td className="px-6 py-4 border-b border-gray-300">{order.purchase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;
