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
          zIndex: 99
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
          background: "#fff",
          borderRight: "1px solid #ddd",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transform: "translateX(0)",
          transition: "transform 0.5s ease",
          zIndex: 100
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
              fontSize: "20px"
            }}
            onClick={close}
          >
            ✕
          </div>

          {/* USER INFO */}
          <div style={{ marginBottom: "30px" }}>

            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "#333",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
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

        <button
          onClick={logout}
          style={{
            padding: "10px",
            background: "#333",
            color: "#fff"
          }}
        >
          Logout
        </button>

      </div>
    </>

  );
}

export default Sidebar;