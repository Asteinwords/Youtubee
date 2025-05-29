export async function getUserRegion() {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    return data.region;
  }
  
  export function isSouthIndian(region) {
    const southStates = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];
    return southStates.includes(region);
  }
  