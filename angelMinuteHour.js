function angle(time) {
  // your code here
  // 360/12 = 30 -> 0 -24 -> 0 -12 
  // 360/60 = 6

  let [hour, minute] = time.split(":");

  // Convert 24 hr to 12 hr
   hour = hour%12;



  let hourAngle = 30* hour;

  let minuteAngle = 6* minute;

  let extra = minute/2 
  console.log(extra)
  let diff =  Math.abs(hourAngle - minuteAngle + extra)

  return Math.round(Math.min(diff, 360-diff));
}

console.log(angle('12:15'))
