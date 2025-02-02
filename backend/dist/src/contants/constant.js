// Profile Page based on gender
const BASE_PROFILE_URL = "https://avatar.iran.liara.run/public";
export default function getProfileUrl(gender, userName) {
    if (gender === "male")
        return `${BASE_PROFILE_URL}/boy?username=${userName}`;
    return `${BASE_PROFILE_URL}/girl?username=${userName}`;
}
