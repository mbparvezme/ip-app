export let ValidateIPaddress = (ip) => {
  var ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ip.match(ipFormat)
}

export let humanReadableTime = (time) => {
  let date = new Date(time)
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let hr = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  return `${day}/${month}/${year} at ${hr}`
}
