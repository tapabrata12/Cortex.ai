import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import { api_instance } from "../utils/api.js";

const App = () => {

  const handleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);
    console.log(data);
    try {
      let token = await data.user.getIdToken();

      let response = await api_instance.post('/api/auth/signin', { token });
      console.log(response);
    } catch (error) {
      console.log(`${error}`);

    }

  }

  return (
    <div className="flex justify-center items-center h-screen">

      <button onClick={handleLogin} className="bg-red-500 w-50 px-3 py-2 rounded-sm active:scale-95 active:shadow-md cursor-pointer font-bold">Continue with Google</button>

    </div>
  )
}

export default App