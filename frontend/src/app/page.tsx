

export default function Home() {

  return (
      <div className="flex flex-col justify-center items-center">

        <div className="mt-15 md:mt-20 text-2xl md:text-5xl font-extrabold flex flex-col items-center">
          <p>Problem in managing Your Money ?</p>
          <p className="bg-linear-120 from-black via-emerald-600 to-emerald-800 bg-clip-text text-transparent p-2 tracking-wide text-4xl md:text-6xl md:p-4 ">We got you</p>
        </div>

        <div className="mt-20 md:mt-15 flex flex-col items-center px-3 ">
          <p className="text-[15px] md:text-20px font-bold">What we provide</p>
          <p className="text-[16px] px-10 md:px-65">we make a system where you can track all your money flowing.
          Based on your input data, we can trace the expenses you are being overspending into.
          </p>
          <p className="mt-7 md:mt-5 text-[18px] md:text-[20px] font-semibold">
            we  also provide a great analysis from the data given.
          </p>
        </div>

        <div className="mt-20 md:mt-15 flex flex-col items-center">
          <p className="text-[18px] md:text-2xl font-bold text-emerald-700">Take a Look and Experience</p>


          <div className="flex gap-5 md:gap-30 flex-col md:flex-row items-center mt-3 md:mt-5">
            <div className="flex flex-col items-center">
              <p className="text-[15px]">Already an user</p>
              <button className="btn-black">Sign In</button>
            </div>

            <div className="flex flex-col items-center">
              <p>New User</p>
              <button className="btn-black">Register</button>
            </div>
          </div>
        </div>

      </div>
  );
}
