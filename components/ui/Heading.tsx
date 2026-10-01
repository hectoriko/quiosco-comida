import React from "react";

export default function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-3xl font-bold my-10 mb-5 text-indigo-500">
            {children}
        </h1>
    );
}