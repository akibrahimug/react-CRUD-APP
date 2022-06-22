import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../Context';
import { Outlet, Navigate, useParams, useNavigate } from 'react-router-dom'; 

function RedirectRoute() {
    const {authenticatedUser, data} = useContext(Context);

    const [course, setCourse] = useState(null);
    const [change, setChange] = useState(false);
    const [Loading, setLoading] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        data.courseDetail(id)
        // If the response is there setCourse state 
        //else navigate to not found
        .then(res => res ? setCourse(res) : navigate('/notfound'))
        .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if(course && authenticatedUser){
            setLoading(false);
            course.userId === authenticatedUser.id ? setChange(true) : setChange(false);
        }else{
            setLoading(true);
        }
    }, [course, authenticatedUser])

  return (
    <>
    {Loading ? (<></>) :
    (change ? <Outlet /> : <Navigate to="forbidden"/>)
    }
    </>
  )
}

export default RedirectRoute