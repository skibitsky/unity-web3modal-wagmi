import ConnectButton from "@/components/connect-button";
import SignButton from "@/components/sign-button";

export default function WebApp() {
  return (
    <div className="flex flex-col gap-3">
      <ConnectButton/>
      <SignButton/>
    </div>
  )
}