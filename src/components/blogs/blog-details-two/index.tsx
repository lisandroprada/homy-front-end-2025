import type {ReactNode} from "react"
import FooterFour from "@/layouts/footers/FooterFour"
import HeaderFour from "@/layouts/headers/HeaderFour"
import BlogDetailsArea from "./BlogDetailsArea"
import FancyBanner from "@/components/common/FancyBanner"

const BlogDetails = ({post, children}: {post?: any; children?: ReactNode}) => {
   return (
      <>
         <HeaderFour />
         <BlogDetailsArea initialPost={post}>{children}</BlogDetailsArea>
         <FancyBanner />
         <FooterFour />
      </>
   )
}

export default BlogDetails
