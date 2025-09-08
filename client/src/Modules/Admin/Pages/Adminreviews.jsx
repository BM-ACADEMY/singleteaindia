import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { showToast } from "@/utils/customToast";
import { Pencil, Trash2, X } from "lucide-react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Rating from "react-rating";

const Adminreviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 0, description: "" });
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // Track review to delete
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/reviews");
      setReviews(data);
    } catch (err) {
      showToast(
        "error",
        err.response?.data?.message || "Failed to load reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit Review
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/reviews/${editingId}`, form);
        showToast("success", "Review updated successfully");
      } else {
        await axiosInstance.post("/reviews", form);
        showToast("success", "Review added successfully");
      }
      setForm({ name: "", rating: 0, description: "" });
      setEditingId(null);
      setShowModal(false);
      fetchReviews();
    } catch (err) {
      showToast("error", err.response?.data?.message || "Action failed");
    }
  };

  // Confirm delete button click
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  // Delete Review
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/reviews/${deleteId}`);
      showToast("success", "Review deleted successfully");
      fetchReviews();
    } catch (err) {
      showToast("error", err.response?.data?.message || "Delete failed");
    } finally {
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  // Edit Review
  const handleEdit = (review) => {
    setForm({
      name: review.name,
      rating: review.rating,
      description: review.description,
    });
    setEditingId(review._id);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      {/* Top Right Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Add Review
        </button>
      </div>

      {/* Reviews Section */}
      <div>
        {loading ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-5 bg-white border rounded-xl shadow-md hover:shadow-lg transition flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.name}
                    </h3>
                    <Rating
                      readonly
                      initialRating={review.rating}
                      emptySymbol={
                        <FaRegStar size={16} className="text-gray-300" />
                      }
                      fullSymbol={
                        <FaStar size={16} className="text-yellow-500" />
                      }
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mt-3">{review.description}</p>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(review)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => confirmDelete(review._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowModal(false);
                setEditingId(null);
                setForm({ name: "", rating: 0, description: "" });
              }}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Review" : "Add Review"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border p-2 rounded"
              />

              {/* Star Rating Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <Rating
                  initialRating={form.rating}
                  onChange={(rate) => setForm({ ...form, rating: rate })}
                  emptySymbol={
                    <FaRegStar size={24} className="text-gray-400" />
                  }
                  fullSymbol={<FaStar size={24} className="text-yellow-500" />}
                />
              </div>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write your review"
                required
                className="w-full border p-2 rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {editingId ? "Update Review" : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 px-4">
          <div className="flex flex-col items-center bg-white shadow-md rounded-xl py-6 px-5 md:w-[460px] w-[370px] border border-gray-200">
            <div className="flex items-center justify-center p-4 bg-red-100 rounded-full">
              <Trash2 className="text-red-600" size={28} />
            </div>
            <h2 className="text-gray-900 font-semibold mt-4 text-xl">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Do you really want to delete this review?
              <br />
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-4 mt-5 w-full">
              <button
                type="button"
                onClick={() => setShowDeleteDialog(false)}
                className="w-full md:w-36 h-10 rounded-md border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full md:w-36 h-10 rounded-md text-white bg-red-600 font-medium text-sm hover:bg-red-700 active:scale-95 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminreviews;
