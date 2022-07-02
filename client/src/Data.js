import config from "./Config";

export default class Data {
  // create an api funtion with path, method, body, requiresAuth, credentials as params
  // set method to defualt(GET) body(null) requiresAuth(false), credentials(null)
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    // create a url constant to store the url from config and the path
    const url = config.apiBaseUrl + path;
    // create the options object with the method and headers
    const options = {
      method,
      //   headers hold the content-type which is in JSON
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    // if the body is not null
    if (body !== null) {
      // add the body to the options and turn JSON to string formate
      options.body = JSON.stringify(body);
    }

    // if requiresAuth is true
    if (requiresAuth) {
      // create the encodedCredentials constant to store the encyripted user data using (btoa)
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      // add "Authorization" to the options headers object and set it to the encyripted encodedCredentials data
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    // return the fetched data
    return fetch(url, options);
  }

  // create a getUser async function with emailAddress and password as params
  async getUser(emailAddress, password) {
    // create the response constant and wait for the api function with the path as "/users" a GET method body
    // set to null and requiresAuth set to true
    const response = await this.api("/users", "GET", null, true, {
      emailAddress,
      password,
    });

    // if the response is ok
    if (response.status === 200) {
      // return the json data and then save it as data
      return response.json().then((data) => data);
      // else id the response has any problem
    } else if (
      response.status === 401 ||
      response.status === 400 ||
      response.status === 500
      // return null
    ) {
      return null;
      // else throw an error from the api response
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create the createUser async function
  async createUser(user) {
    // create a response constant to save the data that POST to the api
    const response = await this.api("/users", "POST", user);
    // if the post was successful
    if (response.status === 201) {
      // return nothing
      return [];
      // else if the post had a problem
    } else if (response.status === 400) {
      // return a response as JSOn then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw any other errors from the api
    } else {
      throw new Error("Something went wrong");
    }
  }

  // create the getCourse async function
  async getCourses() {
    // create the response constant to save the data for all the courses
    const response = await this.api("/courses");
    // if the response is ok
    if (response.status === 200) {
      // retuten a json object then save the data as data
      return response.json().then((data) => data);
      // else throw the errors from the api
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  }

  // create the courseDetail async function
  async courseDetail(id) {
    // create a response constant to wait for for the data from the url "/courses/{id}"
    const response = await this.api(`/courses/${id}`);
    // if the response is ok
    if (response.status === 200) {
      // return the data as json then save it as data
      return response.json().then((data) => data);
      // else throw an error
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  }

  //  create a deleteCourse async function
  async deleteCourse(id, user) {
    // descontruct the user object
    const { emailAddress, password } = user;
    // create the response constant and wait for the DELETE action with
    // emailAddress and password as the authentication
    const response = await this.api(`/courses/${id}`, "DELETE", {}, true, {
      emailAddress,
      password,
    });
    // if the response is ok
    if (response.status === 204) {
      //  return an empty array
      return [];
      // else throw an error with status code
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  }

  // create the updateCourse async function
  async updateCourse(course, user) {
    // destructure the user object
    const { emailAddress, password } = user;
    // create the response constant to wait for the PUT action with requiresAuth set to true
    // it should actully be request
    const response = await this.api(
      `/courses/${course.id}`,
      "PUT",
      course,
      true,
      { emailAddress, password }
    );
    // if the response is ok
    if (response.status === 204) {
      // return empty array
      return [];
      // if the id course doesnt exsit
    } else if (response.status === 400) {
      // return the response data in json then
      return response.json().then((data) => {
        // retutn the errors thrown
        return data.errors;
      });
      // else throw the errors from the api
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  }

  // create the createCourse async funtion
  async createCourse(course, user) {
    // destructure the user object
    const { emailAddress, password } = user;
    // create the response constant to hold the post requst to the api with requireAuth set to true
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password,
    });
    // if the response status is 200
    if (response.status === 201) {
      //  return an empty array
      return [];
      // else if response status is 400
    } else if (response.status === 400) {
      // return response data in json then
      return response.json().then((data) => {
        // return the errors
        return data.errors;
      });
      // else throw the errors from the api
    } else {
      throw new Error(`Something went wrong: ${response.status}`);
    }
  }
}
