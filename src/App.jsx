import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  addDoc,
  doc,
  updateDoc,
  collection,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

function App() {
  const [visitorName, setVisitorName] = useState("");
  const [visitorId, setVisitorId] = useState(null);
  const [isEntered, setIsEntered] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Save visitor when they enter
  const handleEnter = async () => {
    if (!visitorName) return;
    const docRef = await addDoc(collection(db, "visitors"), {
      name: visitorName,
      sessionStart: serverTimestamp(),
      interactions: [],
    });
    setVisitorId(docRef.id);
    setIsEntered(true);
  };

  // Log interaction to Firestore
  const logInteraction = async (section) => {
    if (!visitorId) return;
    const ref = doc(db, "visitors", visitorId);
    await updateDoc(ref, {
      interactions: arrayUnion({
        section,
        openedAt: new Date().toISOString(),
      }),
    });
  };

  // Track session end
  useEffect(() => {
    if (!visitorId) return;

    const handleUnload = async () => {
      const ref = doc(db, "visitors", visitorId);
      await updateDoc(ref, {
        sessionEnd: new Date().toISOString(),
      });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [visitorId]);


              //min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white
  return (
    <div className="min-h-screen flex items-center justify-center text-white"> 
      {!isEntered ? (
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Welcome! I'm Danish Ian</h1>
          <p className="text-gray-400">Before we proceed, tell me your name</p>
          <input
            type="text"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            className="px-4 py-2 rounded text-white"
            placeholder="Type your name..."
          />
          <button
            onClick={handleEnter}
            className="animate-ping ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded"
          >
            Enter
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <h2 className="text-2xl font-bold">Hello, {visitorName} 👋</h2>
          <p className="text-gray-400">Click buttons below to reveal info</p>

          <div className="space-y-4">
            <button
              onClick={() => {
                setShowAbout(!showAbout);
                logInteraction("About Me");
              }}
              className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              {showAbout ? "Hide About Me" : "Show About Me"}
            </button>
            {showAbout && (
              <div className="p-4 bg-gray-800 rounded shadow">
                <h3 className="font-bold">About Me</h3>
                <p>I’m Danish, passionate about tech and building interactive solutions.</p>
              </div>
            )}

            <button
              onClick={() => {
                setShowProjects(!showProjects);
                logInteraction("Projects");
              }}
              className="px-6 py-2 bg-green-500 rounded hover:bg-green-600"
            >
              {showProjects ? "Hide Projects" : "Show Projects"}
            </button>
            {showProjects && (
              <div className="p-4 bg-gray-800 rounded shadow">
                <h3 className="font-bold">Projects</h3>
                <ul className="list-disc text-left ml-6">
                  <li>AI Traffic Support System</li>
                  <li>SocialRiskAPI</li>
                  <li>More to come 🚀</li>
                </ul>
              </div>
            )}

            <button
              onClick={() => {
                setShowContact(!showContact);
                logInteraction("Contact");
              }}
              className="px-6 py-2 bg-purple-500 rounded hover:bg-purple-600"
            >
              {showContact ? "Hide Contact" : "Show Contact"}
            </button>
            {showContact && (
              <div className="p-4 bg-gray-800 rounded shadow">
                <h3 className="font-bold">Contact</h3>
                <p>Email: danishian@gmail.com</p>
                <p>GitHub: github.com/danishian</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
