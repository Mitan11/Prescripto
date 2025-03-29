import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { FaStar, FaTrash, FaUser, FaCalendarAlt, FaStethoscope, FaExclamationCircle } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

function DoctorReviews() {
    const { dToken, backendUrl } = useContext(DoctorContext)
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getReviews = async () => {
        try {
            setLoading(true)
            setError(null)
            const { data } = await axios.get(`${backendUrl}/api/doctor/reviews`, { headers: { dtoken: dToken } })
            if (data.success) {
                setReviews(data.reviews)
            } else {
                setError(data.message || 'Failed to fetch reviews')
                toast.error(data.message || 'Failed to fetch reviews')
            }
        } catch (error) {
            console.error('Error fetching reviews:', error)
            setError(error.response?.data?.message || 'Failed to fetch reviews')
            toast.error(error.response?.data?.message || 'Failed to fetch reviews')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (reviewId) => {
        try {
            if (confirm("Are you sure you want to delete this review?")) {
                const { data } = await axios.post(`${backendUrl}/api/doctor/delete-review`, { reviewId }, { headers: { dtoken: dToken } })
                if (data.success) {
                    toast.success(data.message)
                    setReviews(reviews.filter(review => review._id !== reviewId))
                } else {
                    toast.error(data.message || 'Failed to delete review')
                }
            }
        } catch (error) {
            console.error('Error deleting review:', error)
            toast.error(error.response?.data?.message || 'Failed to delete review')
        }
    }

    useEffect(() => {
        if (dToken) {
            getReviews()
        }
    }, [dToken])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4">
                <FaExclamationCircle className="text-6xl text-red-500 mb-4" />
                <p className="text-gray-700 text-lg text-center mb-4">{error}</p>
                <button 
                    onClick={getReviews}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6 w-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl sm:text-2xl font-semibold">Doctor Reviews</h1>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                    </span>
                </div>
            </div>

            {reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                    <FaStethoscope className="text-6xl text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">No reviews yet</p>
                </div>
            ) : (
                <div className='w-full overflow-y-scroll h-[calc(100vh-10rem)]'>
                    <div className="flex flex-col sm:flex-row flex-wrap  gap-4 sm:gap-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                                        {review.user.image ? (
                                            <img 
                                                src={review.user.image} 
                                                alt={review.user.name} 
                                                className='w-full h-full object-cover'
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://via.placeholder.com/40';
                                                }}
                                            />
                                        ) : (
                                            <FaUser className="text-primary" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-medium text-gray-900">{review.user.name}</h3>
                                        <p className="text-xs sm:text-sm text-gray-500">{review.user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="self-end sm:self-start p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                                    title="Delete Review"
                                >
                                    <FaTrash className="text-sm" />
                                </button>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className={`text-sm ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">{review.rating}/5</span>
                                </div>
                                <p className="text-sm sm:text-base text-gray-700">{review.comment}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs sm:text-sm text-gray-500">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-primary" />
                                        <span>Review Date: {new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p>Appointment ID: {review.appointment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )}
        </div>
    )
}

export default DoctorReviews