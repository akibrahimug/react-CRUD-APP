// Displays a course's details from /api/courses/:id
// Renders a "Delete Course" button for deleting a course
// Renders a "Edit Course" button for editing a course

import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../Context';
import {useParams, Link, useNavigate} from 'react-router-dom';

function CourseDetail(){
    const {data, authenticatedUser} = useContext(Context);
    const [course, setCourse] = useState({});
    const {id} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        data.courseDetail(id)
        .then(res => setCourse(res))
        .catch(err => console.log(err))
    }, []);

    
    useEffect(() => {
         setUser(course.User.firstName + ' ' + course.User.lastName);
        if(course && authenticatedUser && course.userId === authenticatedUser.id){
            setIsEditing(true);
        }else{
            setIsEditing(false);
            console.log(course.User.firstName)
        }
    }, [course, authenticatedUser]);

    const deleteCourse = () => {
        data.deleteCourse(course.id, authenticatedUser)
        .then(errors => {
            if(errors){
                console.log(errors);
            }else{
                console.log('Course deleted');
            }
        })
        .then( () => navigate('/'))
        .catch(err => console.log(err))
    }

    const updateCourse = () => navigate(`/courses/update/${course.id}`);
    console.log(user)
    return (
        <>
        <div className='actions--bar'>
            <div className='wrap'>
                {isEditing ? (
                    <>
                        <button className='button' onClick={updateCourse}>Update Course</button>
                        <button className='button' onClick={deleteCourse}>Delete Course</button>
                    </>
                )
                : (<></>)}
                <Link to='/' className="button button-secondary">Return to List</Link>
            </div>
        </div>
        <div className='wrap'>
            <h2 className='course--detail--label'>Course Detail</h2>
            <form >
                <div className='main--flex'>
                    <div>
                        <h3 className='course--detail--title'>Course</h3>
                        <p className='course--name'>{course.title}</p>
                        <p>By {user}</p>

                        <p>{course.description}</p>
                    </div>
                    <div>
                        <h3 className='course--detail--title'>Estimated Time</h3>
                        <p>{course.estimatedTime}</p>
                        <h3 className='course--detail--title'>Materials Needed</h3>
                        <span className='course--detail--list'>{course.materialsNeeded}</span>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default CourseDetail;