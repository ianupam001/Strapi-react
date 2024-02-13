import { useGlobalContext } from "./context"
import sublinks from "./data";
import { useRef } from "react";
const Submenus = () => {
  const { pageId, setPageId } = useGlobalContext();
  const currentPage = sublinks.find((item => item.pageId === pageId))

  const subMenuContainer = useRef(null)

  const handleMouseLeave = (e) => {
    const submenu = subMenuContainer.current;
    const { left, right, bottom } = submenu.getBoundingClientRect();
    const { clientX, clientY } = e;

    if (clientX < left - 1 || clientX > right - 1 || clientY > bottom - 1) {
      setPageId(null);
    }
  }

  return (
    <div className={currentPage ? 'submenu show-submenu' : 'submenu'} onMouseLeave={handleMouseLeave} ref={subMenuContainer}>
      <h5>{currentPage?.page}</h5>
      <div className="submenu-links" style={{ gridTemplateColumns: currentPage?.links?.length > 3 ? '1fr 1fr' : '1fr' }}
      >
        {currentPage?.links?.map((link) => {
          const { id, url, label, icon } = link;
          return <a key={id} href={url}>{icon}{label}</a>

        })}

      </div>
    </div>
  )
}
export default Submenus