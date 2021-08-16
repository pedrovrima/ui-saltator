export default function Figure(props: any) {
  const {answered} = props;
  return (
    <div className="w-full flex justify-center my-8">
      <div className="h-48  w-48 bg-emerald-500 rounded-full">
        <img className={`${answered?"":"hidden"} h-48  w-48 bg-emerald-500 rounded-full`} src="https://s3.amazonaws.com/media.wikiaves.com.br/images/2583/3852244g_d6cc844d83c3a936626a0f4a3924a33b.jpg"></img>
      </div>
    </div>
  );
}
