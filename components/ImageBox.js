import Image from "next/image"

export default function ImageBox( {image} ) {
    return (
        <div className="box">
            <Image
            alt={image}
            src={image}
            layout="intrinsic"
            objectFit="contain"
            />
        </div>
    )
}