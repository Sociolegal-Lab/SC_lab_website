import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

// 由於 Layout 是最外層的 repo，只需要在此處引入一次 css 檔，其他分頁檔案不需要再次引用。

function Layout() {

        return(
        <>
            {/* Header 固定在頁面頂端 */}
            <Header/>
            {/* Wrap only the routed page content with ScrollToTop so Header/Footer are excluded from the fade */}
            <ScrollToTop>
                <Outlet/>
            </ScrollToTop>
            {/* Footer 固定在頁面底部 */}
            <Footer/>
        </>

    )
}

export default Layout