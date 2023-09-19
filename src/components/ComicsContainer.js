import Comic from "./Comic"

function ComicsContainer({ comics, setComics}) {
  return (
    <>
      {comics.map(comic => <Comic key={comic.id} comic={comic} setComics={setComics} />)}
    </>
  )
}


export default ComicsContainer
