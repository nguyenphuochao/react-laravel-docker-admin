import { Redirect } from "react-router-dom";

export default function PrivateRoute({ children, isAuthenticated }: any) {
    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return children;
}