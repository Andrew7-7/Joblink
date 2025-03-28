import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const userDummy = {
  principal_id: "user-1234",
  name: "John Doe",
  email: "johndoe@example.com",
  profile_pic:
    "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
  role: "User",
  experiences: [
    {
      company: "company-5678",
      position: "Software Engineer",
      description:
        "Responsible for developing and maintaining web applications.",
      start_date: "2021-06-01",
      end_date: "",
    },
    {
      company: "company-9101",
      position: "Frontend Developer",
      description: "Worked on UI components and frontend architecture.",
      start_date: "2019-03-15",
      end_date: "2021-05-30",
    },
  ],
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center absolute z-10 w-full min-h-screen p-5 bg-[var(--background)] mt-24">
      <div className="w-full max-w-xl bg-[var(--secondary)] shadow-2xl rounded-2xl p-10 space-y-8">
        <div className="flex justify-center">
          <div className="w-[140px] aspect-square rounded-full overflow-hidden border-4 border-white shadow-md hover:scale-105 transition-all">
            <img
              src={userDummy.profile_pic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">{userDummy.name}</h2>
          <p className="text-sm text-gray-300">{userDummy.email}</p>
          <span className="inline-block bg-[var(--tertiary)] text-xs px-3 py-1 rounded-full text-white">
            Role: {userDummy.role}
          </span>
        </div>

        {userDummy.role === "User" && (
          <div className="bg-[var(--tertiary)] p-5 rounded-xl space-y-5 shadow-lg text-white">
            <h3 className="text-lg font-semibold border-b pb-2">
              User Experiences
            </h3>

            {userDummy.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="border border-white/20 rounded-lg p-4 bg-[var(--secondary)] shadow-sm space-y-1 hover:scale-[1.01] transition-all"
              >
                <p>
                  <span className="font-semibold">Company:</span> {exp.company}
                </p>
                <p>
                  <span className="font-semibold">Position:</span>{" "}
                  {exp.position}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {exp.description}
                </p>
                <p>
                  <span className="font-semibold">Start Date:</span>{" "}
                  {exp.start_date}
                </p>
                <p>
                  <span className="font-semibold">End Date:</span>{" "}
                  {exp.end_date ? exp.end_date : "Present"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
