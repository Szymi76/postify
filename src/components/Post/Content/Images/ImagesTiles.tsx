type ImagesTilesProps = {
  images: string[];
  singleTileClassName?: string;
  wrapperClassName?: string;
};
const ImagesTiles = (props: ImagesTilesProps) => {
  return (
    <div className={props.wrapperClassName ?? "grid grid-cols-2 gap-2"}>
      {props.images.map((img, index) => {
        return (
          <div
            key={`img-${index}`}
            className={`flex items-center justify-center rounded-md border border-slate-100 p-3 ${
              props.singleTileClassName ?? ""
            }`}
          >
            <img src={img} className="max-h-[350px] rounded-md" />
          </div>
        );
      })}
    </div>
  );
};

export default ImagesTiles;
