import UserImage from "../../assets/matt-gray.png"
import { Ellipsis } from 'lucide-react';
import IconButton from "../../atoms/IconButton";

const PostHeader = () => {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-3">
        <img src={UserImage} alt="" className='w-[60px] h-[60px] rounded-full' />
        <p>matthgray</p>
        <p>•</p>
        <p>3d</p>
      </div>

      <IconButton username="Sundeeep">
        <Ellipsis />
      </IconButton>
    </div>
  )
}

export default PostHeader