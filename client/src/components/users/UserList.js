import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchUsers } from "../../actions"
import CollapsibleFieldset from "../CollapsibleFieldset"


const UserList = ({ users, fetchUsers }) => {
  const [editedUsers, setEditedUsers] = useState({})

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleChange = (userId, field, value) => {
    setEditedUsers((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [field]: value,
      },
    }))
  }

  const handleSave = async (userId) => {
    const changes = editedUsers[userId]

    if (!changes) return

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changes),
      })

      if (!response.ok) {
        throw new Error("Failed to update user")
      }

      // Remove the local edits after successful save
      setEditedUsers((prev) => {
        const updated = { ...prev }
        delete updated[userId]
        return updated
      })
    } catch (error) {
      console.error("Error saving user:", error)
    }
  }

  const getValue = (user, field) => {
    return editedUsers[user._id]?.[field] ?? user[field]
  }

  return (
    <div className="page">
      <fieldset>
        <legend>
          <h2>Users Dashboard</h2>
        </legend>

        <div className="grid-container">
          {users.map((user) => (
            <div key={user._id} className="userthumbnail">
              {user.firstName && user.lastName && user.avatar ? (
                <>
                  <img
                    src={user.avatar}
                    referrerPolicy="no-referrer"
                    alt={user.firstName + " " + user.lastName}
                  />
                  <span>First name: {user.firstName}</span>
                  <strong>Last name: {user.lastName}</strong>{" "}
                </>
              ) : null}


             

              <strong>Email: {user.email}</strong>
               <CollapsibleFieldset legend= "...">
               <ul>
                <li>Google ID: {user.googleId}</li>
                <li>Documents: {user.numberOfDocuments}</li>
                <li>Recordings: {user.numberOfRecordings}</li>
                <li>Reviews: {user.hasReviews ? "Yes" : "No"}</li>
                <li>Consultation: {user.hasConsultation ? "Yes" : "No"}</li>
                <li>Language: {user.language}</li>
               </ul>
             </CollapsibleFieldset>
            
              <strong>
                Consultation date:{" "}
                {user.consultationDate
                  ? new Date(user.consultationDate).toLocaleString()
                  : "None"}
              </strong>


              <label>
                <strong>Type:</strong>

                <select
                  value={getValue(user, "type") || "guest"}
                  onChange={(e) =>
                    handleChange(user._id, "type", e.target.value)
                  }
                >
                  <option value="guest">Guest</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <label>
                <strong>Level:</strong>

                <select
                  value={getValue(user, "level") || ""}
                  onChange={(e) =>
                    handleChange(user._id, "level", e.target.value)
                  }
                >
                  <option value="">Not set</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </label>

              

              <button
                type="button"
                onClick={() => handleSave(user._id)}
                disabled={!editedUsers[user._id]}
              >
                Save
              </button>
            </div>
          ))}
        </div>
      </fieldset>
      <div className="placeholder"></div>
    </div>
  )
}

function mapStateToProps({ users }) {
  return { users }
}

export default connect(mapStateToProps, { fetchUsers })(UserList)
