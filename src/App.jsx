// Import of Pages and Components
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import SignPage from "./pages/SignPage";
import NotFound from "./pages/NotFound";
import SignIn from "./components/SignIn";

// Import of needed modules
import { Routes, Route, Navigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

// Import of CSS
import "./styles/App.css";
import "./styles/header.css";
import "./styles/eventPreviewCard.css";
import "./styles/events.css";
import "./styles/footer.css";
import "./styles/sign.css";
import "./styles/eventDetailPage.css";

// Context API
const EventData = createContext();
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth);

  useEffect(() => {
    setIsAuthenticated(!!auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedLayout = ({ children }) => {
  const { auth, isAuthenticated } = useContext(AuthContext);

  if (!auth || !isAuthenticated) {
    return <Navigate to="/signpage" replace />;
  }
  return children;
};

function App() {
  const [events, setEvents] = useState([]);

  // Data Fetching Start
  useEffect(() => {
    fetch("http://localhost:3001/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.results);
        console.log(data.results);
      });
  }, []);
  // Data Fetching End

  return (
    <div>
      <AuthProvider>
        {/* Context Provider Start */}
        <EventData.Provider value={events}>
          <Header />
          <Routes>
            {/* ROUTES start */}

            <Route path="/" element={<Home />} />
            <Route path="signpage" element={<SignPage />} />
            <Route path="signin" element={<SignIn />} />
            <Route
              path="events"
              element={
                <ProtectedLayout>
                  <Events />
                </ProtectedLayout>
              }
            />
            <Route
              path="events/:id"
              element={
                <ProtectedLayout>
                  <EventDetail />
                </ProtectedLayout>
              }
            />

            <Route
              path="edit/:id"
              element={
                <ProtectedLayout>
                  <EventDetail />
                </ProtectedLayout>
              }
            />
            <Route
              path="edit/new"
              element={
                <ProtectedLayout>
                  <EventDetail />
                </ProtectedLayout>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<NotFound />} />

            {/* ROUTES end */}
          </Routes>
          <Footer />

          {/* Context Provider End */}
        </EventData.Provider>
      </AuthProvider>
    </div>
  );
}

export { EventData, AuthContext };
export default App;
