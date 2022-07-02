import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../Context";

function UpdateCourse() {
  // pull the data and authenticated data from context
  const { data, authenticatedUser } = useContext(Context);
  // create a course  instance in state and set it to an empty object
  const [course, setCourse] = useState({});
  // get tie id from router using the useParams method
  const { id } = useParams();
  // store the useNavigate method in a constant
  const navigate = useNavigate();
  // create an errors instance in state and set it to an empty array
  const [errors, setErrors] = useState([]);

  // when this component mounts
  useEffect(() => {
    // get the courseDetail method from data in context and pass the id as a param
    data
      .courseDetail(id)
      // then set the course in state to take the course brought in from the api
      // through context
      .then((course) => setCourse(course))
      // catch any errors thrown by the api and console log them
      .catch((err) => console.log(err));
  }, []);

  // create the change function
  const change = (e) => {
    // create a name and value constants to hold the event handlers for the input
    const { name, value } = e.target;
    // set the course to the spread course and store it as key value pair
    setCourse((course) => ({ ...course, [name]: value }));
  };

  // create the submit function
  const submit = (e) => {
    // prevent default behaviour of refresh when form is submited
    e.preventDefault();
    // get the updateCourse method from data and pass course and authenticatedUser data as params
    data
      .updateCourse(course, authenticatedUser)
      // then if there any errors
      .then((errors) => {
        if (errors.length) {
          // set the errors instance in state to those errors
          setErrors(errors);
          // console log the errors
          console.log(errors, id);
          // else navigate to the specific course
        } else {
          navigate(`/courses/${id}`);
        }
      })
      //  catch any errors thrown from the api
      .catch((err) => {
        // console log them
        console.log(err);
        // navigate to /error
        navigate("/error");
      });
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      {errors.length ? (
        <>
          <div className="validation--errors">
            <h3>Validation errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}
      <form onSubmit={submit}>
        <div className="main--flex">
          <div>
            <label htmlFor="title">Course Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={course.title}
              onChange={change}
            />
            <p>
              By {authenticatedUser.firstName} {authenticatedUser.lastName}
            </p>

            <label htmlFor="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={course.estimatedTime}
              onChange={change}
            />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              value={course.materialsNeeded}
              onChange={change}
            />
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <Link className="button button-secondary" to={`/courses/${id}`}>
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default UpdateCourse;
