import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import ActorContext from "./ActorContext";
import { AuthClient } from '@dfinity/auth-client';
import { createActor, canisterId } from 'declarations/backend';

const network = process.env.DFX_NETWORK;
const identityProvider =
  network === 'ic'
    ? 'https://identity.ic0.app' // Mainnet
    : 'http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943'; // Local

const AuthProvider = ({children}) => {
    const {user, setUser} = useState();
    const {actor, setActor} = useContext(ActorContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const [authClient, setAuthClient] = useState();
    async function updateActor() {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      const actor = createActor(canisterId, {
        agentOptions: {
          identity
        }
      });
  
      setActor(actor);
      setAuthClient(authClient);
      setIsAuthenticated(authClient.isAuthenticated());
    }
  
    async function login() {
      await authClient.login({
        identityProvider,
        onSuccess: updateActor
      });
    }
  
    async function logout() {
      await authClient.logout();
      updateActor();
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, logout, updateActor, isAuthenticated, setIsAuthenticated}}>
        {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider