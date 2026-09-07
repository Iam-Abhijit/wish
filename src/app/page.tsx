import React from "react";
import Curtain from "@/components/Curtain";
import BirthdayWish from "@/components/BirthdayWish";

export default function page() {
  return (
    <Curtain>
      <main className="w-full h-full flex flex-col items-center justify-center p-4">
        <BirthdayWish />
      </main>
    </Curtain>
  );
}