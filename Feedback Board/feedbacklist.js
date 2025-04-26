const FeedbackList = ({ feedbacks, onDelete }) => (
    <div className="feedback-list">
      {feedbacks.map(feedback => (
        <FeedbackItem key={feedback.id} {...feedback} onDelete={() => onDelete(feedback.id)} />
      ))}
    </div>
  );
