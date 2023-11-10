import React from 'react';
import {useLocation} from "react-router-dom";
import {
    Admin, Content, Page

} from "./styled";
import {ILayout} from "../../common/types/layout";
import TopBarComponent from "../top-bar";
import SideBarComponent from "../sidebar";

const Layout = ({children}: ILayout) => {
    const location = useLocation()

    return (
        <div className="App">
            {location.pathname === '/login' ? (
                <>{children}</>
            ) : (
                <Admin>
                    <SideBarComponent/>
                    <Page>
                        {/*<TopBarComponent/>*/}
                        <Content>
                            {children}
                        </Content>
                    </Page>
                </Admin>
            )
            }
        </div>
    );
};

export default Layout;
