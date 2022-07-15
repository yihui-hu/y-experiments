import Image from "next/image";
import { motion } from "framer-motion";

export default function ImageBox({ work, delay }) {
  return (
    <motion.div
      className="box"
      initial={{ y: "30px", opacity: 0 }}
      animate={{ y: "0px", opacity: 1 }}
      transition={{ duration: 0.7, type: "spring", delay: delay * 0.1 }}
    >
      <Image
        alt={work.image}
        src={work.image}
        width={work.width}
        height={work.height}
        layout="intrinsic"
        objectFit="contain"
      />
    </motion.div>
  );
}
