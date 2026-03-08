import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {

    try {
  
      console.log("Sending:", message);
  
      const res = await fetch("https://ai-devops-agent-g5tq.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: message })
      });
  
      const data = await res.json();
  
      console.log("Response:", data);
  
      setResponse(data);
  
    } catch (error) {
      console.error("Error:", error);
    }
  
  };

  if (!isAuthenticated) {
    return (
      <div style={{padding:40}}>
        <h1>AI DevOps Agent 🤖</h1>
        <button onClick={() => loginWithRedirect()}>
          Login with Auth0
        </button>
      </div>
    );
  }

  return (
    <div style={{padding:40}}>

      <h1>AI DevOps Agent 🤖</h1>

      <p>Welcome {user.name}</p>

      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Logout
      </button>

      <div style={{marginTop:20}}>
        <input
          id="devops-question"
          name="devops-question"
          style={{width:"300px", padding:"10px"}}
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Ask DevOps question"
        />

        <button
          style={{marginLeft:"10px", padding:"10px"}}
          onClick={sendMessage}
        >
          Ask
        </button>

      </div>

      <div style={{marginTop:30}}>
        <b>Agent Response:</b>
        <p>{response}</p>
      </div>

    </div>
  );

}

export default App;