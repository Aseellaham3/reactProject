import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function ProtectedRouter({children}) {
    const token = localStorage.getItem('userToken');
    if(!token){
        return <Navigate to='/login' replace />
    }
    
    return children;
  
}

