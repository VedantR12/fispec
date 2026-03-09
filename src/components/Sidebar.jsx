import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar({ close }) {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const name =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  const initial = name.charAt(0).toUpperCase();

  return (

    <>
      {/* BACKDROP (click outside closes sidebar) */}
      <div
        onClick={close}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.3)",
          zIndex: 1200
        }}
      />

      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "260px",
          height: "100vh",
          background: "#1a1a1a",
          borderRight: "0.5px solid #686868",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: "translateX(0)",
          transition: "transform 0.5s ease",
          zIndex: 1300
        }}
      >

        {/* TOP SECTION */}
        <div>

          {/* CLOSE BUTTON */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
              cursor: "pointer",
              fontSize: "16px"
            }}
            onClick={close}
          >
            x
          </div>

          {/* USER INFO */}
          <div style={{ marginBottom: "30px" }}>

            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "#2563eb",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "500",
                marginTop: "-40px"
              }}
            >
              {initial}
            </div>

            <p>{name}</p>

          </div>

          {/* NAVIGATION LINKS */}

          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/history");
              close();
            }}
          >
            History
          </p>

          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              document.getElementById("team")?.scrollIntoView();
              close();
            }}
          >
            Team
          </p>

          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              document.getElementById("about")?.scrollIntoView();
              close();
            }}
          >
            About
          </p>

          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView();
              close();
            }}
          >
            Contact
          </p>

        </div>

        {/* LOGOUT BUTTON */}

        {user ? (

          <button
            onClick={async () => {
              await logout();
              close();
              navigate("/");
            }}
            onMouseEnter={(e) => e.target.style.background = "#1d4ed8"}
            onMouseLeave={(e) => e.target.style.background = "#2563eb"}
            style={{
              alignSelf: "flex-start",
              borderRadius: "20px",
              padding: "8px 16px",
              fontSize: "14px",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              border: "none",
              transition: "0.2s",
            }}
          >
            Logout
          </button>

        ) : (

          <button
            onClick={() => {
              close();
              navigate("/login");
            }}
            onMouseEnter={(e) => e.target.style.background = "#1d4ed8"}
            onMouseLeave={(e) => e.target.style.background = "#2563eb"}
            style={{
              alignSelf: "flex-start",
              borderRadius: "20px",
              padding: "8px 16px",
              fontSize: "14px",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              border: "none",
              transition: "0.2s",
            }}
          >
            Get Started
          </button>

        )}

      </div>
    </>

  );
}

export default Sidebar;