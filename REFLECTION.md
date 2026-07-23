# REFLECTION

## 1. Assumptions Made

I assumed that the Urja Meter Operations Portal uses session-based authentication instead of token-based authentication. After inspecting the network requests, I observed that the application creates a secure session cookie after a successful login. Therefore, I implemented cookie-based session persistence using `axios-cookiejar-support` and `tough-cookie`.

I also assumed that the internal endpoints discovered during network inspection are stable and can be safely consumed by the wrapper API.

---

## 2. Challenges Faced

The biggest challenge was understanding how the legacy application performs authentication.

Initially, login requests failed because the request body and headers did not exactly match the browser's request. After inspecting the network traffic using Chrome Developer Tools, I identified the required form fields and headers such as `x-sveltekit-action`, `Origin`, and `Referer`.

Another challenge was identifying the internal endpoints responsible for retrieving meter information, geographical coordinates, and energy consumption history.

---

## 3. Mistakes Encountered

During development, I initially used the environment variable `USERNAME`, which conflicted with the operating system's predefined environment variable. As a result, incorrect credentials were sent during authentication. This issue was resolved by using a dedicated environment variable for the portal email.

I also temporarily removed some service methods while refactoring, which caused runtime errors. Restoring those methods resolved the issue.

---

## 4. Architectural Trade-offs

To keep the implementation simple and maintainable, I used a single persistent HTTP client with a shared cookie jar. This approach minimizes repeated logins and keeps the implementation lightweight.

For this assignment, automatic session re-authentication was not implemented to keep the solution stable. In a production environment, the client can be extended to detect expired sessions (HTTP 401) and transparently re-authenticate before retrying the original request.

---

## 5. Future Improvements

If this project were extended further, I would implement the following improvements:

- Automatic session re-authentication after session expiry.
- Retry mechanism for transient network failures.
- Centralized error handling middleware.
- Request and response logging.
- Unit and integration tests.
- Docker containerization.
- Response caching for frequently accessed data.
- API rate limiting and request throttling.
- CI/CD pipeline for automated testing and deployment.

---

## Conclusion

This assignment provided valuable experience in reverse engineering a legacy web application, managing authenticated sessions, designing a clean REST API wrapper, and documenting the solution using OpenAPI and Swagger. The project demonstrates the ability to integrate with existing systems while exposing a clean and developer-friendly REST interface.