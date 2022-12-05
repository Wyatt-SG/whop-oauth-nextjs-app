import React, { useEffect, useState } from "react";

const getUserMembershipData = async () => {
  const access_token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("access_token="))
    ?.split("=")[1];

  const response = await fetch("https://api.whop.com/api/v2/me/memberships", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
};

const Memberships = () => {
  const [membershipData, setMembershipsData] = useState();

  useEffect(() => {
    getUserMembershipData().then((data) => setMembershipsData(data));
  }, []);

  return <div>{JSON.stringify(membershipData)}</div>;
};

export default Memberships;
