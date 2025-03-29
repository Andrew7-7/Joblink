import { createContext } from "react";
import React, { useContext, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor, canisterId } from 'declarations/backend';
import { backend } from 'declarations/backend';

const AuthContext = createContext(null);
const network = process.env.DFX_NETWORK;
const identityProvider =
  network === "ic"
    ? "https://identity.ic0.app" // Mainnet
    : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943"; // Local

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [authClient, setAuthClient] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [principal, setPrincipal] = useState();
  const [actor, setActor] = useState();

  async function updateActor() {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const isAuthenticated = await authClient.isAuthenticated();

    setActor(actor);
    setAuthClient(authClient);
    setIsAuthenticated(isAuthenticated);
    setPrincipal(identity.getPrincipal().toString());
    if (isAuthenticated) {
      try {
        let loginUser = await backend.get_user({
          // principal_id: '1',
          principal_id: identity.getPrincipal().toString(),
        });
        const userData = loginUser[0] ?? "";
        setUser(userData);

        if (userData?.role == "User") {
          let userExperiences = await backend.get_user_experiences({
            principal_user_id: userData.principal_id,
          });
          userExperiences = await Promise.all(userExperiences.map(async (e) => {
          const user = await backend.get_user({principal_id:`${e.principal_user_id}`}) ?? [{name:"error"}]
            return {
              position: e.position,
              description: e.description,
              start_date: e.start_date,
              start_date: e.end_date,
              company: user[0].name
            }
          }))

          setExperiences(userExperiences);
          
        }
      } catch (error) {
        setUser("");
        setExperiences([]);
        console.error("Unexpected error:", error);
      }
    }
  }

  async function login() {
    await authClient.login({
      identityProvider,
      onSuccess: updateActor,
    });
  }

  async function logout() {
    await authClient.logout();
    setUser("");
    updateActor();
  }

  async function register(name, email, pic, role) {
    try {
      const res = await actor.register({
        principal_id: principal,
        username: name,
        email: email,
        profile_pic: pic,
        role: role == "User" ? { UserRole: null } : { CompanyRole: null },
      });
      if ("Ok" in res) {
        return "";
      } else {
        return res.Err;
      }
    } catch (e) {
      return "" + e;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        principal,
        user,
        experiences,
        setUser,
        register,
        login,
        logout,
        updateActor,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
