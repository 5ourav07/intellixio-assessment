import { UserAgentProvider } from "@/components/providers/userAgentProvider";
import { UserAgent } from "@/views/userAgent/userAgent";
import { headers } from "next/headers";

const UserAgentPage = () => {
  const userAgent = headers().get("user-agent") || "Unknown User Agent";

  return (
    <UserAgentProvider initialUserAgent={userAgent}>
      <UserAgent />
    </UserAgentProvider>
  );
};

export default UserAgentPage;
