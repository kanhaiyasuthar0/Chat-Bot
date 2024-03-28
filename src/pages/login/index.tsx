import GoogleSignIn from "@/components/google-auth/GoogleSignIn";

const Login = () => {
  return (
    <div className="flex items-center min-h-screen justify-center bg-gradient-to-r from-gray-900 to-gray-700">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-lg shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome to DGChat Bot
          </h2>
          <p className="mt-2 text-gray-400">Sign in to continue</p>
        </div>
        <GoogleSignIn />
        {/* Consider uncommenting this if you plan to provide a contact admin option in the future */}
        {/* <div className="mt-6 grid grid-cols-1 gap-3">
          <div className="text-gray-400 text-center">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-500 hover:text-blue-400"
            >
              Contact Admin
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
