import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Footer from "../components/Footer"

const API_URL = process.env.API_URL

export default function FridgeProfile() {
  const [myFridge, setFridge] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { userId } = useParams()

  useEffect(() => {
    const fetchFridge = async () => {
      try {
        const response = await fetch(
          `${API_URL}/fridge/fridgeProfile/${userId}`
        )
        const data = await response.json()
        setFridge(data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFridge()
  }, [])

  if (isLoading) {
    return <p>Loading fridge data...</p>
  }
  if (error) {
    return <p>Error fetching data: {error.message}</p>
  }

  // Combine variable and obj in MDB for efficiency
  const fridgeObj = myFridge.fridge
  return (
    <div>
      <div className="fridgePage--parent">
        <div className="fridgePage--status">
          <h1>
            <a href={fridgeObj.contact.siteURL}>{fridgeObj.name} </a>
            <span className="fridgePage--community">
              by {fridgeObj.community}
            </span>
          </h1>
        </div>
        <div className="fridgePage--about">
          <div className="about-sub">
            <div className="fridgePage--text">
              <h2 className="fridgePage--header">Address</h2>
              <p>
                <a
                  className="fridgePage--directions"
                  href={fridgeObj.location.directionURL}
                  target="_blank"
                >
                  {fridgeObj.location.address} {fridgeObj.location.cityState}{" "}
                  {fridgeObj.location.zipCode}{" "}
                </a>
                |{" "}
                {fridgeObj.status === "Active" ? (
                  <span className="fridgeProfile--status">Active Site 🟢</span>
                ) : (
                  <span className="fridgeProfile--status">
                    Site Unavailable 🔴
                  </span>
                )}
              </p>
              <h2 className="fridgePage--header">About this fridge</h2>
              <p>{fridgeObj.description}</p>
              <a
                className="fridgePage--volBut"
                href={fridgeObj.contact.volunteerURL}
              >
                Volunteer with {fridgeObj.name}
              </a>
              <div className="socialsContainer">
                <a href={`mailto:${fridgeObj.contact.email}`} target="_blank">
                  <img
                    className="social-icons"
                    src="../Icons/icons8-email-50.png"
                  />
                </a>
                <a href={fridgeObj.contact.siteURL} target="_blank">
                  <img
                    className="social-icons"
                    src="../Icons/icons8-website-50.png"
                  />
                </a>
                <a href={fridgeObj.contact.instagramURL} target="_blank">
                  <img
                    className="social-icons"
                    src="../Icons/icons8-instagram-50.png"
                  />
                </a>
                <a href={fridgeObj.donations.donationURL} target="_blank">
                  <img
                    className="social-icons"
                    src="../Icons/icons8-coins-50.png"
                  />
                </a>
              </div>
            </div>
            <div className="fridgePage--IMG">
              <img src={fridgeObj.fridgeIMG} />
            </div>
          </div>
          <div className="donationsContainer">
            <div className="donationsSub">
              <h3 className="fridgePage--header donations">Accepts</h3>
              {fridgeObj.donations.allowed.length > 0 ? (
                <ul>
                  {fridgeObj.donations.allowed.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="fridgeDonation--conditional">
                  Data not available, please contact{" "}
                  <span className="fridgeProfile--email">
                    {fridgeObj.contact.email}
                  </span>{" "}
                  for specific donation inquiries.
                </p>
              )}
            </div>
            <div className="donationsSub">
              <h3 className="fridgePage--header donations">Does not accept</h3>
              {fridgeObj.donations.notAllowed.length > 0 ? (
                <ul>
                  {fridgeObj.donations.notAllowed.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="fridgeDonation--conditional">
                  Data not available, please contact{" "}
                  <span className="fridgeProfile--email">
                    {fridgeObj.contact.email}
                  </span>{" "}
                  for specific donation inquiries.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
