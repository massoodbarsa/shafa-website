import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const ClientDashboard = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      {/* Add more client-related details */}
    </div>
  );
};

export default ClientDashboard;
