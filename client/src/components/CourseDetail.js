// Displays a course's details from /api/courses/:id
// Renders a "Delete Course" button for deleting a course
// Renders a "Edit Course" button for editing a course

import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function CourseDetail() {
  // get data and unthenticated user fro the context api
  const { data, authenticatedUser } = useContext(Context);

  // create a course object in state
  const [course, setCourse] = useState({});

  // get the 'id' from the router using "useParams"
  const { id } = useParams();

  // create "isEditing" to hold the boolean value in state
  const [isEditing, setIsEditing] = useState(false);

  // save the navigate method from router in a constant
  const navigate = useNavigate();

  // as soon as the app mounts to the DOM
  useEffect(() => {
    // get the courseDetail from the data saved in context and feed it the "id"
    // we get from the useparams() method
    data
      .courseDetail(id)
      // the set the course object to have the results
      .then((res) => setCourse(res))
      // catch any errors thrown by the Rest API backend
      .catch((err) => {
        // log the errors to the console
        console.log(err);
        // navigate the user to the /notfound
        navigate("/notfound");
      });
  }, []);

  // as soon as the app mounts to the DOM
  useEffect(() => {
    //   if the course, user, course.userId are === to the current user'id
    if (course && authenticatedUser && course.userId === authenticatedUser.id) {
      // change the state boolean of "isEditing" to true
      setIsEditing(true);
      //   if not
    } else {
      // set it to false
      setIsEditing(false);
    }
    // populate the array with info that is used in the useEffect
  }, [course, authenticatedUser]);

  //   create a "deleteCourse" function
  const deleteCourse = () => {
    // call the data from the context api which holds a deleteCourse method
    data
      // populate the "deleteCourse" method from context with the course.id and authenticatedUser
      .deleteCourse(course.id, authenticatedUser)
      .then((errors) => {
        // if there are any errors
        if (errors) {
          // console log them
          console.log(errors);
          // else
        } else {
          // display a "course deleted" message in the console
          console.log("Course deleted");
        }
      })
      //   after navigate back to the root /
      .then(() => navigate("/"))
      //  catch any other errors thrown by the Rest API and console log them
      .catch((err) => console.log(err));
  };

  //create an updateCourse function that navigates to the the update page for
  // the course selected
  const updateCourse = () => navigate(`/courses/${course.id}/update`);

  return (
    // react fragments
    <>
      <div className="actions--bar">
        <div className="wrap">
          {isEditing ? ( //if "isEditing" is true display the update and delete buttons
            <>
              <button className="button" onClick={updateCourse}>
                Update Course
              </button>
              <button className="button" onClick={deleteCourse}>
                Delete Course
              </button>
            </>
          ) : (
            <></>
          )}
          <Link to="/" className="button button-secondary">
            Return to List
          </Link>
        </div>
      </div>
      <div className="wrap">
        <h2 className="course--detail--label">Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <p className="course--name">{course.title}</p>
              {course.User ? (
                <p>
                  By {course.User.firstName} {course.User.lastName}
                </p>
              ) : (
                <></>
              )}

              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ReactMarkdown class="course--detail--list">
                {course.materialsNeeded}
              </ReactMarkdown>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CourseDetail;
