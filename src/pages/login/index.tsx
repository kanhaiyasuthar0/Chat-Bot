import GoogleSignIn from "@/components/google-auth/GoogleSignIn";

const Login = () => {
  return (
    <div className="flex items-center min-h-screen justify-center bg-gradient-to-r from-white to-black">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to DGChat Bot
          </h2>
          <p className="mt-2 text-gray-600">Sign in to continue</p>
        </div>
        <GoogleSignIn />
        {/* <div className="mt-3 grid grid-cols-1 gap-3">
          <div className="text-gray-600 text-center">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
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
