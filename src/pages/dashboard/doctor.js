import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const DoctorDashboard = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  console.log(user);

  return (
    <div>
      <h1>
        Welcome, {user.role} {user.first_name}
      </h1>
      <p>Email: {user.email}</p>
      <p>License: {user.medicalLicense}</p>
      {/* Add more doctor-related details */}
    </div>
  );
};

export default DoctorDashboard;
