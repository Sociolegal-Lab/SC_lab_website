import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import {Outlet} from "react-router-dom";

// 由於 Layout 是最外層的 repo，只需要在此處引入一次 css 檔，其他分頁檔案不需要再次引用。

function Layout() {

        return(
        <>
            {/* Header 固定在頁面頂端 */}
            <Header/>
            <main>
                {/* Outlet 代表的是此次渲染，匹配的chile route 應該出現的位置 */}
                <Outlet/>
            </main>
            {/* Footer 固定在頁面底部 */}
            <Footer/>
        </>

    )
}

export default Layout