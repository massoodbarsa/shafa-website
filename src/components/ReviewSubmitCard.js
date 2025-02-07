// components/ReviewSubmitCard.js
import React, { useState } from "react";
import {
  Box,
  TextField,
  Card,
  Typography,
  Rating,
  CardContent,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuthStore from "../store/authStore";

const ReviewSubmitCard = ({
  newReview,
  setNewReview,
  handleSubmitReview,
  loading,
  reviews,
  user,
  disableReviewForm,
}) => {
  const [submitted, setSubmitted] = useState(false); // Track if the form has been submitted
  const { isLoggedIn } = useAuthStore();

  const handleRatingChange = (event, newValue) => {
    setNewReview({ ...newReview, rating: newValue });
  };

  const handleReviewTextChange = (e) => {
    setNewReview({ ...newReview, review_text: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true); // Mark as submitted
    handleSubmitReview();
  };

  return (
    <Card
      sx={{
        p: 4,
        boxShadow: 3,
        borderRadius: 4,
        bgcolor: "background.paper",
        mt: 4,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Patient Reviews</Typography>
          {!isLoggedIn && (
            <Typography variant="caption">(Log in to place review)</Typography>
          )}
        </Box>
        <Divider sx={{ my: 2 }} />

        {/* Display Existing Reviews */}
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Box
              key={index}
              sx={{ my: 2, p: 2, bgcolor: "grey.100", borderRadius: 2 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {review.clients?.full_name || "Anonymous"}
              </Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {review.review_text}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>
            No reviews yet.{" "}
            {!disableReviewForm && "Be the first to leave a review"}
          </Typography>
        )}

        {/* Review Submission Form (Only for Logged-in Clients) */}
        {/* {user && user.user_id !== doctorData.user_id && ( */}
        {user &&
          user.user_id &&
          !disableReviewForm && ( // Disable form based on the condition
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Leave a Review</Typography>
              <Rating value={newReview.rating} onChange={handleRatingChange} />
              <TextField
                fullWidth
                label="Your review"
                multiline
                rows={3}
                variant="outlined"
                sx={{ mt: 2 }}
                value={newReview.review_text}
                onChange={handleReviewTextChange}
                error={submitted && !newReview.review_text.trim()} // Show error only when submitted
                helperText={
                  submitted && !newReview.review_text.trim()
                    ? "Review cannot be empty."
                    : ""
                }
              />
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
                loading={loading}
                disabled={!newReview.review_text.trim()}
              >
                Submit Review
              </LoadingButton>
            </Box>
          )}
      </CardContent>
    </Card>
  );
};

export default ReviewSubmitCard;
