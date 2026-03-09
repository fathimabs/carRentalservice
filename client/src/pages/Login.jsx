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
            await login(formData);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F6F7F9]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex justify-center mb-8">
                    <span className="text-[32px] font-bold text-[#3563E9] tracking-tight">MORENT</span>
                </Link>
                <h2 className="text-[32px] font-bold text-[#1A202C] text-center mb-2 tracking-tight">
                    Welcome Back
                </h2>
                <p className="text-center text-[#90A3BF] mb-8 text-base font-medium">
                    Login to access your Morent account.
                </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-10 px-8 rounded-[10px] shadow-sm border border-[#C3D4E9] border-opacity-40">
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

                        <Button type="submit" className="w-full mt-2 h-[56px] text-base font-bold" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>

                        <div className="text-center mt-2">
                            <p className="text-[#90A3BF] font-medium text-sm">
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
