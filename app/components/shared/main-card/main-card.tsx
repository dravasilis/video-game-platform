import Image from "next/image";
import "./main-card.scss";


interface Props<T extends {id:number,name:string,background_image?:string,released?:string,games_count?:number,image_background?:string}> {
  data: T;
}
const MainCard =<T extends {id:number,name:string,background_image?:string,released?:string,games_count?:number,image_background?:string}> ({data} : Props<T>) => {
  return (
      <div className="main-card">
        <div className="content">
          <div className="front">
             <Image
             className="object-cover h-full  rounded-t-lg rounded-b-sm !shadow-none  !border-b border-[#3d3d3d] hover:!border-[#3d3d3d]"
             src={data.background_image ?? data.image_background ??'/svg/game.svg'}
             alt="dataImage"
             width={1020}
             height={620}
             unoptimized
           />
           
            <div className="flex flex-col gap-2 px-4 py-4   justify-center h-[5rem] max-[640px]:h-[6rem] max-[640px]:py-0 max-[640px]:px-2">
              <span className="max-xl:text-xs text-sm font-bold   text-primary-100">
                {data.name}
              </span>
              {
                data.released &&  <span className="text-xs max-xl:text-[10px] font-bold text-primary-150">
                {new Date(data.released).toDateString().substring(4,)}
              </span>
              }
              {
                data.games_count &&  <span className="text-xs max-xl:text-[10px] font-bold text-primary-150">
                { data.games_count.toLocaleString() +' Games'}
              </span>
              }
            </div>
          </div>
        </div>
    </div>
  );
};

export default MainCard;
