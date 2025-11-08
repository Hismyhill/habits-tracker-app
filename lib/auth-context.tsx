import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import account from "./appwrite";
interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (
    email: string,
    password: string,
    signIn: Promise<string | null>
  ) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  }

  async function signUp(email: string, password: string) {
    try {
      await account.create({
        userId: ID.unique(),
        email,
        password,
      });

      await signIn(email, password);

      return null;
    } catch (error) {
      if (error instanceof Error) return error.message;
      return "An error occurred during sign up";
    }
  }

  async function signIn(email: string, password: string) {
    try {
      await account.createEmailPasswordSession({
        email,
        password,
      });
      await getUser();
      return null;
    } catch (error) {
      if (error instanceof Error) return error.message;
      return "An error occurred during sign in";
    }
  }

  async function signOut() {
    try {
      await account.deleteSession({ sessionId: "current" });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;
