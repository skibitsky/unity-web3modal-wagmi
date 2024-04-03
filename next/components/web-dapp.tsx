import ConnectButton from "@/components/connect-button";
import SignButton from "@/components/sign-button";

export default function WebApp() {
  return (
    <div className="h-full flex flex-col items-center gap-3 justify-center justify-items-center">
      <ConnectButton/>
      <SignButton/>
    </div>
  )
}