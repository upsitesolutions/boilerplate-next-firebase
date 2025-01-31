"use client";
import Lottie from "react-lottie";
import LoaderJson from "../../public/loader.json";

function Loader() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-15 flex justify-center items-center z-50">
            <div className="spinner-border text-primary" role="status">
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: LoaderJson,
                    }}
                    height={100}
                    width={100}
                />
            </div>
        </div>
    );
}

export default Loader;
