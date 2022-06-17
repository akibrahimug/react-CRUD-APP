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
    const navigate = useNavigate();

    useEffect(() => {
        data.courseDetail(id)
        .then(res => setCourse(res))
        .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if(course && authenticatedUser && course.userId === authenticatedUser.id){
            setIsEditing(true);
        }else{
            setIsEditing(false);
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

    const updateCourse = () => navigate('update');
    console.log(course.title);
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
            <form>
                <div className='main--flex'>
                    <div>
                        <h3 className='course--detail--title'>Course</h3>
                        <h4 className='course--name'>{course.title}</h4>
                        <h4 className='course--name'>{course.description}</h4> 
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default CourseDetail;