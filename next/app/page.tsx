import WebDapp from "@/components/web-dapp";
import UnityDapp from "@/components/unity-dapp";
import React from "react";
import Area from "@/components/area";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-11">
        <Area title="React">
          <WebDapp/>
        </Area>
        <Area title="Unity">
          <UnityDapp/>
        </Area>
      </div>
    </main>
  );
}
