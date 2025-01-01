import React, { ReactNode } from "react";
import App from "./App"
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route  } from 'react-router';

interface RouteModel {
   path: string;
   component: ReactNode;
   childrens: PathChildren[] | [];
}

interface PathChildren {
   path: string;
   index: boolean;
   component: ReactNode;
}

export default function LayoutRounts() {
    const route: RouteModel[] = [
        {
            path: '/',
            component: <App />,
            childrens: []
        },
        {
            path: '/profile',
            component: <Profile />,
            childrens: []
        }, 
        {
            path: '*',
            component: <Login />,
            childrens: []
        }, 
        // example set path parsams
        // {
        //     path: '/:id',
        //     component: <Login />,
        //     childrens: []
        // }, 
    ] 
    
    return (
        <BrowserRouter>
            <Routes>
                {route && route.map((r:RouteModel) => {
                    const path = r.path;
                    const component = r.component;
                    const childrens: PathChildren[] = r.childrens;
                    const haveChildrens = childrens.length > 0;
                    return (
                        <>
                            {haveChildrens ?
                            
                                <Route path={path} element={component}>
                                    { childrens.length > 0 && childrens.map((c:PathChildren) => {
                                        const chilPath = c.path;
                                        const chilComponent = c.component;
                                        const isIndex = c.index;
                                        return (<> { isIndex ? 
                                            <Route index path={chilPath} element={chilComponent} /> : 
                                            <Route path={chilPath} element={chilComponent} /> }</>
                                        )
                                    })}    
                                </Route> : 
                                <Route path={path} element={component}/>
                            }
                        </>
                    )
                })}
            </Routes>
        </BrowserRouter>
    )
}