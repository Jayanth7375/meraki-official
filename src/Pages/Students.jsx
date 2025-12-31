export default function FacultyStudents() {
  return (
    <>
      <h1>Enrolled Students</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Course</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Arjun</td>
            <td>arjun@mail.com</td>
            <td>AI</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
