const FeedbackForm = ({ addFeedback }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!name || !email || !comment || !/\S+@\S+\.\S+/.test(email)) {
        setMessage("Please fill all fields correctly.");
        return;
      }
  
      const feedback = {
        name,
        email,
        comment,
        timestamp: new Date().toLocaleString()
      };
  
      addFeedback(feedback);
      setName(""); setEmail(""); setComment("");
      setMessage("Feedback submitted!");
      setTimeout(() => setMessage(""), 3000);
    };
  
    return (
      <form onSubmit={handleSubmit} id="feedback-form">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <textarea placeholder="Your Feedback" value={comment} onChange={e => setComment(e.target.value)} required></textarea>
        <button type="submit">Submit</button>
        {message && <p className="confirmation">{message}</p>}
      </form>
    );
  };
