function ProtectedAdminRoute({ children }) {
  const isAuthenticated =
    sessionStorage.getItem("adminAuthenticated") === "true";
  const [auth, setAuth] = useState(isAuthenticated);

  if (!auth) {
    return <AdminLogin setIsAuthenticated={setAuth} />;
  }

  return children;
}

// Use in your app routes like this:
// <Route
//   path="/admin"
//   element={
//     <ProtectedAdminRoute>
//       <AdminDashboard />
//     </ProtectedAdminRoute>
//   }
// />

export default ProtectedAdminRoute;
