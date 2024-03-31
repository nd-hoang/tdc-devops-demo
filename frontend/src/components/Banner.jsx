export default function Banner(props) {
    const title = props.title || <>Default <br />Kit</>;
    const description = props.description || "Default description";// "Ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"; // props.description;
    const image = props.image || "images/banner-img.png";
    return (
        <div className="banner_section layout_padding">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h1 className="banner_taital">{title}</h1>
                                    <p className="banner_text">{description}</p>
                                    <div className="read_bt"><a href="#">Buy Now</a></div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="banner_img"><img src={image} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}