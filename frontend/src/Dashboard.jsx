import React,{ useContext } from "react";
import { AuthContext } from "./AuthContext";
import Button from "./Button";

const Dashboard = ({setIndex}) => {
  const { user, experiences } = useContext(AuthContext);

  const dateFormat = (date) => {
        return `${date.toLocaleString("defaulft", {month:"short"})} ${date.getFullYear()}`
    }

  return (
    <div className="flex justify-around items-start absolute z-10 w-full min-h-screen p-5 mt-24">
      <div className="w-1/5 max-w-xl bg-[var(--secondary)] shadow-2xl rounded-2xl p-10 space-y-8">
        <div className="flex justify-center">
          <div className="w-[140px] aspect-square rounded-full overflow-hidden border-4 border-white shadow-md hover:scale-105 transition-all">
            <img
              src={user.profile_pic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-[var(--accent)]">{user.name}</h2>
          <p className="text-sm text-gray-300">{user.email}</p>
          <span className="inline-block bg-[var(--tertiary)] text-xs px-3 py-1 rounded-full text-white">
            Role: {user.role}
          </span>
        </div>

        
      </div>

      {user.role === "User" && (
      <div className="w-3/5 max-w-xl bg-[var(--secondary)] shadow-2xl rounded-2xl p-10 space-y-8">
          <div className="bg-[var(--tertiary)] p-5 rounded-xl space-y-5 shadow-lg text-white">
            <h3 className="text-lg font-semibold border-b pb-2">
              My Experiences
            </h3>
            <Button text={"Add Experience"} onclick={() => setIndex(3)}/>
            {experiences.length > 0 ? (
              experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="border border-white/20 rounded-lg p-4 bg-[var(--secondary)] shadow-sm space-y-1 hover:scale-[1.01] transition-all"
                >
                  <p>
                    <span className="font-semibold">Company:</span>{" "}
                    {exp.company}
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
                    {dateFormat(new Date(Number(exp.start_date)))}
                  </p>
                  <p>
                    <span className="font-semibold">End Date:</span>{" "}
                    {exp.end_date != 0 ? dateFormat(new Date(Number(exp.end_date))):"Now"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-300 italic">
                No experiences available.
              </p>
            )}
          </div>
      </div>
        )}
    </div>
  );
};

export default Dashboard;
