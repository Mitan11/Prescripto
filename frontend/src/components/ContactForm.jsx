import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ContactForm = () => {
    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    // Validation & Submission State
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Input Validation
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'firstName':
                if (!value.trim()) error = 'First name is required';
                break;
            case 'email':
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'message':
                if (value.length < 10) error = 'Message must be at least 10 characters';
                break;
            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Real-time validation after first interaction
        if (errors[name]) validateField(name, value);
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        // Validate all fields
        const isValid = Object.entries(formData).every(([name, value]) =>
            validateField(name, value)
        );

        if (!isValid) {
            setIsSubmitting(false);
            return;
        }

        try {

            toastr.success('Message sent successfully!');
            setSubmitSuccess(true);
        } catch (err) {
            console.error(err);
            toast.error('Failed to send message. Please try again later.');
            setSubmitError('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            className="w-full mb-20 relative"
        >
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
            >
                {/* Name Fields */}
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                        <input
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={(e) => validateField('firstName', e.target.value)}
                            placeholder="First Name"
                            className={`border-b py-2 w-full focus:outline-none transition-colors ${errors.firstName ? 'border-red-500' : 'focus:border-black'
                                }`}
                            disabled={isSubmitting}
                        />
                        {errors.firstName && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            >
                                <FiAlertCircle /> {errors.firstName}
                            </motion.p>
                        )}
                    </div>

                    <div className="flex-1">
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="border-b py-2 w-full focus:outline-none focus:border-black"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={(e) => validateField('email', e.target.value)}
                        placeholder="Email"
                        className={`border-b py-2 w-full focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'focus:border-black'
                            }`}
                        disabled={isSubmitting}
                    />
                    {errors.email && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        >
                            <FiAlertCircle /> {errors.email}
                        </motion.p>
                    )}
                </div>

                {/* Message Field */}
                <div>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={(e) => validateField('message', e.target.value)}
                        placeholder="Message"
                        rows="4"
                        className={`border-b py-2 w-full focus:outline-none resize-none transition-colors ${errors.message ? 'border-red-500' : 'focus:border-black'
                            }`}
                        disabled={isSubmitting}
                    />
                    {errors.message && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        >
                            <FiAlertCircle /> {errors.message}
                        </motion.p>
                    )}
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="self-end bg-primary text-white px-6 py-2 rounded-full relative"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2"
                        >
                            Sending...
                        </motion.span>
                    ) : (
                        <motion.span initial={{ opacity: 1 }}>Send Message</motion.span>
                    )}
                </motion.button>

                {/* Status Messages */}
                {submitSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-0 right-0 bg-green-100 p-4 rounded-lg flex items-center gap-2"
                    >
                        <FiCheckCircle className="text-green-600" />
                        Message sent successfully!
                    </motion.div>
                )}

                {submitError && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-0 right-0 bg-red-100 p-4 rounded-lg flex items-center gap-2"
                    >
                        <FiAlertCircle className="text-red-600" />
                        {submitError}
                    </motion.div>
                )}
            </form>
        </motion.div>
    );
};

export default ContactForm;