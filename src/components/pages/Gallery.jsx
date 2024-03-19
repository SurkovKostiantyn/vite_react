import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ThemeContext} from "../ThemeContext.jsx";
import {useContext} from "react";

const Gallery = () => {
    const { lightMode } = useContext(ThemeContext);
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    return (
        <div
            className={"main"}
            style={{
                backgroundColor: lightMode ? "white" : "black",
                color: lightMode ? "black" : "white",
            }}
        >
            <h1>Gallery</h1>
            <Slider
                {...settings}
                style={{
                    width: "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                    padding: "0",
                    margin: "0",
                }}
            >
                <div className={"image"}>
                    <h3>1</h3>
                </div>
                <div className={"image"}>
                    <h3>2</h3>
                </div>
                <div className={"image"}>
                    <h3>3</h3>
                </div>
                <div className={"image"}>
                    <h3>4</h3>
                </div>
            </Slider>
        </div>
    )
}

export default Gallery
