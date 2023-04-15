"use client";

import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { ImMail4 } from "react-icons/im";

export default function Profile() {
  const onGithubClick = () => {
    window.open("https://github.com/HoJin9622", "_blank");
  };

  const onMailClick = () => {
    window.open("mailto:kiss0104040@gmail.com");
  };

  return (
    <div className="py-6 md:flex md:items-center md:justify-between">
      <div className="flex items-center gap-5">
        <Image
          className="rounded-full w-12 h-12 md:hidden"
          src="/images/avatar.jpg"
          width={48}
          height={48}
          alt="avatar"
        />
        <div>
          <div className="font-medium text-xl md:text-4xl">Jin</div>
          <div className="text-gray-500 md:hidden">Frontend Web Developer</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5 md:mt-0">
        <button
          onClick={onGithubClick}
          className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
        >
          <AiFillGithub size={36} />
        </button>
        <button
          onClick={onMailClick}
          className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
        >
          <ImMail4 size={32} />
        </button>
      </div>
    </div>
  );
}
