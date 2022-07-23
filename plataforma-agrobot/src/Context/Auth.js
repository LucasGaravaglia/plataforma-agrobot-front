import { createContext, useContext } from "react";
import { app } from "../services/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

import api from "../services/api";
import { DataContext } from "./DataContext";

export const AuthContext = createContext({});
const provider = new GoogleAuthProvider();

export function AuthContextProvider(props) {
  const { setUser, setAuthenticated } = useContext(DataContext);
  const auth = getAuth(app);

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        verifyUser(user);
        toast.success("Usuário autenticado com o Google!");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  function verifyUser(user) {
    if (typeof user !== "undefined") {
      var promise = api
        .get(`/user/firebaseId=${user.uid}`)
        .then((id) => {
          setUser(id.data);
          setAuthenticated(true);
        })
        .catch((err) => {
          api
            .post("/user", {
              name: user.displayName,
              email: user.email,
              firebaseId: user.uid,
            })
            .then((dt) => {
              setUser(dt.data);
              setAuthenticated(true);
            });
        });

      toast.promise(promise, {
        loading: "Verificando seu usuário no servidor.",
        success: "Usuário Verificado",
        error: "Algo inesperado ocorreu!",
      });
    }
  }

  async function signOut() {
    setAuthenticated(false);
    toast.success("Logout realizado");
  }

  return (
    <AuthContext.Provider value={{ signInWithGoogle, signOut }}>
      <Toaster />
      {props.children}
    </AuthContext.Provider>
  );
}
