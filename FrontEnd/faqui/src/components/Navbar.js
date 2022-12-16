import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        S.S.S.
      </Link>
      <ul>
        <CustomLink to="/questions">Questions</CustomLink>
        <CustomLink to="/categories">Categories</CustomLink>
        <CustomLink to="/departments">Departments</CustomLink>
      </ul>
      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("tkn");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
