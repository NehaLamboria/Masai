const FeedbackItem = ({ name, email, comment, timestamp, onDelete }) => (
    <div className="feedback-card">
      <h3>{name}</h3>
      <p>{comment}</p>
      <small>{email}</small><br />
      {timestamp && <small>{timestamp}</small>}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
