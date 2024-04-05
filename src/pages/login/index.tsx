import GoogleSignIn from "@/components/google-auth/GoogleSignIn";

const Login = () => {
  return (
    <div className="flex items-center min-h-screen justify-center bg-gradient-to-r from-black to-gray-800">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-900 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome to DGChat Bot
          </h2>
          <p className="mt-2 text-gray-400">Sign in to continue</p>
        </div>
        <GoogleSignIn />
      </div>
    </div>
  );
};

export default Login;
