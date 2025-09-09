import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";

export const useFranchise = (franchiseId) => {
  const [franchise, setFranchise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFranchise = async () => {
      if (!franchiseId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axiosInstance.get(`/franchises/${franchiseId}`);
        setFranchise(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching franchise:", err);
        setError("Failed to load franchise details");
        setFranchise(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFranchise();
  }, [franchiseId]);

  return { franchise, loading, error };
};

// Custom hook to get current franchise ID from params
export const useCurrentFranchiseId = () => {
  const params = useParams();
  return params.id;
};