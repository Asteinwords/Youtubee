export function isBetween10And12() {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 10 && hour < 12;
  }
  