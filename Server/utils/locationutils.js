import geoip from 'geoip-lite';

const SOUTH_STATES = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];

export function getClientLocation(ip) {
    const geo = geoip.lookup(ip);
    return geo?.region || "Unknown"; // Region/state name
}

export function isSouthIndianState(state) {
    return SOUTH_STATES.includes(state);
}
