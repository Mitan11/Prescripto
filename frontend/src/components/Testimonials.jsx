import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export default function Testimonials({
    title = "What Our Patients Say",
    subtitle = "Discover why patients choose our healthcare services. Read honest experiences from real patients who have trusted our doctors with their health.",
    doctorId = null,
    maxItems = null
}) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { backendUrl } = useContext(AppContext);

    // Enhanced Star Rating Display Component with half-star support
    const StarRating = ({ rating }) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-lg">
                        {rating >= star ? (
                            <FaStar className="text-yellow-400" />
                        ) : rating >= star - 0.5 ? (
                            <FaStarHalfAlt className="text-yellow-400" />
                        ) : (
                            <FaStar className="text-gray-300" />
                        )}
                    </span>
                ))}
                <span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>
            </div>
        );
    };

    // Custom Arrow Components
    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none"
                onClick={onClick}
                aria-label="Next"
            >
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        );
    };

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none"
                onClick={onClick}
                aria-label="Previous"
            >
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        );
    };

    // Carousel Settings
    const settings = {
        dots: true,
        infinite: reviews.length > 3,
        speed: 500,
        slidesToShow: reviews.length >= 3 ? 3 : reviews.length,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: reviews.length >= 2 ? 2 : 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                let url = `${backendUrl}/api/user/reviews`;

                // If doctorId is provided, fetch only reviews for that doctor
                if (doctorId) {
                    url = `${backendUrl}/api/user/reviews?doctorId=${doctorId}`;
                }

                const response = await axios.get(url);
                if (response.data.success) {
                    let filteredReviews = response.data.reviews;

                    // Sort reviews by rating (highest first) and date (newest first)
                    filteredReviews = filteredReviews.sort((a, b) => {
                        // First sort by rating (highest first)
                        if (b.rating !== a.rating) {
                            return b.rating - a.rating;
                        }
                        // Then sort by date (newest first)
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });

                    // Apply maxItems limit if provided
                    if (maxItems && filteredReviews.length > maxItems) {
                        filteredReviews = filteredReviews.slice(0, maxItems);
                    }

                    setReviews(filteredReviews);
                } else {
                    setError(response.data.message || 'Failed to fetch reviews');
                    toast.error(response.data.message || 'Failed to fetch reviews');
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Failed to fetch reviews';
                setError(errorMessage);
                console.error('Failed to fetch reviews', error);
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, [backendUrl, doctorId, maxItems]);

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {title}
                    </motion.h2>

                    <motion.p
                        className="text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {subtitle}
                    </motion.p>

                </div>

                <div className='flex justify-center items-center'>
                    <motion.span
                        className="inline-block px-3 py-1 bg-blue-50 text-primary rounded-full text-sm font-medium mb-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Testimonials
                    </motion.span>
                </div>
                <motion.div
                    className="relative px-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {isLoading ? (
                        <div className="grid md:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white p-8 rounded-xl shadow-md animate-pulse h-64">
                                    <div className="flex mb-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <div key={star} className="w-5 h-5 rounded-full bg-gray-200 mr-1"></div>
                                        ))}
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                                    <div className="h-24 bg-gray-200 rounded mb-4"></div>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 rounded-lg p-6 text-center">
                            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-600">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : reviews.length > 0 ? (
                        <Slider {...settings}>
                            {reviews.map((review) => (
                                <div key={review._id} className="p-3">
                                    <motion.div
                                        className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="mb-4">
                                            <StarRating rating={review.rating} />
                                            <div className="mt-4 flex-grow">
                                                <p className="text-gray-700 italic mb-6">"{review.comment}"</p>
                                            </div>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-gray-100">
                                            <div className="flex items-center">
                                                {review.user?.image ? (
                                                    <img
                                                        src={review.user.image}
                                                        alt={review.user.name}
                                                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mr-4 text-lg font-medium">
                                                        {review.user?.name?.charAt(0) || 'A'}
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-semibold text-gray-800">{review.user?.name || 'Anonymous'}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Patient of Dr. {review.doctor?.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}