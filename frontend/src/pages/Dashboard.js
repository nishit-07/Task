import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { User, ShieldCheck, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
            Welcome, <span className="text-indigo-600">{user?.role === 'admin' ? 'Admin' : 'User'}</span>!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Role Card */}
            <div className="bg-blue-100 hover:bg-blue-200 transition rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Your Role</h3>
              <p className="text-blue-800 text-lg capitalize">{user?.role}</p>
            </div>

            {/* Access Card */}
            <div className="bg-green-100 hover:bg-green-200 transition rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-green-900 mb-2">Access Level</h3>
              <p className="text-green-800 text-lg">
                {user?.role === 'admin' ? 'Full Access' : 'Limited Access'}
              </p>
            </div>

            {/* Features Card */}
            <div className="bg-purple-100 hover:bg-purple-200 transition rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Available Features</h3>
              <ul className="text-purple-800 text-base space-y-1 list-disc list-inside">
                <li>View Products</li>
                {user?.role === 'admin' && (
                  <>
                    <li>Manage Categories</li>
                    <li>Add Products</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
