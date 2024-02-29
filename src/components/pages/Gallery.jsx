import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    return (
        <div>
            <h1>Gallery</h1>
            <Slider {...settings}>
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
