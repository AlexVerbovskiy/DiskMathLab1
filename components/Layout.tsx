import Header from "./Header";
import Footer from "./Footer";
import styles from '../styles/Home.module.css'

export interface LayoutProps {
    children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
    return <>
        <Header />
        <main className={styles.main}>
            {props.children}
        </main>
        <Footer />
    </>
}

export default Layout;