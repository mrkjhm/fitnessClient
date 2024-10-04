import { Link } from "react-router-dom"
import videoBg from '../assets/videoBg.mp4'

export default function Banner2() {
  return (
    <div className="banner no-padding">
      <video src={videoBg} autoPlay loop muted className="video-bg"/>
      <div className='content'>
        <div className=" col-lg-8 col-10 text-center">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3"><span className="text-danger"><strong>Welcome to Fitness Club</strong></span></h1>
                <p className="lead text-white">Achieve your health goals with our top-notch facilities, expert trainers, and diverse classes. Join us today for a healthier, happier you!</p>
                <div className="d-grid gap-2 d-md-flex justify-content-center">
                    <Link className="btn btn-danger btn-lg px-4 me-md-2" to={"/login"}>Check you workout</Link>
          
                </div>
                
            </div>
      </div>
      <div className="bg-overlay"></div>
      
    </div>
  )
}
