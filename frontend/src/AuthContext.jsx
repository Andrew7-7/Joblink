import { createContext } from "react";
import React,{ useContext, useState } from "react";
import { AuthClient } from '@dfinity/auth-client';
// import { createActor, canisterId } from 'declarations/backend';
// import { backend } from 'declarations/backend';

const AuthContext = createContext(null);
const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943'; // Local

const AuthProvider = ({children}) => {
    const [user, setUser] = useState("");
    const [authClient, setAuthClient] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [principal, setPrincipal] = useState();
    const [actor, setActor] = useState();

  async function updateActor() {
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const actor = createActor(canisterId, {
      agentOptions: {
        identity
      }
    });
    const isAuthenticated = await authClient.isAuthenticated();

    setActor(actor);
    setAuthClient(authClient);
    setIsAuthenticated(isAuthenticated);
    setPrincipal(identity.getPrincipal().toString());
    if (isAuthenticated){

       try {
          let loginUser = await backend.get_user({principal_id:identity.getPrincipal().toString()});
          setUser(loginUser[0] ?? "");
        } catch (error) {
          setUser("")
          console.error("Unexpected error:", error);
        }
    }
  }

  async function login() {
    await authClient.login({
      identityProvider,
      onSuccess: updateActor
    });
  }

  async function logout() {
    await authClient.logout();
    setUser("");
    updateActor();
  }
  
  async function register(name, email, pic, role) {
    try{
      const res = await actor.register({
        principal_id:principal, 
        username:name, 
        email:email, 
        profile_pic:pic, 
        role: (role == "User")?{UserRole:null}:{CompanyRole:null}});
      if ("Ok" in res){
          return ""
      }else{
        return res.Err
      }
    }catch(e){
      return "" + e
    }
  }

    return (
        <AuthContext.Provider value={{principal, user, setUser, register, login, logout, updateActor, isAuthenticated, setIsAuthenticated}}>
        {children}
        </AuthContext.Provider>
    )
};

export {AuthProvider, AuthContext};