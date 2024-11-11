"use client";
import { motion } from "framer-motion";
import { LuHammer, LuCog } from "react-icons/lu";

export default function UnderConstruction() {
  return (
    <div className="min-h-fit bg-gray-10 flex flex-col items-center justify-center p-4 pt-24 mb-12">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Work in Progress!
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12">
          We're working hard to bring you something amazing. Please check back
          soon!
        </p>
      </motion.div>

      <div className="relative mt-4">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-16 -left-16"
        >
          <LuCog size={64} className="text-blue-500" />
        </motion.div>

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-16 -right-16"
        >
          <LuCog size={64} className="text-blue-500" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-yellow-400 rounded-full p-8"
        >
          <motion.div
            animate={{
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <LuHammer size={128} className="text-gray-800" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <p className="text-lg text-gray-600 mb-4 ps-3 pe-4">
          Giveaway coming up, check it out here!
        </p>
        <a
          href="https://jusgiveaway.com/"
          target="_blank"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          JusGiveaway
        </a>
      </motion.div>
    </div>
  );
}
