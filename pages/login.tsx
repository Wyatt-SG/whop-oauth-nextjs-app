import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const postLoginRequest = async (code: string) => {
  const response = await fetch(`/api/login/${code}`, {
    method: "POST",
  });

  return response.json();
};

const Login: NextPage = () => {
  const router = useRouter();

  const { code } = router.query;

  useEffect(() => {
    if (code && typeof code === "string") {
      postLoginRequest(code).then((response) => {
        console.log(response);
        if ("access_token" in response) {
          document.cookie = `access_token=${response.access_token}; max-age=${response.expires_in}; samesite=strict; secure`;
          router.query.code = undefined;
          router.push("/");
        }
      });
    }
  }, [code, router.query]);

  return (
    <Link
      href={`https://whop.com/oauth?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`}
    >
      <button>Login with Whop</button>
    </Link>
  );
};

export default Login;
