import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function AnalyticsTracker() {
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if (auth?._id && window.gtag) {
      console.log("** Tracking working for user:", auth._id)

      // 1. Set the configuration for future actions
      window.gtag("config", "G-26CD5MYZMD", {
        user_id: auth._id,
      })

      if (auth.type) {
        window.gtag("set", "user_properties", {
          user_type: auth.type,
        })
      }

      // 2. 🚀 FORCE AN IMMEDIATE REQUEST: Send a login event with the ID attached
      window.gtag("event", "login", {
        method: "Passport",
        user_id: auth._id, // This forces the network packet to build right now
      })
    } else if (!auth?._id && window.gtag) {
      console.log("** No user logged in yet.")
      window.gtag("config", "G-26CD5MYZMD", {
        user_id: null,
      })
    }
  }, [auth])

  return null
}
