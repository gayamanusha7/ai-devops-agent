import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";

function App() {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const sendMessage = async () => {

    if (!message) return;

    try {

      setLoading(true);

      const res = await fetch("https://ai-devops-agent-g5tq.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: message })
      });

      const data = await res.json();

      setResponse(data);

      setHistory([...history, { question: message, answer: data }]);

      setMessage("");

      setLoading(false);

    } catch (error) {

      console.error("Error:", error);
      setLoading(false);

    }

  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <div className="container">

          <h1 className="title">🤖 AI DevOps Agent</h1>
          <p className="subtitle">
            Secure DevOps Assistant powered by Auth0
          </p>

          <span className="status">● Agent Connected</span>

          <button className="ask-btn" onClick={() => loginWithRedirect()}>
            Login with Auth0
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="App">

      <div className="container">

        <h1 className="title">🤖 AI DevOps Agent</h1>
        <p className="subtitle">Secure DevOps Assistant powered by Auth0</p>

        <span className="status">● Agent Connected</span>

        <p>Welcome {user.name}</p>

        <button
          className="ask-btn"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Logout
        </button>

        <div className="input-row">

          <input
            className="input-box"
            id="devops-question"
            name="devops-question"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask DevOps question"
          />

          <button
            className="ask-btn"
            onClick={sendMessage}
          >
            Ask
          </button>

        </div>

        {loading && (
          <p style={{ marginTop: 20 }}>
            Agent is thinking...
          </p>
        )}

        <div className="response">

          <b>Agent Response:</b>
          <pre style={{whiteSpace: "pre-wrap"}}>
            {response}
          </pre>

        </div>

        <div className="history">

          <h3>Conversation</h3>

          {history.map((item, index) => (
            <div key={index}>

              <div className="message-user">
                <b>You:</b> {item.question}
              </div>

              <div className="message-agent">
                <b>Agent:</b> {item.answer}
              </div>

            </div>
          ))}

        </div>

        <div className="architecture">

          <h3>Architecture</h3>

          React Frontend → Auth0 Authentication → Node Backend → AI DevOps Agent

        </div>

      </div>

    </div>
  );

}

export default App;
