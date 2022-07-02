import React, { useContext, useState } from "react";
import { Context } from "../Context";
import { useNavigate, Link } from "react-router-dom";

function CreateCourse() {
  // pull the data and authenticated mettods from the context
  const { data, authenticatedUser } = useContext(Context);
  // create an errors instance in state as an array
  const [errors, setErrors] = useState([]);
  // store the "useNavigate()" method in a constant
  const navigate = useNavigate();
  // create a course object instance in the state
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    userId: authenticatedUser.id,
  });
  // create a change method
  const change = (e) => {
    // create name and value to store the event targets
    const { name, value } = e.target;
    // set the course an object with the current courses spread, and name and value stored
    // as key value pairs
    setCourse((course) => ({ ...course, [name]: value }));
  };
  // create a submit funtion
  const submit = (e) => {
    //  prevent the default behaviour of the event handler of refresh after submit
    e.preventDefault();
    // call "createCourse" method from the data and populate it with the
    // course and authenticated data.
    data
      .createCourse(course, authenticatedUser)
      //  then if there are any errors
      .then((errors) => {
        if (errors.length) {
          // set the add them to state
          setErrors(errors);
        } else {
          // else navigate to root /
          navigate("/");
        }
      })
      // catch any errors from the rest Api
      .catch((err) => {
        // navigate to "/error"
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
          Create Course
        </button>
        <Link className="button button-secondary" to="/">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default CreateCourse;
