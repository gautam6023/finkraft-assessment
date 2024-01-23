import { TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "../utils/routes.constant";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In case of invalid input
    if (!email && !password) {
      alert("Email and Password required!");
      return;
    }
    console.log(email, password);

    //If everything is fine
    navigate(Routes.Dashboard.main());
  };

  return (
    <div
      className="w-[350px] border-[1px] rounded-md p-4 m-auto flex flex-col absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%]"
      style={{
        boxShadow: "box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
    >
      <h1 className="text-xl font-normal">Login to</h1>
      <h1 className="text-2xl font-semibold text-blue-600 text-und">Space Vue</h1>
      <form className="flex flex-col m-auto gap-4 mt-2 w-full" onSubmit={handleSubmit}>
        <TextInput
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none  font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Login
        </button>

        <p>Any email and password will work here because it's hardcoded, try it out</p>
      </form>
    </div>
  );
};

export default Login;
