import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, isAuthenticated } = useContext(AuthContext);
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await register({
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
            });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F6F7F9]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A202C] text-center mb-2">
                    Join Morent
                </h2>
                <p className="text-center text-[#596780] mb-6 sm:mb-8 text-sm sm:text-base">
                    Start your journey with the best car rental service.
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
                            id="name"
                            label="Full Name"
                            placeholder="Your name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                id="email"
                                label="Email Address"
                                type="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <Input
                                id="phoneNumber"
                                label="Phone Number"
                                placeholder="Phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                placeholder="Password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <Input
                                id="confirmPassword"
                                label="Confirm"
                                type="password"
                                placeholder="Confirm"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <Button type="submit" className="w-full mt-4" disabled={loading}>
                            {loading ? 'Creating account...' : 'Sign up'}
                        </Button>

                        <div className="text-center mt-4">
                            <p className="text-[#90A3BF] text-sm">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#3563E9] font-bold hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
