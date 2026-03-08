import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
      <div style={{ padding: 40 }}>

        <h1>AI DevOps Agent 🤖</h1>

        <p style={{ color: "green" }}>
          Agent Status: Connected
        </p>

        <p>
          Secure AI DevOps Assistant powered by Auth0
        </p>

        <button onClick={() => loginWithRedirect()}>
          Login with Auth0
        </button>

      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>

      <h1>AI DevOps Agent 🤖</h1>

      <p style={{ color: "green" }}>
        Agent Status: Connected
      </p>

      <p>Welcome {user.name}</p>

      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Logout
      </button>

      <div style={{ marginTop: 20 }}>

        <input
          id="devops-question"
          name="devops-question"
          style={{ width: "300px", padding: "10px" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask DevOps question"
        />

        <button
          style={{ marginLeft: "10px", padding: "10px" }}
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

      <div style={{ marginTop: 30 }}>

        <b>Agent Response:</b>
        <p>{response}</p>

      </div>

      <div style={{ marginTop: 40 }}>

        <h3>Conversation History</h3>

        {history.map((item, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <p><b>User:</b> {item.question}</p>
            <p><b>Agent:</b> {item.answer}</p>
          </div>
        ))}

      </div>

      <div style={{ marginTop: 40 }}>

        <h3>Architecture</h3>

        <p>
          React Frontend → Auth0 Authentication → Node Backend → AI DevOps Agent
        </p>

      </div>

    </div>
  );

}

export default App;