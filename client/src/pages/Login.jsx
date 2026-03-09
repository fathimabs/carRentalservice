import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '', // Can be email or phone
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect if already logged in
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData); // identifier and password
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F6F7F9]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A202C] text-center mb-2">
                    Welcome Back
                </h2>
                <p className="text-center text-[#596780] mb-6 sm:mb-8 text-sm sm:text-base">
                    Login to access your Morent account.
                </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 sm:py-10 sm:px-8 rounded-[10px] shadow-sm">
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-[10px]">
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        <Input
                            id="identifier"
                            label="Email or Phone Number"
                            placeholder="Email or phone number"
                            required
                            value={formData.identifier}
                            onChange={handleChange}
                        />

                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <Button type="submit" className="w-full mt-4" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>

                        <div className="text-center mt-4">
                            <p className="text-[#90A3BF] text-sm">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-[#3563E9] font-bold hover:underline">
                                    Register now
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
