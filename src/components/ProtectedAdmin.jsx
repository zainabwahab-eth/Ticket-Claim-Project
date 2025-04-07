function ProtectedAdminRoute({ children }) {
  const isAuthenticated =
    sessionStorage.getItem("adminAuthenticated") === "true";
  const [auth, setAuth] = useState(isAuthenticated);

  if (!auth) {
    return <AdminLogin setIsAuthenticated={setAuth} />;
  }

  return children;
}

export default ProtectedAdminRoute;
