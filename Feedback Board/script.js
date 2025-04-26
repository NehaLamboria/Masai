const { useState, useEffect } = React;

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Load theme
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load feedbacks
  useEffect(() => {
    fetch("https://your-project-id.firebaseio.com/feedbacks.json")
      .then(res => res.json())
      .then(data => {
        const loaded = Object.entries(data || {}).map(([id, val]) => ({ id, ...val }));
        setFeedbacks(loaded.reverse());
      });
  }, []);

  const addFeedback = (newFeedback) => {
    fetch("https://your-project-id.firebaseio.com/feedbacks.json", {
      method: "POST",
      body: JSON.stringify(newFeedback)
    })
    .then(res => res.json())
    .then(({ name }) => {
      setFeedbacks([{ id: name, ...newFeedback }, ...feedbacks]);
    });
  };

  const deleteFeedback = (id) => {
    fetch(https://your-project-id.firebaseio.com/feedbacks/${id}.json, {
      method: "DELETE"
    })
    .then(() => {
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    });
  };

  return (
    <div className="container">
      <header><h1>Feedback Board</h1></header>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <FeedbackForm addFeedback={addFeedback} />
      <FeedbackList feedbacks={feedbacks} onDelete={deleteFeedback} />
    </div>
  );
}

// Components
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

const FeedbackList = ({ feedbacks, onDelete }) => (
  <div className="feedback-list">
    {feedbacks.map(feedback => (
      <FeedbackItem key={feedback.id} {...feedback} onDelete={() => onDelete(feedback.id)} />
    ))}
  </div>
);

const FeedbackItem = ({ name, email, comment, timestamp, onDelete }) => (
  <div className="feedback-card">
    <h3>{name}</h3>
    <p>{comment}</p>
    <small>{email}</small><br />
    {timestamp && <small>{timestamp}</small>}
    <button onClick={onDelete}>Delete</button>
  </div>
);

const ThemeToggle = ({ theme, setTheme }) => (
  <button id="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
  </button>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
