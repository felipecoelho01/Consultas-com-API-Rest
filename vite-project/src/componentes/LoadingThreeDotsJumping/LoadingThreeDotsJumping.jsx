"use client";
import { motion } from "framer-motion";

function LoadingThreeDotsJumping() {
    const dotVariants = {
        jump: {
            y: -30,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="flex content-center items-center gap-2.5 mt-5 w-full"
        >
            <motion.div className="w-5 h-5 rounded-[50%] bg-black will-change-transform" variants={dotVariants} />
            <motion.div className="w-5 h-5 rounded-[50%] bg-black will-change-transform" variants={dotVariants} />
            <motion.div className="w-5 h-5 rounded-[50%] bg-black will-change-transform" variants={dotVariants} />
        </motion.div>
    );
}

export default LoadingThreeDotsJumping;
