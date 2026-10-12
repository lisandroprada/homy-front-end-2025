import Image from "next/image"
import Link from "next/link"

import titleShape from "@/assets/images/shape/title_shape_02.svg"
import errorImg from "@/assets/images/assets/ils_08.svg"

const ErrorArea = () => {
   return (
      <div className="error-section position-relative z-1 bg-pink">
         <div className="container">
            <div className="row">
               <div className="col-xxl-8 col-xl-6 col-lg-7 col-md-8 m-auto">
                  <div className="title-one text-center mb-75 lg-mb-20 wow fadeInUp">
                     <h3><span>¡Ups! <Image src={titleShape} alt="" className="lazy-img" /></span>Parece que te perdiste.</h3>
                     <p className="fs-20 pb-45">La página que buscás no está disponible. Probá buscar de nuevo o volvé al inicio.</p>
                     <Link href="/" className="btn-five sm fw-normal text-uppercase">Volver al inicio</Link>
                  </div>
               </div>
            </div>
         </div>
         <Image src={errorImg} alt="" className="lazy-img w-100 position-absolute bottom-0 start-0 z-n1" />
      </div>
   )
}

export default ErrorArea
