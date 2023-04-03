import React, { useState } from "react";
import request from "../../helpers/axios";

const Signin = (props) => {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const signin = async () => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const params = Object.fromEntries(urlSearchParams.entries());

    const { user, accessToken } = await request.post("/api/auth/signin", {
      ...formValue,
      callbackUrl: params.callbackUrl,
    });

    const windowOpen = window.open(params.callbackUrl, "_blank");
    console.log("windowOpen", windowOpen);

    windowOpen.postMessage(accessToken);
    // window.location.href = `${params.callbackUrl}&`;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Login</h1>
      <div style={{ margin: "10px 0" }}>
        <label style={{ marginRight: "10px" }} for="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formValue.username}
          onChange={(e) =>
            setFormValue({ ...formValue, username: e.target.value })
          }
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <label style={{ marginRight: "10px" }} for="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValue.password}
          onChange={(e) =>
            setFormValue({ ...formValue, password: e.target.value })
          }
        />
      </div>
      <button
        style={{ margin: "10px 0" }}
        onClick={() => {
          signin();
        }}
      >
        Sign In
      </button>
    </div>
  );
};

export default Signin;
