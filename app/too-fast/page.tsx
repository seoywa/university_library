import React from "react";

const TooFast = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Whoa, slow down there, speedy!
      </h1>
      <p className="text-light-400 mt-3 max-w-xl text-center">
        Looks like you&apos;ve been a little too eager. We&apos;ve put a
        temporary pause on your excitement. Chill for a bit, and try again
        shortly.
      </p>
    </main>
  );
};

export default TooFast;
