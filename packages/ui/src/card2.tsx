import React from "react";

export function Card2({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className=" border mt-4 p-6 bg-white rounded-xl bg-[#ededed] w-screen h-screen"
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}